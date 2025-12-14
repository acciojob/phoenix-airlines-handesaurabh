import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchDetails } from "../redux/flightSlice";
import "../styles/App.css";

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("oneway");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setSearchDetails({ from, to, departureDate, returnDate, tripType }));
    navigate("/flight-booking");
  };

  return (
    <div className="container">
      <h1>Flight Booking App</h1>
      <h3>Search Flights</h3>

      <div className="trip-type">
        <label>
          <input
            type="radio"
            name="tripType"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />{" "}
          One Way
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            checked={tripType === "round"}
            onChange={() => setTripType("round")}
          />{" "}
          Round Trip
        </label>
      </div>

      <div className="search-fields">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="date-fields">
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>

        {tripType === "round" && (
          <label>
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
        )}
      </div>

      <button
        className="book-flight"
        disabled={!from || !to || !departureDate}
        onClick={handleSearch}
      >
        Search Flights
      </button>
    </div>
  );
}
