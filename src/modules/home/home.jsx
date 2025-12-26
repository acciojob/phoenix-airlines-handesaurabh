import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";
// Assuming this path is correct for your CSS
import "../../styles.css"; 
// Assuming these paths are correct for your components
import Header from "../../components/header/header";
import ErrorBoundaries from "../../components/error/error";
import Confirmation from "../confirmation/confirmation";

// Lazy-loaded components
const Dashboard = lazy(() => import("./dashboard")); 
const FlightSearch = lazy(() => import("../search/flight-search"));
const FlightBooking = lazy(() => import("../booking/flight-booking"));

const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Header />
      {/* Toolbar is often used to push content below the fixed header */}
      <Toolbar /> 
      <Container>
        {/* Note: The 'styles' prop in Grid should be 'style' or use 'className' with makeStyles */}
        <Grid container style={{ marginTop: 20 }}> 
          <Grid item xs={12} sm={12}>
            <ErrorBoundaries>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" exact={true} component={Dashboard} />
                  <Route exact={true} path="/flight-search" component={FlightSearch} />
                  <Route exact={true} path="/flight-booking" component={FlightBooking} />
                  <Route exact={true} path="/confirmation" component={Confirmation} />
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
