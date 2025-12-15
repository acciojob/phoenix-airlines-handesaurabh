import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 20,
  },
  container: {
    textAlign: "center",
    marginTop: "50px",
  }
}));

const Confirmation = () => {
  const history = useHistory();
  const classes = useStyles();
  
  
  return (
    <Grid container justifyContent="center" className={classes.container}>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="textPrimary"
          className="confirmation_message"
          id="confirmation-message"
        >{`Thank you for the Booking. Click the below button to return to home page`}</Typography>
        <Button
          variant="outlined"
          color="primary"
          className={`${classes.button} back_to_home`}
          onClick={() => history.push("/")}
        >{`Back to Home`}</Button>
      </Grid>
    </Grid>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
};

export default Confirmation;
