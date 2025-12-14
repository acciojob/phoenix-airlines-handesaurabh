import React from 'react';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchDetails } from "../redux/flightSlice";


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
<h3>Search Flights</h3>


<input type="radio" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} /> One Way
<input type="radio" checked={tripType === "round"} onChange={() => setTripType("round")} /> Round Trip


<input placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
<input placeholder="To" value={to} onChange={e => setTo(e.target.value)} />


<input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />


{tripType === "round" && (
<input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
)}


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
