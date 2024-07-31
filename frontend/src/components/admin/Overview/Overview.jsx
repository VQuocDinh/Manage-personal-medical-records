import React, { useContext, useState } from "react";
import "./Overview.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import doctorImg from "../../../assets/image/doctor3d.png";
import { CiSearch } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { FaBedPulse } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import HealthIndicatorsChart from "../../common/HealthIndicatorsChart";
import { StoreContext } from "../../../context/StoreContext";
import MyLineChart from "../../common/LineChart";

const Overview = () => {
  const [searchInput, setSearchInput] = useState("");
  const { staffList } = useContext(StoreContext);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

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

  return (
    <div className="overview d-flex flex-column p-5 h-100 gap-4">
      <div className="d-flex justify-content-between">
        <h2 className="fw-900 d-flex gap-2">
          Good Morning, <span className="text-primary">Dr.Dinh</span>
        </h2>

        <div className="d-flex align-items-center justify-content-between">
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
        </div>
      </div>

      <div className="d-flex w-100 gap-4">
        <div className="w-75 d-flex flex-column gap-4">
          <div className="header rounded-5 p-5 position-relative">
            <h3 className="fw-bold">Visits for Today</h3>
            <span className="fs-5">1110</span>
            <div className="d-flex gap-4 mt-4">
              <div className="rounded-5 d-flex flex-column bg-white p-4">
                <span className="fw-bolder">New Patiens</span>
                <span>40</span>
              </div>

              <div className="rounded-5 d-flex flex-column bg-white p-4">
                <span className="fw-bolder">Old Patiens</span>
                <span>1070</span>
              </div>
            </div>
            <img
              src={doctorImg}
              alt="doctor image"
              className="position-absolute"
            />
          </div>

          <div className="d-flex w-100 gap-4">
            <div className="w-100 chart">
              <h4 className=" fw-900">Total number of patient</h4>
              <MyLineChart />
            </div>

            {/* <div className="w-25 d-flex flex-column">
              <h4 className="fw-900">Hopital Overview</h4>
              <div className="d-flex flex-column gap-2 h-100">
                <div className=" d-flex align-items-center justify-content-center gap-2 border border-primary text-primary rounded-5 p-3 ">
                  <span>Total Staff</span>
                  <span className="fw-bolder">900</span>
                </div>

                <div className=" d-flex align-items-center justify-content-center gap-2 border border-primary text-primary rounded-5 p-3 ">
                  <span>Total Bed</span>
                  <span className="fw-bolder">900</span>
                </div>

                <div className=" d-flex align-items-center justify-content-center gap-2 border border-primary text-primary rounded-5 p-3 ">
                  <span>Total Surgery</span>
                  <span className="fw-bolder">900</span>
                </div>

                <div className=" d-flex align-items-center justify-content-center gap-2 border border-primary text-primary rounded-5 p-3 ">
                  <span>Total Patient</span>
                  <span className="fw-bolder">900</span>
                </div>

              </div>
            </div> */}
          </div>
        </div>

        <div className="w-25 d-flex flex-column">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="read-daily mt-3 rounded-5 p-5 d-flex flex-column">
            <h4 className="fw-900">Daily Read</h4>
            <p>New rules in the dose of medicines to be consumed.</p>
            <button className="mt-auto btn btn-primary rounded-5 ms-auto">Read now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
