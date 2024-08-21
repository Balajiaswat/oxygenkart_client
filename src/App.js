import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homescreen from "./pages/Homescreen";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TermsAndConditions from "./component/TermsAndConditions";
import FAQs from "./component/FAQs";
import About from "./pages/About";
import Chck from "./pages/Chck";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/termandcondition" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/not" element={<Chck />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/:id" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
