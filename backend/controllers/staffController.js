import staffModel from "../models/staffModel.js";
import pool from "../config/db.js";

const getStaff = async (req, res) => {
  try {
    const user = await staffModel.getAll();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  const { staff_id } = req.body;
  if (!staff_id) {
    return res.status(400).json({ error: "Staff is required" });
  }
  try {
    const query = "UPDATE staff SET status = 1 WHERE staff_id = ?";
    const [result] = await pool.execute(query, [staff_id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Deleted staff" });
    } else {
      res.status(404).json({ error: "Staff not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStaff = async (req, res) => {
  try {
    const {
      email,
      phone,
      fullName,
      gender,
      dateOfBirth,
      address,
      position,
      avtFile,
    } = req.body;
    const query =
      "INSERT INTO staff (email, phone, full_name, gender, date_of_birth, address, position, avatar) VALUE (?, ?, ?, ?, ?, ?, ?, ?)";
    await pool.execute(query, [
      email,
      phone,
      fullName,
      gender,
      dateOfBirth,
      address,
      position,
      avtFile,
    ]);
    return res
      .status(201)
      .json({ success: true, message: "Staff added success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editStaff = async (req, res) => {
  const {
    email,
    phone,
    fullName,
    gender,
    dateOfBirth,
    address,
    position,
    avtFile,
    staffId
  } = req.body;
  
  try {
    const query =
      "UPDATE staff SET email = ?, phone =?, full_name = ?, gender = ?, date_of_birth = ?, address = ?, position =?, avatar = ? WHERE staff_id = ?";
    await pool.execute(query, [
      email,
      phone,
      fullName,
      gender,
      dateOfBirth,
      address,
      position,
      avtFile,
      staffId
    ]);
    return res
      .status(201)
      .json({ success: true, message: "Staff edited success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getStaffById = async (req, res) => {
  const { staff_id } = req.body;
  try {
    const query = "SELECT * FROM staff WHERE staff_id = ?";
    const [result] = await pool.execute(query, [staff_id]);
    console.log([result])
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }
    return res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getByName = async(req, res ) =>{
  const name = req.body.full_name
  try {
    const staff = await staffModel.getByName(name)
    res.json({ success: true, data: staff })
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}

export { getStaff, deleteStaff, addStaff, editStaff, getStaffById, getByName };
