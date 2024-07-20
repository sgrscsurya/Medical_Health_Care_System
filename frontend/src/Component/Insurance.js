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
      <h2 className="text-center">Insurance Menu</h2>
      <div className="text-center">
        <Link to="addpolicy" className="btn btn-primary me-2">
          Add Policy
        </Link>
        <Link to="addpolicyholder" className="btn btn-primary me-2">
          Add Policy Holder
        </Link>
        <Link to="viewpolicy" className="btn btn-primary me-2">
          View Policy Members
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
