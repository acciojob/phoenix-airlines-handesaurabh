import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const { bookingDetails } = useSelector(state => state.flight);

  return (
    <div className="page">
      <h2>Booking Confirmed!</h2>

      <p>Name: {bookingDetails.name}</p>
      <p>Email: {bookingDetails.email}</p>
      <p>Flight: {bookingDetails.flight.from} → {bookingDetails.flight.to}</p>

      <Link to="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
}
