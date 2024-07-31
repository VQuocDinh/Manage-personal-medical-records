import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import pool from "../config/db.js";

// const __filename = __filename;
const __dirname = path.resolve();

const getByFace = async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image data provided" });
  }

  const tempFileName = `temp_${Date.now()}.jpg`;
  const tempFilePath = path.join(__dirname, "uploads", tempFileName);

  try {
    await saveImageToFile(image, tempFilePath);
    const patientId = await recognizeFace(tempFilePath);
    
    if (patientId && patientId !== "Not found") {
      const patient = await getPatientFromDatabase(patientId);
      if (patient) {
        res.json({ data: patient });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } else {
      res.status(404).json({ error: "Face not recognized" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await fs.unlink(tempFilePath).catch(console.error);
  }
};

const saveImageToFile = async (image, filePath) => {
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");
  await fs.writeFile(filePath, imageBuffer);
};

const recognizeFace = (imagePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["face_recognition.py", imagePath]);
    let output = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error("Error processing image"));
      } else {
        resolve(output.trim());
      }
    });
  });
};

const getPatientFromDatabase = async (patientId) => {
  const [rows] = await pool.query(
    "SELECT * FROM patients WHERE patient_id = ?",
    [patientId]
  );
  return rows[0] || null;
};

const getAll = async(req, res) =>{
  try {
    
  } catch (error) {
    
  }
}

export { getByFace, getAll };