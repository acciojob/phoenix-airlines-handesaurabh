import React from 'react';
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
const navigate = useNavigate();


return (
<div className="container">
<h2>Phoenix Airlines</h2>
<button onClick={() => navigate("/flight-search")}>
Book Flight
</button>
</div>
);
}
