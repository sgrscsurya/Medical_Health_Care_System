import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Hospital() {
  const [hname, setHospitalName] = useState("");
  const [address, setHospitalAddress] = useState("");
  const [pno, setHospitalPhoneno] = useState("");
  const [email, setHospitalEmail] = useState("");

  const [gethospital, setHospital] = useState([]);

  useEffect(() => {
    getHospital();
  }, []);

  function handlesubmit(e) {
    if (!hname) {
      toast.error(" Hospital Name Not Found");
      return;
    }
    if (!address) {
      toast.error("Hospital Address Not Found");
      return;
    }
    if (!pno) {
      toast.error("Hospital Phone Number Not Found");
      return;
    }
    if (!email) {
      toast.error(" Hospital email Not Found");
      return;
    }
    e.preventDefault();
    const obj = { hname, address, pno, email };
    axios.post("http://localhost:8080/AddHospital", obj).then((res) => {
      debugger;
      if (res.data === "Email ID Already exist") 
        toast.error(res.data);
      else 
        toast.success("Hospital added Successfully");
      getHospital();
      ClearAll();
    });
  }

  function ClearAll() {
    setHospitalName("");
    setHospitalAddress("");
    setHospitalPhoneno("");
    setHospitalEmail("");
  }

  function getHospital() {
    axios.get("http://localhost:8080/GetHospital").then((res) => {
      setHospital(res.data);
    });
  }

  return (
    <>
      <div className="Container">
        <div className="row">
          <div className="col-4">
            <h2 className="text-center">New Hospital</h2>
            <div className="card p-3">
              <div className="mb-3">
                <label>Enter Hospital Name</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={hname}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Enter Hospital Address</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={address}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Enter Hospital PhoneNo</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={pno}
                  onChange={(e) => setHospitalPhoneno(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Enter Hospital email</label>
                <input
                  type="text"
                  className="form-control border-2"
                  value={email}
                  onChange={(e) => setHospitalEmail(e.target.value)}
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
            <h2 className="text-center">Hospital Details</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Hospital Address</th>
                  <th>Hospital PhoneNo</th>
                  <th>Hospital Email</th>
                </tr>
              </thead>
              <tbody>
                {gethospital.map((item) => {
                  return (
                    <tr>
                      <td>{item.hname}</td>
                      <td>{item.address}</td>
                      <td>{item.pno}</td>
                      <td>{item.email}</td>
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
