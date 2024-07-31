import db from "../models/index.js";

const getById = async (req, res) => {
  try {
    const { patient_id } = req.body;
    const response = await db.medical_records.findByPk(patient_id);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while get medical records by id.",
        error: error.message,
      });
  }
};

export {getById}