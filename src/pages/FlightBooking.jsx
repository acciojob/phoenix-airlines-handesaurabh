import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightBooking = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState("");
  const [error, setError] = useState("");

  const handleBook = () => {
    if (!passengers) {
      setError("Enter passenger count");
      return;
    }
    navigate("/confirmation");
  };

  return (
    <div className="app-container">
      <h2>Passenger Details</h2>
      {error && <p className="error">{error}</p>}

      <label>Passengers</label>
      <input
        type="text"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
      />

      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
};

export default FlightBooking;
