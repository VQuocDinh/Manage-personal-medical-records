import healthIndicatorModel from "../models/healthIndicatorsModel.js";
import pool from "../config/db.js";

const getAll = async (req, res) => {
  try {
    const healthIndicator = await healthIndicatorModel.getAll();
    if (healthIndicator) {
      res.json({ success: true, data: healthIndicator });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByPatient = async (req, res) => {
  try {
    const {record_id} = req.body;
    console.log('record_id',record_id)
    const query = 
      "SELECT csk.name AS TenChiSo,csyte.value AS GiaTri,csk.unit AS DonVi FROM record_indicators AS csyte JOIN health_indicators AS csk ON csyte.indicator_id = csk.indicator_id JOIN medical_records AS hsyte ON csyte.record_id = hsyte.id WHERE hsyte.id = ?;";
    const [result] = await pool.execute(query, [record_id]);
    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAll, getByPatient };
