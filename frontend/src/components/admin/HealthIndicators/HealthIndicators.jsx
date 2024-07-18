import React, { useEffect, useState } from "react";
import "./HealthIndicators.scss";import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HealthIndicators = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [indicators_list, setIndicatorsList] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const getAllIndicators = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/indicator/get`);
        console.log(res.data.success)
        if (res.data.success) {
          setIndicatorsList(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching health indicators list", error);
      }
    };
    getAllIndicators()
  },[])
  
  return (
    <div className="health-indicator p-4 d-flex justify-content-center flex-column">
      <h1 className="mt-5 fw-900">Health indicators</h1>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <ul className="nav d-flex gap-4">
          <li className="nav-item ">
            <a
              className="text-black nav-link active p-0"
              aria-current="page"
              href="#"
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => setSortBy("Managers")}
              className="text-black nav-link p-0"
              href="#"
            >
              Records Managers
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => setSortBy("Users")}
              className="text-black nav-link p-0"
              href="#"
            >
              Records Users
            </a>
          </li>
        </ul>
        <div
          onClick={() => navigate("/admin/add-staff")}
          className="fw-900 add-staff"
        >
          Add health indicator
        </div>
      </div>

      <table className="table table-hover m-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Unit</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {indicators_list.map((item) => (
            <tr key={item.indicator_id}>
              <td>{item.indicator_id}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>
                <div className="hstack gap-2 fs-6">
                  <button
                    title="Edit"
                    onClick={() =>
                      navigate(`/admin/edit-staff/${item.staff_id}`)
                    }
                    className="btn btn-sm btn-primary"
                  >
                    <MdEdit />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleShowModal(item.staff_id)}
                    className="btn btn-sm btn-danger"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default HealthIndicators;
