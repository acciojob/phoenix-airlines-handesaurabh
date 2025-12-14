import React from 'react';

import { useNavigate } from "react-router-dom";


export default function Confirmation() {
const navigate = useNavigate();


return (
<div className="container">
<h3>Booking Confirmed 🎉</h3>
<button onClick={() => navigate("/")}>Home</button>
</div>
);
}
