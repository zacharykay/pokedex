import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

import Home from "./pages/Home";

import "./index.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
