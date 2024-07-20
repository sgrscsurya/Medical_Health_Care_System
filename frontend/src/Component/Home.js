import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    if (usetype == 1) {
      if (!inchargerid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!inpassword) {
        toast.error("Please Enter Password");
        return;
      }
      const obj = { inchargerid, inpassword };
      axios.post("http://localhost:8080/userLogin", obj).then((res) => {
        if (res.data === "Login Successfully") {
          navigate("/admin");
        } else {
          toast.error(res.data);
        }
      });
    } else if (usetype == 2) {
      if (!inchargerid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!inpassword) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("hospitalid", inchargerid);

      axios
        .get(
          `http://localhost:8080/chkHospitalLogin/${inchargerid}/${inpassword}`
        )
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/hospital");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 3) {
      if (!inchargerid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!inpassword) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("insuranceid", inchargerid);
      axios
        .get(
          `http://localhost:8080/chkInsuranceLogin/${inchargerid}/${inpassword}`
        )
        .then((res) => {
          if (res.data === "Correct password") {
            navigate("/insurance");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 4) {
      if (!inchargerid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!inpassword) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("doctorid", inchargerid);
      axios
        .get(
          `http://localhost:8080/chkDoctorLogin/${inchargerid}/${inpassword}`
        )
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
      <div className="container">
        <h2 className="text-center mb-4">Healthcare System</h2>
        <div className="card p-1 bg-warning">
          <div className="card p-4 ">
            <div>
              <div className="mb-3">
                <label>Select User Type</label>
                <select
                  className="form-select mb-3"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value={0}>--Select--</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Hospital</option>
                  <option value={3}>Insurance</option>
                  <option value={4}>Doctor</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Enter User ID</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={inchargerid}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Enter Password</label>
                <input
                  type="password"
                  className="form-control border-2"
                  value={inpassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-end">
                <input
                  type="button"
                  className="btn btn-outline-info me-3"
                  onClick={handlelogin}
                  value="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
