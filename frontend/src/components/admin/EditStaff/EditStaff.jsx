import React, { useEffect, useState } from "react";
import avtUser from "../../../assets/image/avt-user.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./EditStaff.scss";
import { useParams } from "react-router-dom";

const EditStaff = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const staffId = useParams();
  
  const fetchDataForEditing = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/staff/getById`, staffId);
      if (res.data.success) {
        const fetchedStaff = res.data.data;
        if (fetchedStaff.date_of_birth){
            fetchedStaff.date_of_birth = fetchedStaff.date_of_birth.split('T')[0]
        }
        setFormValues({
          staffId: staffId.staff_id,
          email: fetchedStaff.email,
          phone: fetchedStaff.phone,
          fullName: fetchedStaff.full_name,
          gender: fetchedStaff.gender,
          dateOfBirth: fetchedStaff.date_of_birth,
          address: fetchedStaff.address,
          position: fetchedStaff.position,
          avtFile: fetchedStaff.avatar,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch staff data.");
    }
  };

  const [formValues, setFormValues] = useState({
    staffId: "",
    email: "",
    phone: "",
    fullName: "",
    gender: "Male",
    dateOfBirth: null,
    address: "",
    position: "Doctor",
    avtFile: null,
  });

  useEffect(() => {
    fetchDataForEditing();
    
  }, [staffId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( formValues );
    try {
      const addRes = await axios.post(`${baseUrl}/api/staff/edit`, formValues);
      if (addRes.data.success) {
        toast.success(addRes.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to edit staff. Please try again later.");
      }
    }
  };
  return (
    <div className="edit-staff p-3 mt-5">
      <h1>Edit Staff</h1>
      <form
        onSubmit={handleSubmit}
        className="row g-3 needs-validatio flex-row mt-5"
      >
        <div className="mb-3 d-flex flex-column w-25 align-items-center justify-content-center">
          <img src={avtUser} alt="" className="avatar" />

          <div className="input-group mt-3 w-75">
            <input
              type="file"
              className="form-control"
              name="avtFile"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-75 d-flex flex-column gap-3 pe-5">
          <div className="col-6">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="row">
            <div className="col-4">
              <label htmlFor="gender">Gender</label>
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

            <div className="col-4">
              <label htmlFor="position">Position</label>
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
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                aria-label="Full name"
                name="full_name"
                value={formValues.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-4">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                aria-label="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              placeholder="Date of birth"
              name="date_of_birth"
              value={formValues.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 ">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditStaff;
