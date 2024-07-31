import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import avtUser from "../../../assets/image/avt-user.png";
import './AddPatient.scss'
import { FaUserCircle } from "react-icons/fa";

const initialFormValues = {
  email: "",
  phone: "",
  fullName: "",
  gender: "Male",
  dateOfBirth: null,
  address: "",
  position: "Doctor",
  avtFile: null,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const AddPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addRes = await axios.post(`${baseUrl}/api/staff/add`, formValues);
      if (addRes.data.success) {
        toast.success(addRes.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add staff. Please try again later.");
    }
  };

  const cap = async () => {
    setIsLoading(true);
    try {
      const image = webcamRef.current.getScreenshot();
      // Implement face recognition logic here
    } catch (error) {
      console.error("Error recognizing face:", error);
      toast.error("Không thể nhận diện khuôn mặt. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = () => (
    <>
      <div className="col-md-6 mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-3 mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select
          className="form-select"
          id="gender"
          name="gender"
          value={formValues.gender}
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="col-md-3 mb-3">
        <label htmlFor="position" className="form-label">Position</label>
        <select
          className="form-select"
          id="position"
          name="position"
          value={formValues.position}
          onChange={handleChange}
          required
        >
          <option>Doctor</option>
          <option>Nurse</option>
        </select>
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="fullName" className="form-label">Full name</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          value={formValues.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
      </div>

      <div className="col-12 mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="dateOfBirth" className="form-label">Date of birth</label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formValues.dateOfBirth}
          onChange={handleChange}
        />
      </div>
    </>
  );

  return (
    <div className="container py-5">
      <div className="add-patient card rounded-4 p-3">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Add Patient</h1>
          <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="col-md-3 mb-4 text-center d-flex flex-column align-items-center gap-3">
              <FaUserCircle size={150} className="text-secondary" />
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-outline-secondary w-75"
                type="button"
              >
                Take Photo
              </button>
            </div>

            <div className="col-md-9">
              <div className="row">
                {renderFormFields()}
              </div>
            </div>

            <div className="col-12 text-center mt-4">
              <button className="btn btn-primary px-5 py-2" type="submit">
                Add new patient
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Take Photo"
      >
        <div className="text-center">
          <button className="btn btn-close float-end" onClick={() => setIsOpen(false)}></button>
          <h2 className="mb-4">Take a Photo</h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="img-fluid rounded mb-4"
          />
          <button
            className="btn btn-primary px-4 py-2"
            onClick={cap}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Capture and Identify"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddPatient;