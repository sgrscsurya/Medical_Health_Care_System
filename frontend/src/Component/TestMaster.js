import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TestMaster() {
  const [testname, setTestName] = useState("");

  const [gettest, setTest] = useState([]);

  useEffect(() => {
    getTest();
  }, []);

  function handlesubmit() {
    if (testname === "") {
      toast.error("Please Enter the test name");
      return;
    }
    const obj = { testname };
    axios.post("http://localhost:8080/AddTest", obj).then((res) => {
      if (res.data === "Test already exist") toast.error(res.data);
      else toast.success("Test added successfully");
      getTest();
      ClearAll();
    });
  }
  function ClearAll() {
    setTestName("");
  }

  function getTest() {
    axios.get("http://localhost:8080/GetTest").then((res) => {
      setTest(res.data);
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h2 className="test-center">Add test</h2>
            <div className="card p-3">
              <div className="mb-3">
                <label>Enter Test Name</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={testname}
                  onChange={(e) => setTestName(e.target.value)}
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

          <div className="col-5">
            <h2 className="text-center">Test Details</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Test Name</th>
                </tr>
              </thead>
              <tbody>
                {gettest.map((item) => {
                  return (
                    <tr>
                      <td>{item.testid}</td>
                      <td>{item.testname}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
