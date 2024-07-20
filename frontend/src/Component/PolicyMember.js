import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PolicyMember() {
  const [policymembername, setMemberName] = useState("");
  const [policymemberage, setMemberAge] = useState("");
  const [policymembergender, setMemberGender] = useState("");
  const [policymemberrelationship, setMemberRelationship] = useState("");
  const [policymemberphno, setMemberPhno] = useState("");
  const [policymemberaddress, setMemberAddress] = useState("");
  const [PHId, setPHId] = useState("");

  const [Member, setMember] = useState([]);

  useEffect(() => {
    getPolicyHId();
    getMember();
  }, []);

  function handlesubmit(e) {
    if (!policymembername) {
      toast.error(" Policy member Name Not Found");
      return;
    }
    if (!policymemberage) {
      toast.error("Policy member Not Found");
      return;
    }
    if (!policymembergender) {
      toast.error("Policy member gender Not Found");
      return;
    }
    if (!policymemberaddress) {
      toast.error("Policy member Address Not Found");
      return;
    }
    if (!policymemberrelationship) {
      toast.error("Policy member Relationship Not Found");
      return;
    }
    if (!policymemberphno) {
      toast.error("Policy member Phone Number Not Found");
      return;
    }

    e.preventDefault();
    const obj = {
      policymembername,
      policymemberage,
      policymembergender,
      policymemberaddress,
      policymemberrelationship,
      policymemberphno,
    };
    axios.post(`http://localhost:8080/AddMember/${PHId}`, obj).then((res) => {
      toast.success(res.data);
      getMember();
      ClearAll();
    });
  }

  function ClearAll() {
    setMemberName("");
    setMemberAge("");
    setMemberGender("");
    setMemberPhno("");
    setMemberAddress("");
    setMemberRelationship("");
  }

  function getPolicyHId() {
    setPHId(sessionStorage.getItem("PolicyHolderID"));
  }

  function getMember() {
    axios.get("http://localhost:8080/GetMember").then((res) => {
      setMember(res.data);
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Add PolicyMember Details</h2>
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label>PolicyMember Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymembername}
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>PolicyHolder ID</label>
                  <input type="text" className="form-control" value={PHId} />
                </div>

                <div className="mb-3">
                  <label>PolicyMember Age</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymemberage}
                    onChange={(e) => setMemberAge(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>PolicyMember Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymembergender}
                    onChange={(e) => setMemberGender(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>PolicyMember Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymemberphno}
                    onChange={(e) => setMemberPhno(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>PolicyMember RelationShip</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymemberrelationship}
                    onChange={(e) => setMemberRelationship(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>PolicyMember Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={policymemberaddress}
                    onChange={(e) => setMemberAddress(e.target.value)}
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
            <h2 className="text-center">PolicyMember Details</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>PolicyMember ID</th>
                  <th>PolicyMember Name</th>
                  <th>PolicyMember Age</th>
                  <th>PolicyMember Gender</th>
                  <th>PolicyMember Phone</th>
                  <th>PolicyMember RelationShip</th>
                  <th>PolicyMember Address</th>
                </tr>
              </thead>
              <tbody>
                {Member.map((item) => {
                  return (
                    <tr>
                      <td>{item.policymemberid}</td>
                      <td>{item.policymembername}</td>
                      <td>{item.policymemberage}</td>
                      <td>{item.policymembergender}</td>
                      <td>{item.policymemberphno}</td>
                      <td>{item.policymemberrelationship}</td>
                      <td>{item.policymemberaddress}</td>
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
