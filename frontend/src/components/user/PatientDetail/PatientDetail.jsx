import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

const HealthIndicatorContainer = () => {};

const PersonalInformationContainer = ({ user }) => (
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
);

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

const PatientDetail = () => {
  const { patientId } = useParams();
  const [sidebarSelect, setSidebarSelect] = useState("Personal information");
  const [modalIsOpen, setIsOpen] = useState(false);
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
  const user = {
    name: "Vo Quoc Dinh",
    email: "vqdinh2202@gmail.com",
    birth: "22/02/2002",
    gender: "Male",
    address: "A8, hem 60, phuong Tang Nhon Phu A",
  };

  const sidebarItems = [
    "Personal information",
    "Health indicators",
    "Medical history",
    "Health monitoring chart"
  ];

  return (
    <div className="container mt-4">
      <div className="row mt-5">
        <div className="col-md-3">
          <div className="mb-4">
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
          <div className="container">
            {sidebarSelect === "Personal information" ? (
              <PersonalInformationContainer user={user} />
            ) : (
              <HealthIndicatorContainer />
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Take Photo"
      >
        <div className="text-center">
          <button
            className="btn btn-close float-end"
            onClick={() => setIsOpen(false)}
          ></button>
          <h2 className="mb-4">Take a Photo</h2>

         
        </div>
      </Modal>
    </div>
  );
};

export default PatientDetail;
