import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MapPolicyPatient() {
  const [hid, setHID] = useState("");
  const [mid, setMID] = useState("");
  const [pid, setPID] = useState("");

  useEffect(() => {
    getHospital();
  }, []);

  function getHospital() {
    var map = sessionStorage.getItem("hospitalid");
    setHID(map);
  }

  function handlesubmit() {
    if (!mid) {
      toast.error("Member ID Not Found");
      return;
    }
    if (!pid) {
      toast.error("Patient ID Not Found");
      return;
    }
    axios
      .post(`http://localhost:8080/MapPolicyPatient/${mid}/${pid}/${hid}`)
      .then((res) => {
        toast.success(res.data);
      });
  }
  return (
    <div>
      <div className="card p-3 mt-3">
        <div className="mb-3">
          <label>Member ID</label>
          <input
            type="text"
            className="form-control"
            value={mid}
            onChange={(e) => setMID(e.target.value)}
          />
        </div>

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
          <label>Hospital ID</label>
          <input type="text" className="form-control" value={hid} />
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
