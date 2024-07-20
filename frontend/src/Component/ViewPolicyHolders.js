import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ViewPolicyHolders() {
  const [ID, setPolicyID] = useState("");

  const [plist, setPList] = useState([]);

  function handlesubmit() {
    if (!ID) {
      toast.error("Please Enter Policy Holder ID");
      return;
    }

    axios.get(`http://localhost:8080/getPolicyMembers/${ID}`).then((res) => {
      setPList(res.data);
    });
    ClearAll();
  }
  function ClearAll() {
    setPolicyID("");
  }
  return (
    <div className="container">
      <div className="card mb-3 mt-3">
        <div className="card-body">
          <div className="mb-3">
            <label>Enter Policy Holder ID</label>
            <input
              type="text"
              className="form-control"
              value={ID}
              onChange={(e) => setPolicyID(e.target.value)}
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
      <div className="card p-1 bg-secondary">
        <div className="card p-3 mt-2">
          <div className="col-12">
            <h4 className="text-center">Policy Member Details</h4>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th>Policy Member ID</th>
                  <th>Policy Member Name</th>
                  <th>Policy Member Age</th>
                  <th>Policy Member Address</th>
                  <th>Policy Member Gender</th>
                  <th>Policy Member Phone</th>
                  <th>Policy Member RelationShip</th>
                </tr>
              </thead>
              <tbody>
                {plist.map((item) => (
                  <tr>
                    <td>{item.policymemberid}</td>
                    <td>{item.policymembername}</td>
                    <td>{item.policymemberage}</td>
                    <td>{item.policymemberaddress}</td>
                    <td>{item.policymembergender}</td>
                    <td>{item.policymemberphno}</td>
                    <td>{item.policymemberrelationship}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
