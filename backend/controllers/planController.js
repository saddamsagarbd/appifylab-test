import pool from "../config/pg-db.js";

export const getPlans = async (req, res) => {

    try {

        const plans = (await pool.query("SELECT id, name, price, details FROM plans")).rows;
        res.status(200).json(plans)

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const getPlanById = async (req, res) => {

    try {

        const { id } = req.params;
        const result = await pool.query("SELECT id, name, price, details FROM plans WHERE id = $1", [id]);
        res.json({
            data:result.rows[0],
            success: result.rows[0] ? true : false
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const storePlan = async (req, res) => {

    try {

        const { name, price, details } = req.body;

        const result = await pool.query(
            "INSERT INTO plans (name, price, details) VALUES ($1, $2, $3) RETURNING *",
            [name, price, details]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const updatePlan = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, price, details } = req.body;
        const result = await pool.query(
            "UPDATE plans SET name=$1, price=$2, details=$3 WHERE id=$4 RETURNING *",
            [name, price, details, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const deletePlan = async (req, res) => {

    try {

        const { id } = req.params;
        await pool.query("DELETE FROM plans WHERE id=$1 RETURNING *", [id]);
        res.json({ message: "Plan deleted" });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};