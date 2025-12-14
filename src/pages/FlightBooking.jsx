import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingDetails } from "../redux/flightSlice";


export default function FlightBooking() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [error, setError] = useState("");


const dispatch = useDispatch();
const navigate = useNavigate();


const handleConfirm = () => {
if (!name || !email || !phone) {
setError("All fields are required");
return;
}


dispatch(setBookingDetails({ name, email, phone }));
navigate("/confirmation");
};


return (
<div className="container">
<h3>Passenger Details</h3>
<input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
<input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
{error && <p className="error">{error}</p>}
<button onClick={handleConfirm}>Confirm Booking</button>
</div>
);
}
