import React from "react";
import { Switch, Route } from "react-router-dom";

import FlightBooking from "../booking/flight-booking";
import Confirmation from "../confirmation/confirmation";
import FlightSearch from "../search/flight-search";
import Dashboard from "./dashboard";

const Home = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/search" component={FlightSearch} />
      <Route path="/booking" component={FlightBooking} />
      <Route path="/confirmation" component={Confirmation} />
    </Switch>
  );
};

export default Home;
