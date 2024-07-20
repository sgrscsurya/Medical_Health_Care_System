import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container">
      <div className="text-end me-3 mb-2 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
      </div>
      <h2 className="text-center">Admin Dashboard</h2>
      <div className="text-center mb-4">
        <Link to="adminhospital" className="btn btn-primary me-2">
          AddHospital
        </Link>
        <Link to="admininsurance" className="btn btn-primary me-2">
          AddInsurance
        </Link>
        <Link to="admindepartment" className="btn btn-primary me-2">
          AddDepartment
        </Link>
        <Link to="addtest" className="btn btn-primary me-2">
          Add Test
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
