import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  filterContainer: {
    marginBottom: 25
  }
}));

const FlightBooking = () => {
  const bookingData = useSelector(
    (state) => state.flightSearch.bookingDetails
  );

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const handleConfirm = () => {
    if (
      fName.trim().length > 0 &&
      lName.trim().length > 0 &&
      email.trim().length > 0 &&
      mobile.trim().length > 0
    ) {
      setErrorFlag(false);
      history.push("/confirmation");
    } else {
      // ✅ ONLY show validation error
      setErrorFlag(true);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.filterContainer}>
        <Typography variant="h6">
          {`Booking Confirmation for Flight ${bookingData?.result?.airlineName} (${bookingData?.result?.flightNbr})`}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          className="first_name"
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          className="last_name"
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email_id"
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mobile_number"
        />
      </Grid>

      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          className="confirm_booking"
        >
          {`Confirm Booking`}
        </Button>

        {errorFlag && (
          <Typography color="error">
            {`All Fields are mandatory`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

FlightBooking.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
};

export default FlightBooking;
