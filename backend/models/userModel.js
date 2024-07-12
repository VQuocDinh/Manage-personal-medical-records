import pool from "../config/db.js";
const userModel = {
    create: async (user) => {
        const query = 'INSERT INTO users (email, password) VALUE (?,?)'
        const [result] = await pool.execute(query, [user.email, user.password])
        return result
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?'
        const [result] = await pool.execute(query, [email])
        return result[0]

    },
    getAll: async () => {
        const query = 'SELECT * FROM users'
        const [result] = await pool.execute(query)
        return result

    },
    delete: async (email) => {
        const query = 'DELETE FROM users WHERE email = ?'
        const result = await pool.execute(query, [email])
        return result
    }

}

export default userModel