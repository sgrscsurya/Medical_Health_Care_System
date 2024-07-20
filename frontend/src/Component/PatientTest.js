import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PaientTest() {
  const [testid, setTestID] = useState();
  const [pid, setPID] = useState("");
  const [test, setTest] = useState([]);

  useEffect(() => {
    GetTest();
  }, []);

  function GetTest() {
    axios
      .get("http://localhost:8080/GetTest")
      .then((res) => {
        setTest(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlesubmit() {
    if (!pid) {
      toast.error("Please Enter Patient ID");
      return;
    }
    if (!testid) {
      toast.error("Please Select Test Type");
      return;
    }
    axios
      .post(`http://localhost:8080/AddPatientTest/${pid}/${testid}`)
      .then((res) => {
        toast.success(res.data);
      });
  }

  return (
    <div className="container">
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
          <lable>Select Test</lable>
          <select
            className="form-select mb-3"
            value={testid}
            onChange={(e) => setTestID(e.target.value)}
          >
            <option value={0}>--Select--</option>
            {test.map((item) => {
              return <option value={item.testid}>{item.testname}</option>;
            })}
          </select>
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
