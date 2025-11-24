import pool from "../config/pg-db.js";
import formidable from "formidable";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

export const storePost = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const form = formidable({
            multiples: false,
            uploadDir: path.join(process.cwd(), "/public/uploads"),
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ message: "Error parsing form data" });
            }

            const text = fields.text ? fields.text[0] : "";
            const userId = fields.userId ? fields.userId[0] : null;
            const mediaFile = files.media ? files.media[0].newFilename : null;
            const postType = fields.is_private ? (fields.is_private[0] == 'true' ? 0 : 1) : null;

            // Save to database
            const query = `
                INSERT INTO posts (content, file_name, author, visibility)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const result = await pool.query(query, [text, mediaFile, userId, postType]);

            res.status(200).json({
                success: true,
                data: result.rows[0],
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const getPosts = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {

        const userId = req.query.userId ? Number(req.query.userId) : null;

        const postsQuery = `
            SELECT 
                posts.*,
                users.first_name,
                users.last_name,
                COUNT(likes.id) AS total_likes,
                EXISTS (
                    SELECT 1 FROM likes 
                    WHERE likes.post_id = posts.id AND likes.user_id = $1
                ) AS liked_by_user
            FROM posts
            JOIN users ON posts.author = users.id
            LEFT JOIN likes ON likes.post_id = posts.id
            WHERE posts.visibility = 1 OR posts.author = $1
            GROUP BY posts.id, users.first_name, users.last_name
            ORDER BY posts.created_at DESC;
        `;

        const postsResult = await pool.query(postsQuery, [userId]);
        const posts = postsResult.rows;

        for (let post of posts) {
            // get comments
            const commentsQuery = `
                SELECT 
                    comments.*,
                    users.first_name || ' ' || users.last_name AS user_name
                FROM comments
                JOIN users ON comments.user_id = users.id
                WHERE comments.post_id = $1
                ORDER BY comments.created_at ASC;
            `;
            const commentsResult = await pool.query(commentsQuery, [post.id]);
            post.comments = commentsResult.rows;

            // get replies for each comment
            for (let comment of post.comments) {
                const repliesQuery = `
                    SELECT 
                        replies.*,
                        users.first_name || ' ' || users.last_name AS user_name
                    FROM replies
                    JOIN users ON replies.user_id = users.id
                    WHERE replies.comment_id = $1
                    ORDER BY replies.created_at ASC;
                `;
                const repliesResult = await pool.query(repliesQuery, [comment.id]);
                comment.replies = repliesResult.rows;
            }
        }

        res.status(200).json({
            success: true,
            posts,
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });        
    }

};

export const toggleLike = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { postId, userId } = req.body;
        const check = await pool.query(
            'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
            [postId, userId]
        );

        if (check.rows.length > 0) {
            // unlike
            await pool.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
        } else {
            // like
            await pool.query('INSERT INTO likes(post_id, user_id) VALUES($1, $2)', [postId, userId]);
        } 
        const totalLikesRes = await pool.query(
            'SELECT COUNT(*) FROM likes WHERE post_id = $1',
            [postId]
        );
        const total_likes = parseInt(totalLikesRes.rows[0].count, 10);

        return res.json({
            liked: check.rows.length === 0,
            total_likes
        }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message }); 
        
    }
}

export const commentReply = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const form = formidable({
            multiples: false,
            uploadDir: path.join(process.cwd(), "/public/uploads"),
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error parsing form data" });
            }

            console.log(fields);

            const reply = fields.reply ? fields.reply[0] : "";
            const commentId = fields.commentId ? fields.commentId[0] : null;
            const userId = fields.userId ? fields.userId[0] : null;

            // Save to database
            const query = `
                INSERT INTO replies (comment_id, user_id, content)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const result = await pool.query(query, [commentId, userId, reply]);

            res.status(200).json({
                success: true,
                data: result.rows[0],
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const postComment = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const form = formidable({
            multiples: false,
            uploadDir: path.join(process.cwd(), "/public/uploads"),
            keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error parsing form data" });
            }

            console.log(fields);

            const comment = fields.comment ? fields.comment[0] : "";
            const postId = fields.postId ? fields.postId[0] : null;
            const userId = fields.userId ? fields.userId[0] : null;

            // Save to database
            const query = `
                INSERT INTO comments (post_id, user_id, content)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const result = await pool.query(query, [postId, userId, comment]);

            res.status(200).json({
                success: true,
                data: result.rows[0],
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
