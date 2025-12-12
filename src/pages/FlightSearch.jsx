import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearchDetails, setSelectedFlight } from "../redux/flightSlice";
import { useNavigate } from "react-router-dom";

export default function FlightSearch() {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cities = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad"];

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flights/search", {
        params: { from, to, date, tripType }
      });
      dispatch(setSearchDetails({ from, to, date, tripType, returnDate }));
      setFlights(res.data);
    } catch (error) {
      console.error("Error searching flights:", error);
      setFlights([]);
    }
  };

  return (
    <div className="page">
      <h2>Search Flights</h2>
      
      <div>
        <label>
          <input 
            type="radio" 
            name="tripType" 
            value="one-way" 
            checked={tripType === "one-way"}
            onChange={(e) => setTripType(e.target.value)}
          />
          One Way
        </label>
        <label>
          <input 
            type="radio" 
            name="tripType" 
            value="round-trip" 
            checked={tripType === "round-trip"}
            onChange={(e) => setTripType(e.target.value)}
          />
          Round Trip
        </label>
      </div>

      <select value={from} onChange={e => setFrom(e.target.value)}>
        <option value="">Select From City</option>
        <ul>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </ul>
      </select>

      <select value={to} onChange={e => setTo(e.target.value)}>
        <option value="">Select To City</option>
        <ul>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </ul>
      </select>

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      
      {tripType === "round-trip" && (
        <input 
          type="date" 
          value={returnDate} 
          onChange={e => setReturnDate(e.target.value)} 
          placeholder="Return Date"
        />
      )}

      <button className="book-flight" onClick={handleSearch}>Search</button>

      <div>
        {flights.length === 0 && from && to && date && (
          <p>No flights available</p>
        )}
        {flights.map(f => (
          <div key={f.id}>
            <h4>{f.airline}</h4>
            <p>{f.from} → {f.to}</p>
            <p>Price: ${f.price}</p>
            <button className="book-flight" onClick={() => {
              dispatch(setSelectedFlight(f));
              navigate("/flight-booking");
            }}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
