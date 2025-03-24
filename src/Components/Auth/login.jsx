import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/auth.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');

      try {
          const response = await axios.post('http://localhost:8080/usuarios/login', { email, password });
          console.log('Login exitoso:', response.data);
          localStorage.setItem('user', JSON.stringify(response.data)); 
          navigate("/dashboard");
      } catch (error) {
          console.error('Error en login:', error);
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    };

    return (
        <div className="auth-container">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>} 
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Ingresar</button>
          </form>
          <div className="auth-links">
            <p onClick={() => navigate("/register")}>Registrarse</p>
            <p onClick={() => navigate("/forgot-password")}>Olvidé mi contraseña</p>
          </div>
        </div>
      );
    };

export default Login;
