import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Doctor() {
  const [name, setDoctorName] = useState("");
  const [email, setDoctorEmail] = useState("");
  const [phno, setDoctorPhno] = useState("");
  const [address, setDoctorAddress] = useState("");

  const [docid, setDoctorID] = useState("");

  const [deptno, setDeptNo] = useState();
  const [dept, setDept] = useState([]);
  const [getdoctor, setDoctor] = useState([]);
  function GetDept() {
    axios
      .get("http://localhost:8080/GetDept")
      .then((res) => {
        setDept(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getHospital();
    getDoctor();
    GetDept();
  }, []);

  function handlesubmit(e) {
    if (!name) {
      toast.error(" Doctor Name Not Found");
      return;
    }
    if (!address) {
      toast.error("Doctor Address Not Found");
      return;
    }
    if (!phno) {
      toast.error("Doctor Phone Number Not Found");
      return;
    }
    if (!email) {
      toast.error(" Doctor email Not Found");
      return;
    }
    e.preventDefault();
    var doc = sessionStorage.getItem("hospitalid");
    const obj = { email, address };
    axios
      .post(
        `http://localhost:8080/AddDoctor/${name}/${phno}/${doc}/${deptno}`,
        obj
      )
      .then((res) => {
        if (res.data === "Email ID Already exist") toast.error(res.data);
        else toast.success("Doctor Data Added Successfully");
        getDoctor();
        ClearAll();
      });
  }

  function ClearAll() {
    setDoctorName("");
    setDoctorAddress("");
    setDoctorPhno("");
    setDoctorEmail("");
  }

  function getHospital() {
    var doc = sessionStorage.getItem("hospitalid");
    setDoctorID(doc);
  }

  function getDoctor() {
    axios.get("http://localhost:8080/GetDoctor").then((res) => {
      setDoctor(res.data);
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2 className="text-center">Add Doctor</h2>
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Hospital ID</label>
                  <input type="text" className="form-control" value={docid} />
                </div>

                <div className="mb-3">
                  <lable>Select Department</lable>
                  <select
                    className="form-select mb-3"
                    value={deptno}
                    onChange={(e) => setDeptNo(e.target.value)}
                  >
                    <option value={0}>--Select--</option>
                    {dept.map((item) => {
                      return <option value={item.deptno}>{item.dname}</option>;
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phno}
                    onChange={(e) => setDoctorPhno(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setDoctorAddress(e.target.value)}
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

          <div className="col-8">
            <h2 className="text-center">Doctor Details</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {getdoctor.map((item) => {
                  return (
                    <tr>
                      <td>{item.dcname}</td>
                      <td>{item.department.dname}</td>
                      <td>{item.email}</td>
                      <td>{item.pno}</td>
                      <td>{item.address}</td>
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
