import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">
      <h1>Phoenix Airlines</h1>
      <Link to="/flight-search">
        <button className="book-flight">Search Flights</button>
      </Link>
    </div>
  );
}
