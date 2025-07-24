import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Landing from "./assets/pages/Landing";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
