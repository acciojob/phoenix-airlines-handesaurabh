import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";

import "../../styles.css";
import Header from "../../components/header/header";
import ErrorBoundaries from "../../components/error/error";
import Confirmation from "../confirmation/confirmation";

const Dashboard = lazy(() => import("./dashboard"));
const FlightSearch = lazy(() => import("../search/flight-search"));
const FlightBooking = lazy(() => import("../booking/flight-booking"));

const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Header />
      <Toolbar />
      <Container>
        <Grid container style={{ marginTop: 100 }}>
          <Grid item xs={12} sm={12}>
            <ErrorBoundaries>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/search" component={FlightSearch} />
                  <Route path="/booking" component={FlightBooking} />
                  <Route path="/confirmation" component={Confirmation} />
                </Switch>
              </Suspense>
            </ErrorBoundaries>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
