import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Hospital() {
  return (
    <div className="container">
      <div className="text-end me-3 mb-2 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
      </div>
      <h2 className="text-center">Hospital Menu</h2>
      <div className="text-center mb-4">
        <Link to="adddoctor" className="btn btn-primary me-2">
          AddDoctor
        </Link>
        <Link to="addpatientbasic" className="btn btn-primary me-2">
          AddPatientBasic
        </Link>
        <Link to="mappatientpolicy" className="btn btn-primary me-2">
          Map policy
        </Link>
        <Link to="medicaltest" className="btn btn-primary me-2">
          Medical Test
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
