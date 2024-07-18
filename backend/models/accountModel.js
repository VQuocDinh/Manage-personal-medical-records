import pool from "../config/db.js";
const accountModel = {
    create: async (account) => {
        const query = 'INSERT INTO accounts (email, password, role_id) VALUE (?,?,?)'
        const [result] = await pool.execute(query, [account.email, account.password, account.role])
        return result
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM accounts WHERE email = ?'
        const [result] = await pool.execute(query, [email])
        return result[0]

    },
    getAll: async () => {
        const query = 'SELECT * FROM accounts'
        const [result] = await pool.execute(query)
        return result

    },
    delete: async (email) => {
        const query = 'DELETE FROM accounts WHERE email = ?'
        const result = await pool.execute(query, [email])
        return result
    }

}

export default accountModel