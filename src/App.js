import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import SignInSide from "./SignInSide";
import Dashboard from "./dashboard";


export default function App() {
  return (
    <div>
      <Routes>

          <Route path="/" element={<SignInSide/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/users" element={<Dashboard/>} />
          <Route path="/account" element={<Dashboard/>} />
          <Route path="/movements" element={<Dashboard/>} />

      </Routes>
    </div>
  );
}


