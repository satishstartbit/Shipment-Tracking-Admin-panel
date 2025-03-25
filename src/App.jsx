import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutMain from "./layouts/layout/LayoutMain";
import { Users } from "./page/users";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
