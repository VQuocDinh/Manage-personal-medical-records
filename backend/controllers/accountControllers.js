import accountModel from "../models/accountModel.js";
import pool from "../config/db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await accountModel.findByEmail(email);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const isMatch = bcrypt.compareSync(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: account.email, role: account.role_id },
            process.env.JWT_SECRET || 'secretkey', // Sử dụng biến môi trường cho secretkey
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, role: account.role_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await accountModel.findByEmail(email)
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already an account' })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        await accountModel.create({ email, password: hashedPassword, role })
        return res.status(201).json({ success: true, message: 'Account registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'The employee does not exist in the system' });
    }
}

const getAccount = async (req, res) => {
    try {
        const query = 'SELECT * FROM accounts'
        const [result] = await pool.execute(query)
        res.json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const deleteUser = (req, res) => {
    const { email } = req.body;

    try {
        const deleteUser = accountModel.delete(email)
        if (deleteUser) {
            res.json({ success: true })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}


export { login, register, getAccount, deleteUser }