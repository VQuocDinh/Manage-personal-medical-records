import accountModel from "../models/accountModel.js";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM accounts WHERE email = ?";
    const [result] = await pool.execute(query, [email]);
    const account = result[0];

    if (!account) {
      return res
        .status(404)
        .json({
          message: "The account is not registered. Please check again.",
        });
    }

    const isMatch = bcrypt.compareSync(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { email: account.email, role: account.role_id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, role: account.role_id });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
  
};

// Register function
const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await accountModel.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already has an account." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await accountModel.create({ email, password: hashedPassword, role });

    return res
      .status(201)
      .json({ success: true, message: "Account registered successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while registering the account." });
  }
};

// Get all accounts function
const getAccount = async (req, res) => {
  try {
    const query = "SELECT * FROM accounts";
    const [result] = await pool.execute(query);
    return res.json({ success: true, data: result });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occurred while retrieving account information.",
      });
  }
};

// Delete user function
const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await accountModel.findByEmail(email);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Account does not exist." });
    }

    await accountModel.delete(email);
    return res.json({
      success: true,
      message: "Account has been successfully deleted.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the account." });
  }
};

export { login, register, getAccount, deleteUser };
