import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/pg-db.js";

export const userRegistration = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
        if (user) return res.status(404).json({ message: "Already registered with this email." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, hashedPassword]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: `${user.email}`,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
