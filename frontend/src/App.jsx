import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Landing from "./assets/pages/Landing";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
