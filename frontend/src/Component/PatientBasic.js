import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PatientBasic() {
  const [name, setPatientName] = useState("");
  const [age, setPatientAge] = useState("");
  const [gender, setPatientGender] = useState("");
  const [email, setPatientEmail] = useState("");
  const [phno, setPatientPhno] = useState("");
  const [address, setPatientAddress] = useState("");

  const [patientid, setPatientID] = useState();

  const navigate = useNavigate();

  function handlesubmit(e) {
    if (!name) {
      toast.error(" Patient Name Not Found");
      return;
    }
    if (!age) {
      toast.error("Patient Age Not Found");
      return;
    }
    if (!gender) {
      toast.error("Patient Gender Not Found");
      return;
    }
    if (!address) {
      toast.error("Patient Address Not Found");
      return;
    }
    if (!phno) {
      toast.error("Patient Phone Number Not Found");
      return;
    }
    if (!email) {
      toast.error(" Patient email Not Found");
      return;
    }
    e.preventDefault();
    const obj = { name, age, gender, address, phno, email };
    axios.post("http://localhost:8080/AddBasic", obj).then((res) => {
      sessionStorage.setItem("PatientID", res.data);
      navigate("/hospital/addpatientmedical");
      ClearAll();
    });
  }

  function ClearAll() {
    setPatientName("");
    setPatientAddress("");
    setPatientAge("");
    setPatientGender("");
    setPatientPhno("");
    setPatientEmail("");
  }

  return (
    <div className="container">
      <h2>Add Patient Basic Details</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label>Patient Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Patient Age</label>
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Patient Gender</label>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={(e) => setPatientGender(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Patient Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Patient Phone</label>
            <input
              type="text"
              className="form-control"
              value={phno}
              onChange={(e) => setPatientPhno(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Patient Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setPatientAddress(e.target.value)}
            />
          </div>

          <div className="text-end">
            <input
              type="button"
              className="btn btn-primary"
              onClick={handlesubmit}
              value="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
