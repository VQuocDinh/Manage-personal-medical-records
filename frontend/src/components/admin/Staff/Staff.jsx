import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Staff.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DeleteConfirmation from "../../common/DeleteConfirmation";

const Staff = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [sortBy, setSortBy] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const handleShowModal = (staffId) => {
    setSelectedStaffId(staffId);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setSelectedStaffId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedStaffId) {
      handleDelete(selectedStaffId);
      handleHideModal();
    }
  };

  const fetchAllStaff = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/staff/getStaff`);
      if (response.data.success) {
        setStaffList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching staff list", error);
    }
  };

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const handleDelete = async (staffId) => {
    try {
      const response = await axios.post(`${baseUrl}/api/staff/delete`, {
        staff_id: staffId,
      });
      if (response.data.success) {
        setStaffList((prevList) =>
          prevList.filter((staff) => staff.staff_id !== staffId)
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting staff");
    }
  };

  return (
    <div className="user p-4 d-flex justify-content-center flex-column">
      <h1 className="mt-5 fw-900">Staff</h1>

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
          Add Staff
        </div>
      </div>

      <table className="table table-hover m-3">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Position</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(
            (item) =>
              item.status === 0 && (
                <tr key={item.staff_id}>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.full_name}</td>
                  <td>{item.gender}</td>
                  <td>{item.position}</td>
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
              )
          )}
        </tbody>
      </table>
      <DeleteConfirmation
        showModal={showModal}
        hideModal={handleHideModal}
        confirmModal={handleConfirmDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default Staff;
