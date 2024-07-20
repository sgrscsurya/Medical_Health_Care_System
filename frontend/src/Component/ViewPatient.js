import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ViewPatient() {
  const [ID, setPatientID] = useState("");

  const [list, setList] = useState({});
  const [mlist, setMList] = useState({});
  const [tlist, setTList] = useState([]);
  const [rlist, setRList] = useState([]);

  function handlesubmit() {
    if (!ID) {
      toast.error("Please Enter Patient ID");
      return;
    }

    axios.get(`http://localhost:8080/GetPatientBasic/${ID}`).then((res) => {
      if (typeof res.data === "object") {
        sessionStorage.setItem("patientid", ID);
        setList(res.data);
      } else {
        toast.error(res.data);
        return;
      }

      axios.get(`http://localhost:8080/getPatientmedical/${ID}`).then((res) => {
        setMList(res.data);
      });

      axios
        .get(`http://localhost:8080/getTreatmentDetails/${ID}`)
        .then((res) => {
          setTList(res.data);
        });

      axios.get(`http://localhost:8080/getTestReport/${ID}`).then((res) => {
        setRList(res.data);
      });
    });

    ClearAll();
  }

  function ClearAll() {
    setPatientID("");
  }

  return (
    <div className="container">
      <div className="card mb-3 mt-3">
        <div className="card-body">
          <div className="mb-3">
            <label>Enter Patient ID</label>
            <input
              type="text"
              className="form-control"
              value={ID}
              onChange={(e) => setPatientID(e.target.value)}
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

      <div className="card p-3 bg-secondary">
        <div className="card p-3">
          <div className="col-10">
            <h4 className="text-center">Patient Basic Details</h4>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Patient Age</th>
                  <th>Patient Gender</th>
                  <th>Patient Phone</th>
                  <th>Patient Email</th>
                  <th>Patient Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{list.name}</td>
                  <td>{list.age}</td>
                  <td>{list.gender}</td>
                  <td>{list.phno}</td>
                  <td>{list.email}</td>
                  <td>{list.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-3 mt-2">
          <div className="col-10">
            <h4 className="text-center">Patient Medical Details</h4>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Patient Surgery Details</th>
                  <th>Patient Medical History</th>
                  <th>Patient Allergy Details</th>
                  <th>Patient Social History</th>
                  <th>Patient Other Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mlist.surgery}</td>
                  <td>{mlist.medical}</td>
                  <td>{mlist.allergy}</td>
                  <td>{mlist.social}</td>
                  <td>{mlist.other}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-3 mt-2">
          <div className="col-10">
            <h4 className="text-center">Treatment Details</h4>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Patient TID</th>
                  <th>Patient ID</th>
                  <th>Treatment Date</th>
                  <th>Treatment Details</th>
                </tr>
              </thead>
              <tbody>
                {tlist.map((item) => (
                  <tr>
                    <td>{item.treatmentid}</td>
                    <td>{item.patientBasic?.patientid}</td>
                    <td>{item.treatmentdate}</td>
                    <td>{item.treatmentdetails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-3 mt-2">
          <div className="col-10">
            <h4 className="text-center">Test Details</h4>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Test Date</th>
                  <th>DownLoad Report</th>
                </tr>
              </thead>
              <tbody>
                {rlist.map((item) => {
                  return (
                    <tr>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>
                        <a href={item[2]} download>
                          {" "}
                          Download Document
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
