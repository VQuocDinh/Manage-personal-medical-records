import pool from "../config/db.js";
const getAll = async(req, res)=>{
    try {
        const query = 'SELECT * FROM health_indicators'
        const [result] = await pool.execute(query)
        res.json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {getAll}