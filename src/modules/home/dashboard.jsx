import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import { Typography, Button } from "@material-ui/core";

const Dashboard = () => {
  const history = useHistory();

  return (
    <>
      <Typography variant="h5" className="welcome_message">{`Welcome to Flight Booking App`}</Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push("/flight-search")}
        className="search_flights_button"
      >{`Search Flights Here`}</Button>
    </>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object
};

export default Dashboard;
