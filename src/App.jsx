import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./styles/App.css"


import Header from "./assets/components/header/Header.jsx";
import Home from "./pages/home";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Clubs from "./pages/Clubs.jsx";
import ClubDetailPage from "./pages/ClubDetailPage.jsx";
import Footer from "./assets/components/footer/Footer.jsx";

import ScrollToTop from "./assets/utilities/ScrollToTop.jsx";
import ScrollToTopBtn from "./assets/utilities/ScrollToTopBtn.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FavProvider } from "./context/FavContext.jsx";
import Profile from "./pages/Profile.jsx";

function App() {

  return (
    <div className="App">
      
      <Router>
          <AuthProvider>
            <FavProvider>
            <ScrollToTop />
            <Header />
              <Routes >
                <Route path="/" element={<Home />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Registration" element={<Registration />}></Route>
                {/* Страница с клубами */}
                <Route path="/Clubs" element={<Clubs />}></Route> 
                {/* Страница определенного клуба */}
                <Route path="/ClubDetailPage/:id" element={<ClubDetailPage />}></Route>
                <Route path="/profile" element={<Profile />}  />
                {/* <Route path="/resetPassword" element={<ResetPassword />} /> */}
              </Routes>
            <Footer />
            </FavProvider>
          </AuthProvider>
          <ScrollToTopBtn />
      </Router>
      </div>
  )
}

export default App
