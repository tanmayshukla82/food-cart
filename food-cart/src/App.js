import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Context from "./context/Context";
import Cart from "./page/Cart";
function App() {
  return (
    <div>
      <Context>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </Router>
      </Context>
    </div>
  );
}

export default App;
