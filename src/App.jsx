import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "../src/styles/App.css"


import Header from "./assets/components/header/header";
import Home from "./pages/home";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Clubs from "./pages/Clubs.jsx";
import ClubDetailPage from "./pages/ClubDetaiPage.jsx";
import Footer from "./assets/components/footer/Footer.jsx";

function App() {

  return (
    <div className="App">

      <Router>
        <Header />
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Registration" element={<Registration />}></Route>
          {/* Страница с клубами */}
          <Route path="/Clubs" element={<Clubs />}></Route> 
          {/* Страница определенного клуба */}
          <Route path="/ClubDetailPage/:id" element={<ClubDetailPage />}></Route>

          
        </Routes>
        <Footer />
      </Router>
      </div>
  )
}

export default App
