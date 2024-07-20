import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Insurance() {
  const [icname, setInsuranceComName] = useState("");
  const [address, setInsuranceComAddress] = useState("");
  const [phno, setInsuranceComPhnoneno] = useState("");
  const [email, setInsuranceComEmail] = useState("");

  const [getinsurance, setInsurance] = useState([]);

  useEffect(() => {
    getInsurance();
  }, []);

  function handlesubmit(e) {
    if (!icname) {
      toast.error("Please Enter Insurance Company Name");
      return;
    }
    if (!address) {
      toast.error("Please Enter Insurance Company Address");
      return;
    }
    if (!phno) {
      toast.error("Please Enter Insurance Company PhoneNo");
      return;
    }
    if (!email) {
      toast.error("Please Enter Insurance Company Email");
      return;
    }
    e.preventDefault();
    const obj = { icname, address, phno, email };
    axios.post("http://localhost:8080/AddInsurance", obj).then((res) => {
      if (res.data === "Email ID Already exist") toast.error(res.data);
        else toast.success("Insurance Company added Successfully");
      getInsurance();
      ClearAll();
    });
  }

  function ClearAll() {
    setInsuranceComName("");
    setInsuranceComAddress("");
    setInsuranceComPhnoneno("");
    setInsuranceComEmail("");
  }

  function getInsurance() {
    axios.get("http://localhost:8080/GetInsurance").then((res) => {
      setInsurance(res.data);
    });
  }

  return (
    <>
      <div>
        <div className="Container">
          <div className="row">
            <div className="col-4">
              <h3 className="text-center"> New Insurance Company</h3>
              <div className="card p-3">
                <div className="mb-3">
                  <label>Enter insurance company Name</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={icname}
                    onChange={(e) => setInsuranceComName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Enter insurance company Address</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={address}
                    onChange={(e) => setInsuranceComAddress(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Enter insurance company PhoneNo</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={phno}
                    onChange={(e) => setInsuranceComPhnoneno(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Enter insurance company email</label>
                  <input
                    type="text"
                    className="form-control border-2"
                    value={email}
                    onChange={(e) => setInsuranceComEmail(e.target.value)}
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
              <h3 className="text-center">Insurance Company Details</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Insurance Company Name</th>
                    <th>Insurance Company Address</th>
                    <th>Insurance Company PhoneNo</th>
                    <th>Insurance Company Email</th>
                  </tr>
                </thead>
                <tbody>
                  {getinsurance.map((item) => {
                    return (
                      <tr>
                        <td>{item.icname}</td>
                        <td>{item.address}</td>
                        <td>{item.phno}</td>
                        <td>{item.email}</td>
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
