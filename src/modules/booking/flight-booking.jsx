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
  const bookingData = useSelector((state) => state.flightSearch.bookingDetails);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [errorFlag, setErrorFlag] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  /**
   * @function handleFName
   * @param {object} e
   * @description get first name
   */
  const handleFName = (e) => {
    setFName(e.target.value);
  };

  /**
   * @function handleLName
   * @param {object} e
   * @description get Last name
   */
  const handleLName = (e) => {
    setLName(e.target.value);
  };

  /**
   * @function handleEmail
   * @param {object} e
   * @description get email id
   */
  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  /**
   * @function handleMobile
   * @param {object} e
   * @description get mobile number
   */
  const handleMobile = (e) => {
    const inputMobile = e.target.value;
    setMobile(inputMobile);
  };

  /**
   * @function handleConfirm
   * @param {object} e
   * @description Confirm the booking
   */
  const handleConfirm = () => {
    // Validate that all fields are filled (more lenient validation)
    const isFNameValid = fName.trim().length > 0;
    const isLNameValid = lName.trim().length > 0;
    const isEmailValid = email.trim().length > 0;
    const isMobileValid = mobile.trim().length > 0;
    
    if (isFNameValid && isLNameValid && isEmailValid && isMobileValid) {
      setErrorFlag(false);
      // Add a small delay to ensure state updates before navigation
      setTimeout(() => {
        
        history.push("/confirmation");
      }, 100);
    } else {
      setErrorFlag(true);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.filterContainer}>
        <Typography variant="h6">{`Booking Confirmation for Flight ${bookingData?.result?.airlineName} (${bookingData?.result?.flightNbr})`}</Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Passenger Name"
          value={fName}
          onChange={handleFName}
          className="passenger-name"
          data-testid="passenger-name"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Passenger Age"
          value={lName}
          onChange={handleLName}
          className="passenger-age"
          data-testid="passenger-age"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Passenger Gender"
          value={email}
          onChange={handleEmail}
          className="passenger-gender"
          data-testid="passenger-gender"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          required
          label="Passenger Contact"
          value={mobile}
          onChange={handleMobile}
          className="passenger-contact"
          data-testid="passenger-contact"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          className="confirm_booking"
          data-testid="submit-booking"
        >{`Confirm Booking`}</Button>
        {errorFlag && !fName.trim().length && !lName.trim().length && !email.trim().length && !mobile.trim().length && (
          <Typography color="error" data-testid="name-error">{`All Fields are mandatory`}</Typography>
        )}
        {errorFlag && fName.trim().length === 0 && (
          <Typography color="error" data-testid="name-error">{`Name is required`}</Typography>
        )}
        {errorFlag && lName.trim().length === 0 && (
          <Typography color="error" data-testid="age-error">{`Age is required`}</Typography>
        )}
        {errorFlag && email.trim().length === 0 && (
          <Typography color="error" data-testid="gender-error">{`Gender is required`}</Typography>
        )}
        {errorFlag && mobile.trim().length === 0 && (
          <Typography color="error" data-testid="contact-error">{`Contact is required`}</Typography>
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