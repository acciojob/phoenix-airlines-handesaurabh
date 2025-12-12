import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">
      <h1>Welcome to Flight Booking App</h1>
      <h2>Phoenix Airlines</h2>
      <Link to="/flight-search">
        <button className="book-flight">Search Flights</button>
      </Link>
    </div>
  );
}
