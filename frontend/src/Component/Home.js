import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css"; // ✅ Import Home.css
import logo from "./logo.png"; // ✅ Import Logo

export default function Home() {
  const [usetype, setUserType] = useState("");
  const [inchargerid, setUserId] = useState();
  const [inpassword, setPassword] = useState("");

  const navigate = useNavigate();

  function handlelogin() {
    if (!usetype) {
      toast.error("Please Select User Type");
      return;
    }

    if (!inchargerid) {
      toast.error("Please Enter User ID");
      return;
    }

    if (!inpassword) {
      toast.error("Please Enter Password");
      return;
    }

    if (usetype == 1) {
      const obj = { inchargerid, inpassword };
      axios.post("http://localhost:8080/userLogin", obj).then((res) => {
        if (res.data === "Login Successfully") {
          navigate("/admin");
        } else {
          toast.error(res.data);
        }
      });
    } else if (usetype == 2) {
      sessionStorage.setItem("hospitalid", inchargerid);
      axios
        .get(`http://localhost:8080/chkHospitalLogin/${inchargerid}/${inpassword}`)
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/hospital");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 3) {
      sessionStorage.setItem("insuranceid", inchargerid);
      axios
        .get(`http://localhost:8080/chkInsuranceLogin/${inchargerid}/${inpassword}`)
        .then((res) => {
          if (res.data === "Correct password") {
            navigate("/insurance");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 4) {
      sessionStorage.setItem("doctorid", inchargerid);
      axios
        .get(`http://localhost:8080/chkDoctorLogin/${inchargerid}/${inpassword}`)
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/doctor");
          } else {
            toast.error(res.data);
          }
        });
    }
  }

  return (
    <>
      <div className="login-container"> {/* ✅ Added missing class */}
        <img src={logo} alt="Logo" className="logo" /> {/* ✅ Added Logo */}
        <h2 className="title text-center">Healthcare System</h2>
        <div className="login-card"> {/* ✅ Applied missing class */}
          <div>
            <div className="form-group">
              <label className="form-label">Select User Type</label>
              <select className="form-control" onChange={(e) => setUserType(e.target.value)}>
                <option value={0}>--Select--</option>
                <option value={1}>Admin</option>
                <option value={2}>Hospital</option>
                <option value={3}>Insurance</option>
                <option value={4}>Doctor</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Enter User ID</label>
              <input
                type="text"
                className="form-control"
                value={inchargerid}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID" // ✅ Added Placeholder
              />
            </div>

            <div className="form-group">
              <label className="form-label">Enter Password</label>
              <input
                type="password"
                className="form-control"
                value={inpassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" // ✅ Added Placeholder
              />
            </div>

            <div className="text-end">
              <button className="login-btn" onClick={handlelogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
