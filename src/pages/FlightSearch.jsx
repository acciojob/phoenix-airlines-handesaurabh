import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchDetails } from "../redux/flightSlice";
import { useNavigate } from "react-router-dom";

const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

const FlightSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [tripType, setTripType] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!from || !to || !tripType) {
      setError("Please fill all fields");
      return;
    }

    dispatch(setSearchDetails({ from, to, tripType }));
    navigate("/flight-booking");
  };

  return (
    <div className="app-container">
      <h2>Search Flights</h2>
      {error && <p className="error">{error}</p>}

      {/* FROM */}
      <label>From</label>
      <input
        type="text"
        value={from}
        onClick={() => setShowFrom(true)}
        onChange={(e) => setFrom(e.target.value)}
      />
      {showFrom && (
        <ul>
          {cities.map((city) => (
            <li
              key={city}
              onClick={() => {
                setFrom(city);
                setShowFrom(false);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {/* TO */}
      <label>To</label>
      <input
        type="text"
        value={to}
        onClick={() => setShowTo(true)}
        onChange={(e) => setTo(e.target.value)}
      />
      {showTo && (
        <ul>
          {cities.map((city) => (
            <li
              key={city}
              onClick={() => {
                setTo(city);
                setShowTo(false);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {/* TRIP TYPE */}
      <label>
        <input
          type="radio"
          name="trip"
          value="oneway"
          onChange={(e) => setTripType(e.target.value)}
        />
        One Way
      </label>

      <label>
        <input
          type="radio"
          name="trip"
          value="round"
          onChange={(e) => setTripType(e.target.value)}
        />
        Round Trip
      </label>

      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
};

export default FlightSearch;
