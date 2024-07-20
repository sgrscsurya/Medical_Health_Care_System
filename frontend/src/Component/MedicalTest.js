import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MedicalTest() {
  const [testid, setTestID] = useState();
  const [pid, setPID] = useState("");
  const [test, setTest] = useState([]);
  const [filepath, setFilePath] = useState("");
  const [Details, setDetails] = useState([]);

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
    if (!filepath) {
      toast.error("Please Add File Path");
      return;
    }
    const obj = { filepath };
    axios
      .post(`http://localhost:8080/AddMedicalTest/${pid}/${testid}`, obj)
      .then((res) => {
        toast.success(res.data);
        handledetails();
      });

    axios
      .put(`http://localhost:8080/UpdateStatus/${pid}/${testid}`)
      .then((res) => {
        toast.success(res.data);
      });
  }

  function handledetails() {
    if (!pid) {
      toast.error("Please Enter Patient ID");
      return;
    }
    axios.get("http://localhost:8080/GetDetails").then((res) => {
      setDetails(res.data);
    });
  }

  console.log(Details);

  const Image = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFilePath(reader.result);
    };
  };

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

        <div className="form-group py-2">
          <label>Choose file</label>
          <input type="file" className="form-control" onChange={Image} />
        </div>

        <div className="text-end">
          <input
            type="button"
            className="btn btn-warning me-3"
            onClick={handledetails}
            value="GetDetails"
          />
          <input
            type="button"
            className="btn btn-primary"
            onClick={handlesubmit}
            value="Submit"
          />
        </div>
      </div>

      <div>
        <h2 className="text-center">Patient Test Details</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Test Date</th>
            </tr>
          </thead>
          <tbody>
            {Details.filter((data) => data.status === "pending").map((item) => {
              return (
                <tr>
                  <td>{item.testMaster.testname}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
