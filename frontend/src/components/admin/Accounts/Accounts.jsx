import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Accounts = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [account_list, setAccountList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllAccount = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/account/get`);
        if (res.data.success) {
          setAccountList(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching account list", error);
      }
    };
    fetchAllAccount();
  }, []);

  console.log('account_list', account_list)
  return (
    <div className="account">
      <div className="user p-4 d-flex justify-content-center flex-column">
      <h1 className="mt-5 fw-900">Accounts</h1>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <ul className="nav d-flex gap-4">
          <li className="nav-item ">
            <a className="text-black nav-link active p-0" aria-current="page" href="#">
              All
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => setSortBy('Managers')} className="text-black nav-link p-0" href="#">
              Is active
            </a>
          </li>
          <li className="nav-item">
            <a onClick={() => setSortBy('Users')} className="text-black nav-link p-0" href="#">
              Stop working
            </a>
          </li>
        </ul>
        <div onClick={() => navigate("/admin/add-account")} className="fw-900 add-staff">
          Add Account
        </div>
      </div>

      <table className="table table-hover m-3">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Staff</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {account_list.map((item) => (
            item.status === 1 && (
              <tr key={item.account_id}>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.role_id}</td>
                <td>{item.staff_id}</td>
                <td>
                  <div className="hstack gap-2 fs-6">
                    <button
                      onClick={() => navigate(`/admin/edit-staff/${item.staff_id}`)}
                      className="btn btn-sm btn-primary"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleShowModal(item.staff_id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    
    </div>
    </div>
  );
};

export default Accounts;
