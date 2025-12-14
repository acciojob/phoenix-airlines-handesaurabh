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
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!from || !to) {
      setError("Please select source and destination");
      return;
    }

    dispatch(setSearchDetails({ from, to }));
    navigate("/flight-booking");
  };

  return (
    <div className="app-container">
      <h2>Search Flights</h2>

      {error && <p className="error">{error}</p>}

      {/* FROM */}
      <div className="dropdown">
        <label>From</label>
        <input
          value={from}
          onClick={() => setShowFrom(!showFrom)}
          readOnly
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
      </div>

      {/* TO */}
      <div className="dropdown">
        <label>To</label>
        <input
          value={to}
          onClick={() => setShowTo(!showTo)}
          readOnly
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
      </div>

      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
};

export default FlightSearch;
