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
          if (response.data.rol === "ADMIN") {
            navigate("/dashboard");
          } else {
            navigate("/user-dashboard");
          }
      } catch (error) {
          console.error('Error en login:', error);
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    };

    return (
      <div className="login-container">
        <div className="university-brand">
          <img 
            src="/Logoeci.png" 
            alt="Logo Escuela Colombiana de Ingeniería"
            className="university-logo"
          />
          <h1 className="university-title">
            ESCUELA COLOMBIANA<br />
            DE INGENIERÍA<br />
            JULIO GARAVITO
          </h1>
          <p className="university-subtitle">UNIVERSIDAD</p>
        </div>

        <div className="login-form-container">
          <div className="login-form">
            <div className="form-header">
              <h2>Iniciar Sesión</h2>
              {error && <p className="error-message">{error}</p>}
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="ejemplo@escuela.edu.co"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn">
                Ingresar
              </button>

              <div className="form-links">
                <a className="form-link" onClick={() => navigate("/register")}>
                  Registrarse
                </a>
                <a className="form-link" onClick={() => navigate("/forgot-password")}>
                  Olvidé mi contraseña
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
};

export default Login;