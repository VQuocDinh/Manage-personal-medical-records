import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/image/logo-new.png";

const PersonalInfoItem = ({ title, value }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{value}</p>
    </div>
  </div>
);

const SidebarItem = ({ children, isSelected, onClick }) => (
  <li
    onClick={onClick}
    className={`list-group-item border-0 ps-0 ${
      isSelected ? "text-primary" : ""
    }`}
    style={{ cursor: "pointer" }}
  >
    <span
      className={`text-decoration-none ${
        isSelected ? "text-primary" : "text-body"
      }`}
    >
      {children}
    </span>
  </li>
);

const Information = () => {
  const [sidebarSelect, setSidebarSelect] = useState("Personal information");

  const user = {
    name: "Vo Quoc Dinh",
    email: "vqdinh2202@gmail.com",
    birth: "22/02/2002",
    gender: "Male",
    address: "A8, hem 60, phuong Tang Nhon Phu A",
  };

  const sidebarItems = [
    "Personal information",
    "Login and security",
    "Language",
    "Privacy",
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-75">
          <img src={logo} alt="Logo" className="w-25" />
        </div>
        <button className="btn btn-primary">
          <FaSignOutAlt className="me-2" />
          Log out
        </button>
      </div>
      <hr />

      <div className="row mt-5">
        <div className="col-md-3">
          <div className="text-center mb-4">
            <FaUserCircle size={64} className="text-secondary mb-3" />
            <h3>{user.name}</h3>
            <span className="text-muted">{user.email}</span>
          </div>
          <ul className="list-group list-group-flush">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                isSelected={sidebarSelect === item}
                onClick={() => setSidebarSelect(item)}
              >
                {item}
              </SidebarItem>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <h1 className="mb-3">{sidebarSelect}</h1>
          <p className="text-muted mb-4">
            Manage your personal information, including phone numbers and email
            addresses that we may use to contact you.
          </p>
          <div className="row g-4">
            <div className="col-md-6">
              <PersonalInfoItem title="Name" value={user.name} />
            </div>
            <div className="col-md-6">
              <PersonalInfoItem title="Birth" value={user.birth} />
            </div>
            <div className="col-md-6">
              <PersonalInfoItem title="Gender" value={user.gender} />
            </div>
            <div className="col-md-6">
              <PersonalInfoItem title="Address" value={user.address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
