import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import history from "./history";
import AllBanks from "./Containers/AllBanks";
import BankDetails from "./Containers/BankDetails";

export default function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" exact element={<AllBanks />} />
        <Route path="/bank-details/:ifsc" element={<BankDetails />} />
      </Routes>
    </Router>
  );
}

