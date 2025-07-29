import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Landing from "./assets/pages/Landing";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";
import Price from "./assets/pages/Price";
import store from "./assets/store/store";
import { Provider } from "react-redux";
import Navbar from "./assets/components/Navbar";

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
