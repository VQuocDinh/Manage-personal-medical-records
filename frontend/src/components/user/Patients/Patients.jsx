import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { StoreContext } from "../../../context/StoreContext";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Patients.scss'

const Patients = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { patientList, setPatientList } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("searchInput:", searchInput);
      const full_name = searchInput;
      const res = await axios.post(`${baseUrl}/api/staff/search`, {
        full_name,
      });
      if (res.data.success) {
        setStaffList(res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log("Failed to search staff.", error);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

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

  return (
    <div className="patients w-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="fw-900 m-0">Patients</h1>

        <div className="d-flex align-items-center gap-3">
          <form action="" onSubmit={handleSearch}>
            <div class="input-group d-flex gap-3 w-100 border border-1 rounded-5">
              <input
                type="search"
                class="form-control rounded-5 border-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchInput}
                onChange={handleChange}
              />
              <button
                type="submit"
                class="input-group-text border-0 rounded-5 w-25 d-flex justify-content-center"
                id="search-addon"
              >
                <CiSearch />
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              navigate("/user/face-recognition");
            }}
            className="btn btn-primary "
          >
            Camera
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/user/add-patient");
        }}
        className="btn fw-900 rounded-5 mt-1 pe-0 ms-auto"
      >
        Add new patient
      </button>

      <table className="table table-hover mt-4 table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone number</th>
            <th scope="col">CCCD</th>
            <th scope="col">Date of birth</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            {/* <th scope="col">Action</th> */}
          </tr>
        </thead>

        <tbody>
          {patientList.map(
            (item) =>
              item.status === 1 && (
                <tr className="patient-item "
                  key={item.staff_id}
                  onClick={() => navigate(`/user/patients/${item.patient_id}`)}
                >
                  <td>{item.full_name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.cccd}</td>
                  <td>{item.date_of_birth}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  {/* <td>
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
                        title="Medical records"
                        onClick={() =>
                          navigate(`/user/medical-records/${item.patient_id}`)
                        }
                        className="btn btn-sm btn-warning"
                      >
                        <IoIosDocument />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleShowModal(item.staff_id)}
                        className="btn btn-sm btn-danger"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </td> */}
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

export default Patients;
