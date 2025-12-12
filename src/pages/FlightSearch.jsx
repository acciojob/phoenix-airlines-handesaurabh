import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearchDetails, setSelectedFlight } from "../redux/flightSlice";
import { useNavigate } from "react-router-dom";

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    const res = await axios.get("http://localhost:5000/api/flights/search", {
      params: { from, to, date }
    });

    dispatch(setSearchDetails({ from, to, date }));
    setFlights(res.data);
  };

  return (
    <div className="page">
      <h2>Search Flights</h2>

      <input type="text" placeholder="From City" value={from} onChange={e => setFrom(e.target.value)} />
      <input type="text" placeholder="To City" value={to} onChange={e => setTo(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <button className="book-flight" onClick={handleSearch}>Search</button>

      <div>
        {flights.map(f => (
          <div key={f.id}>
            <h4>{f.airline}</h4>
            <p>{f.from} → {f.to}</p>
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
