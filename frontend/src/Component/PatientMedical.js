import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PatientMedical() {
  const [surgery, setPatientSurgery] = useState("");
  const [medical, setPatientHistory] = useState("");
  const [allergy, setPatientAllergy] = useState("");
  const [social, setPatientSocial] = useState("");
  const [other, setPatientOther] = useState("");
  const [PId, setPId] = useState("");

  useEffect(() => {
    getPatientId();
  }, []);

  function handlesubmit() {
    if (!surgery) {
      toast.error("Please Enter Patient Surgery Details");
      return;
    }
    if (!medical) {
      toast.error("Please Enter Patient Medical History");
      return;
    }
    if (!allergy) {
      toast.error("Please Enter Patient Allergy Details");
      return;
    }
    if (!social) {
      toast.error("Please Enter Patient Social History");
      return;
    }
    if (!other) {
      toast.error("Please Enter Patient Other Details");
      return;
    }

    const obj = { surgery, medical, allergy, social, other };
    axios.post(`http://localhost:8080/AddMedical/${PId}`, obj).then((res) => {
      toast.success(res.data);
      ClearAll();
    });
  }

  function ClearAll() {
    setPatientSurgery("");
    setPatientHistory("");
    setPatientAllergy("");
    setPatientSocial("");
    setPatientOther("");
  }

  function getPatientId() {
    setPId(sessionStorage.getItem("PatientID"));
  }

  return (
    <div>
      <div className="container">
        <h2>Add Patient Medical Details</h2>
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <label>Patient Surgery Details</label>
              <input
                type="text"
                className="form-control"
                value={surgery}
                onChange={(e) => setPatientSurgery(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Patient ID</label>
              <input type="text" className="form-control" value={PId} />
            </div>

            <div className="mb-3">
              <label>Patient Medical History</label>
              <input
                type="text"
                className="form-control"
                value={medical}
                onChange={(e) => setPatientHistory(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Patient Allergy Details</label>
              <input
                type="text"
                className="form-control"
                value={allergy}
                onChange={(e) => setPatientAllergy(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Patient Social History</label>
              <input
                type="email"
                className="form-control"
                value={social}
                onChange={(e) => setPatientSocial(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Patient other Details</label>
              <input
                type="text"
                className="form-control"
                value={other}
                onChange={(e) => setPatientOther(e.target.value)}
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
    </div>
  );
}
