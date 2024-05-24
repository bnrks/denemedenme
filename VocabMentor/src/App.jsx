import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Components/LoginScreen";
import RegisterScreen from "./Components/RegisterScreen";
import WordAddForm from "./Components/WordAddForm";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Toaster></Toaster>
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/wordaddpage" element={<WordAddForm />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
