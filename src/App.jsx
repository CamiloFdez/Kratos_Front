import { useState } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Auth/login";
import Register from "./Components/Auth/register";
import ForgotPassword from "./Components/Auth/forgotPassword";
import Dashboard from "./Components/Dashboard/dashboard";
import './styles/auth.css';

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
        </Routes>
      </Router>
    </>
  )
}

export default App
