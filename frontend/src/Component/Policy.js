import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Policy() {
  const [polname, setPolicyName] = useState("");
  const [description, setPolicyDiscription] = useState("");
  const [icid, setInsuranceCompID] = useState();

  const [Policy, setPolicy] = useState([]);

  useEffect(() => {
    getICId();
    getPolicy();
  }, []);

  function handlesubmit() {
    if (polname === "" || description === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const obj = { polname, description };
    axios.post(`http://localhost:8080/AddPolicy/${icid}`, obj).then((res) => {
      toast.success(res.data);
      getPolicy();
      ClearAll();
    });
  }

  function ClearAll() {
    setPolicyName("");
    setPolicyDiscription("");
  }

  function getICId() {
    var id = sessionStorage.getItem("insuranceid");
    setInsuranceCompID(id);
  }

  function getPolicy() {
    axios.get("http://localhost:8080/GetPolicy").then((res) => {
      setPolicy(res.data);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h2 className="text-center">Add Policy</h2>
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label>Insurance Company ID</label>
                <input type="text" className="form-control" value={icid} />
              </div>

              <div className="mb-3">
                <label>Policy Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={polname}
                  onChange={(e) => setPolicyName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Policy Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setPolicyDiscription(e.target.value)}
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
          <h2 className="text-center">Policy Details</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Policy Description</th>
              </tr>
            </thead>
            <tbody>
              {Policy.map((item) => {
                return (
                  <tr>
                    <td>{item.polname}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
