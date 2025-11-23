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

            const text = fields.text || "";
            const mediaFile = files.media ? files.media[0].newFilename : null;
            const userId = fields.userId;

            console.log("Text:", text);
            console.log("Media file:", mediaFile);
            console.log("User ID:", userId);

            // Save to database
            // const query = `
            //     INSERT INTO posts (text, media, user_id)
            //     VALUES ($1, $2)
            //     RETURNING *;
            // `;
            // const result = await pool.query(query, [text, mediaFile]);

            res.status(200).json({ success: true });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
