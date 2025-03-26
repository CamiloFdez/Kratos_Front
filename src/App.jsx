import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Auth/login";
import Register from "./Components/Auth/register";
import ForgotPassword from "./Components/Auth/forgotPassword";
import Dashboard from "./Components/Dashboard/dashboard";
import UserDashboard from "./Components/Dashboard/user-dashboard";
import './styles/auth.css';
import Analytics from './Components/Dashboard/analytics';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
