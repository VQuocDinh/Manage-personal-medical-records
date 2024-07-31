import pool from "../config/db.js"
const staffModel = {
    getAll: async () => {
        const query = 'SELECT * FROM staff'
        const [result] = await pool.execute(query)
        return result

    },

    getByName: async (name)=>{
        const query = 'SELECT * FROM staff WHERE full_name LIKE ?'
        const [result] = await pool.execute(query,[name])
        return result
    }
}


export default staffModel