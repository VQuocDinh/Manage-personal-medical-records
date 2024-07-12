import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.userId }, 'secretkey', { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findByEmail(email)
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        await userModel.create({ email, password: hashedPassword })
        return res.status(201).json({ success: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.getAll()
        res.json({ success: true, data: user })
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const deleteUser = (req,res) => {
    const { email } = req.body;

  try {
    const deleteUser = userModel.delete(email)
    if (deleteUser) {
        res.json({success:true})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}


export { login, register, getUser, deleteUser }