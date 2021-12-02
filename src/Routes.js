import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import AllBanks from "./Containers/AllBanks";
import BankDetails from "./Containers/BankDetails";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={AllBanks} />
        <Route path="/favorites" component={AllBanks} />
        <Route path="/bank-details/:ifsc" component={BankDetails} />
      </Switch>
    </Router>
  );
}

