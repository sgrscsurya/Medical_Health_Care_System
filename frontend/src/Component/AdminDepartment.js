import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Department() {
  const [deptno, setDeptNo] = useState("");
  const [dname, setDeptName] = useState("");
  const [details, setDeptDetails] = useState("");

  const [getdept, setDept] = useState([]);

  useEffect(() => {
    getDept();
  }, []);

  function handlesubmit() {
    if (!dname) {
      toast.error("Please Enter Dept Name");
      return;
    }
    if (!details) {
      toast.error("Please Enter Dept Details");
      return;
    }
    const obj = { dname, details };
    axios.post("http://localhost:8080/AddDept", obj).then((res) => {
      if (res.data === "Department Already exist") toast.error(res.data);
      else toast.success("Department added Successfully");
      getDept();
      ClearAll();
    });
  }
  function ClearAll() {
    setDeptName("");
    setDeptDetails("");
  }

  function getDept() {
    axios.get("http://localhost:8080/GetDept").then((res) => {
      setDept(res.data);
    });
  }

  return (
    <>
      <div>
        <div className="Container">
          <div className="row">
            <div className="col-4">
              <h2 className="text-center">New Department</h2>
              <div className="card p-3">
                <div className="mb-3">
                  <label>Enter Department Name</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={dname}
                    onChange={(e) => setDeptName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Enter Department Details</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={details}
                    onChange={(e) => setDeptDetails(e.target.value)}
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

            <div className="col-8">
              <h2 className="text-center">Department Details</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Department No</th>
                    <th>Department Name</th>
                    <th>Department Details</th>
                  </tr>
                </thead>
                <tbody>
                  {getdept.map((item) => {
                    return (
                      <tr>
                        <td>{item.deptno}</td>
                        <td>{item.dname}</td>
                        <td>{item.details}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
