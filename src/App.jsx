import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "../src/styles/App.css"


import Header from "./assets/components/header/header";
import Home from "./pages/home";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Clubs from "./pages/Clubs.jsx";
import Club from "./pages/Club.jsx";

function App() {

  return (
    <div className="App">

      <Router>
        <Header />
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Registration" element={<Registration />}></Route>
          <Route path="/Clubs" element={<Clubs />}></Route>
          <Route path="/Club/:id" element={<Club />}></Route>

          
        </Routes>
      </Router>
      </div>
  )
}

export default App
