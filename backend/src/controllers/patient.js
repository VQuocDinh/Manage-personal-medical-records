import db from "../models/index.js";
import path from "path";
import { promises as fs } from "fs";
import { spawn } from "child_process";

const getAll = async (req, res) => {
  try {
    const response = await db.patients.findAll();
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while get patients.",
      error: error.message,
    });
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

const getById = async (patientId) => {
  const response = await db.patients.findByPk(patientId);
  return response;
};

const getByFace = async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res
      .status(400)
      .json({ success: false, message: "No image data provided" });
  }

  const tempFileName = `temp_${Date.now()}.jpg`;
  const tempFilePath = path.join(__dirname, "uploads", tempFileName);

  try {
    await saveImageToFile(image, tempFilePath);
    const patientId = await recognizeFace(tempFilePath);

    if (patientId && patientId !== "Not found") {
      const patient = await getById(patientId);
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

const findByPk = async (req, res) => {
  try {
    const { patient_id } = req.body;
    const response = await db.patients.findByPk(patient_id);
    if(response){
      return res.status(200).json({
        success: true,
        data: response,
      })
    }
    return res.status(400).json({
      success: false,
      message: "Not found patient",
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while get patient.",
      error: error.message,
    })
  }
};

export { getAll, getByFace, findByPk };
