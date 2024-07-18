import pool from "../config/db.js";
const staffModel = {
    getAll: async () => {
        const query = 'SELECT * FROM staff'
        const [result] = await pool.execute(query)
        return result

    },
}


export default staffModel