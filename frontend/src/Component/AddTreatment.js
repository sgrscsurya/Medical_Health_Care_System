import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddTreatment() {
  const [treatmentdetails, setTreatmentDetails] = useState("");
  const [pid, setPID] = useState("");
  const [did, setDID] = useState("");

  useEffect(() => {
    getPatientId();
    getDoctorId();
  }, []);

  function handlesubmit() {
    if (treatmentdetails === "") {
      toast.error("Please Enter Treatment Details");
      return;
    }
    if (!pid) {
      toast.error("Please Enter Patient ID");
      return;
    }
    if (!did) {
      toast.error("Please Enter Doctor ID");
      return;
    }
    const obj = { treatmentdetails };
    axios
      .post(`http://localhost:8080/AddTreatment/${pid}/${did}`, obj)
      .then((res) => {
        toast.success(res.data);
      });
  }

  function getPatientId() {
    var patientid = sessionStorage.getItem("patientid");
    setPID(patientid);
  }

  function getDoctorId() {
    var doctorid = sessionStorage.getItem("doctorid");
    setDID(doctorid);
  }

  return (
    <div>
      <div className="card p-3 mt-3">
        <div className="mb-3">
          <label>Patient ID</label>
          <input
            type="text"
            className="form-control"
            value={pid}
            onChange={(e) => setPID(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Doctor ID</label>
          <input type="text" className="form-control" value={did} />
        </div>

        <div className="mb-3">
          <label>Enter Treatment Details</label>
          <textarea
            className="form-control"
            value={treatmentdetails}
            onChange={(e) => setTreatmentDetails(e.target.value)}
          ></textarea>
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
  );
}
