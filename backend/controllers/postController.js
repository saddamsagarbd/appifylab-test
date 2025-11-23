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
                console.error(err);
                return res.status(500).json({ message: "Error parsing form data" });
            }

            const text = fields.text ? fields.text[0] : "";
            const userId = fields.userId ? fields.userId[0] : null;
            const mediaFile = files.media ? files.media[0].newFilename : null;

            console.log("tex: ", text);
            console.log("mediaFile: ", mediaFile);
            console.log("userId: ", userId);

            // Save to database
            const query = `
                INSERT INTO posts (content, file_name, author)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const result = await pool.query(query, [text, mediaFile, userId]);

            console.log(result);

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
