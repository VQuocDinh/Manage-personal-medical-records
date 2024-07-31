import pool from "../config/db.js";
const healthIndicatorModel = {
  getAll: async () => {
    const query = "SELECT * FROM health_indicators";
    const [result] = await pool.execute(query);
    return result;
  },
};

export default healthIndicatorModel
