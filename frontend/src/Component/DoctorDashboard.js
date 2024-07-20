import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Insurance() {
  return (
    <div className="container">
      <div className="text-end me-3 mb-3 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
      </div>
      <h2 className="text-center">Doctor Menu</h2>
      <div className="text-center">
        <Link to="viewpatient" className="btn btn-primary me-2">
          View Patient
        </Link>
        <Link to="addtreatment" className="btn btn-primary me-2">
          Add Treatment
        </Link>
        <Link to="patienttest" className="btn btn-primary me-2">
          Patient Test
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
