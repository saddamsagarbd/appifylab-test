import pool from "../config/pg-db.js";

export const getCompnies = async (req, res) => {

    try {

        const companies = (await pool.query("SELECT name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active FROM companies")).rows;
        res.status(200).json(companies)

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const getCompanyById = async (req, res) => {

    try {

        const { id } = req.params;
        const result = await pool.query("SELECT name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active FROM companies WHERE id = $1", [id]);
        res.json({
            data:result.rows[0],
            success: result.rows[0] ? true : false
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const storeCompany = async (req, res) => {

    try {

        const { name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active } = req.body;

        const result = await pool.query(
            "INSERT INTO companies (name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const updateCompany = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active } = req.body;
        const result = await pool.query(
            "UPDATE companies SET name=$1, email=$2, phone=$3, logo=$4, address1=$5, address2=$6, website=$7, contact_person=$8, contact_email=$9, is_active=$10 WHERE id=$11 RETURNING *",
            [name, email, phone, logo, address1, address2, website, contact_person, contact_email, is_active, id]
        );
        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

export const deleteCompany = async (req, res) => {

    try {

        const { id } = req.params;
        // await pool.query("DELETE FROM companies WHERE id=$1 RETURNING *", [id]);
        res.json({ message: "Company deleted" });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};