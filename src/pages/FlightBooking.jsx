import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "../redux/flightSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FlightBooking() {
  const { selectedFlight } = useSelector(state => state.flight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Name required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email";
    if (!/^\d{10}$/.test(form.phone)) return "Invalid phone number";
    return "";
  };

  const handleSubmit = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    dispatch(setBookingDetails({ ...form, flight: selectedFlight }));
    navigate("/confirmation");
  };

  return (
    <div className="page">
      <h2>Flight Booking</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input type="text" placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input type="text" placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input type="text" placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })} />

      <button onClick={handleSubmit}>Confirm Booking</button>
    </div>
  );
}
