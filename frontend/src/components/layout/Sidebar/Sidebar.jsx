import React, { useContext, useState } from "react";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import navLogo from "../../../assets/image/logo.png";
import avt from "../../../assets/image/avt-user.png";
import { CgDarkMode } from "react-icons/cg";
import { StoreContext } from "../../../context/StoreContext";

const Sidebar = () => {
  const [selected, setSelected] = useState("overview");
  const { theme, setTheme } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const settingsItems = [
    { key: "overview", label: "Overview", badge: 14, path: "" },
    { key: "staffs", label: "Staffs", badge: 14, path: "staff" },
    { key: "account", label: "Accounts", badge: 2, path: "account" },
    { key: "health-indicators", label: "Health indicators", badge: 2, path: "health-indicators" },
    { key: "chart", label: "Health monitoring chart", badge: 2, path: "chart" },
    { key: "symptoms", label: "Symptoms and diagnosis", badge: 2, path: "symptoms" },
    { key: "history", label: "Medical history", badge: 2, path: "history" },
    { key: "setting", label: "Setting", badge: 2, path: "setting" },
  ];

  return (
    <div className="sidebar p-3 d-flex flex-column position-fixed">
      <div>
        <img src={navLogo} className="w-50 mb-3" alt="Navigation Logo" />

        <ul className="list-group">
          {settingsItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setSelected(item.key);
                navigate(item.path);
              }}
              className={`list-group-item rounded-5 d-flex p-2 ${selected === item.key ? "isActive" : ""}`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto d-flex">
        <div className="profile position-relative d-flex align-items-center justify-content-between p-2 rounded-5 mb-2 w-50">
          <img src={avt} alt="Avatar" className="rounded-5" />
          <span className="user-name fw-900">Vo Quoc Dinh</span>
          {/* <div
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="fs-2 d-inline-block ms-5"
          >
            <CgDarkMode />
          </div> */}

          <ul className="logout-modal">
            <li>Vo Quoc Dinh</li>
            <li>Dark mode</li>
            <li>Log out</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
