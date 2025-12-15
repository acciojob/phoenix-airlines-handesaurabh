import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";

const FlightBooking = () => {
  const history = useHistory();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("round");
  const [flights, setFlights] = useState([]);
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");

  // Fake API call to fetch flights
  const searchFlights = () => {
    setTimeout(() => {
      if (from && to) setFlights([{ id: 1, name: "Flight A" }]);
      else setFlights([]);
    }, 500);
  };

  const handleSubmit = () => {
    if (!personName || !email) {
      alert("Please fill details");
      return;
    }
    history.push("/confirmation");
  };

  return (
    <div>
      <Typography variant="h5">Flight Booking</Typography>
      <TextField
        data-cy="fromInput"
        label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <TextField
        data-cy="toInput"
        label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <RadioGroup
        data-cy="tripType"
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        row
      >
        <FormControlLabel
          value="round"
          control={<Radio data-cy="roundTrip" />}
          label="Round Trip"
        />
        <FormControlLabel
          value="oneway"
          control={<Radio data-cy="oneWayTrip" />}
          label="One Way"
        />
      </RadioGroup>

      <Button data-cy="searchFlights" onClick={searchFlights} variant="contained">
        Search Flights
      </Button>

      {flights.length === 0 ? (
        <Typography data-cy="noFlights">No flights available</Typography>
      ) : (
        <div>
          {flights.map((f) => (
            <Typography key={f.id}>{f.name}</Typography>
          ))}

          <TextField
            data-cy="personName"
            label="Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <TextField
            data-cy="personEmail"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button data-cy="bookFlight" onClick={handleSubmit} variant="contained">
            Book Flight
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
