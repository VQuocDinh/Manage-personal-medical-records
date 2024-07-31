import db from "../models/index.js";

const getStaff = async (req, res) => {
  try {
    const response = await db.staff.findAll();
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while get staffs.",
      error: error.message,
    });
  }
};
export { getStaff };
