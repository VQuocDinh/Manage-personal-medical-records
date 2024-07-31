import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WebcamCapture = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const webcamRef = useRef(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cap = async () => {
    setIsLoading(true);
    try {
      const image = webcamRef.current.getScreenshot();
      const res = await axios.post(`${baseUrl}/api/patient/getByFace`, {
        image,
      });
      setPatientInfo(res.data.data);
    } catch (error) {
      console.error("Error recognizing face:", error);
      alert("Cannot recognize faces. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="face-recognition w-100 d-flex gap-5">
      <div className="webcam-capture w-50 text-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam w-100 rounded-5 border border-3 border-black p-1"
        />
        <button
          className="btn btn-primary rounded-5 p-3"
          onClick={cap}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Take photos and identify"}
        </button>
      </div>

      <div className="patient-infor w-50">
        {patientInfo && (
          <>
            <div className="patient-info">
              <h1 className="fw-900 mb-4">Patient information</h1>
              <p>Full name: {patientInfo.full_name}</p>
              <p>Phone number: {patientInfo.phone_number}</p>
              <p>ID card: {patientInfo.cccd}</p>
              <p>Gender: {patientInfo.gender}</p>
              <p>Email: {patientInfo.email}</p>
              <p>Date of birth: {patientInfo.date_of_birth}</p>
              <p>Address: {patientInfo.address}</p>
            </div>
            <div className="d-flex gap-3 mt-5">
              <button className=" w-25 btn btn-primary rounded-5">
                Healthcare
              </button>

              <button
                onClick={() => {
                  navigate("/user/medical-records");
                }}
                className="w-25 btn btn-primary rounded-5"
              >
                Medical records
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default WebcamCapture;
