import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightBooking = () => {
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [error, setError] = useState("");

  const handleBook = () => {
    if (!passengers) {
      setError("Please enter passenger count");
      return;
    }
    navigate("/confirmation");
  };

  return (
    <div className="app-container">
      <h2>Flight Booking</h2>

      {error && <p className="error">{error}</p>}

      <label>Passengers</label>
      <input
        type="number"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={roundTrip}
          onChange={() => setRoundTrip(!roundTrip)}
        />
        Round Trip
      </label>

      <button onClick={handleBook}>Book Flight</button>
    </div>
  );
};

export default FlightBooking;
