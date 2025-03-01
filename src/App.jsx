import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
// import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import LoginPage from "./Pages/LoginPage";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import NotificationPage from "./Pages/NotificationPage";

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <div className="mt-20">
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notificationbyid" element={<NotificationPage />} />

        </Routes>
        </div>
        {/* <Cards />  */}
        {/* <Footer />   */}
      </BrowserRouter>
    </div>
  );
}

export default App;
