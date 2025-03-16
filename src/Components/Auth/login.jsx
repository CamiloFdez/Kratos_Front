import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí se llamaría a la API de backend para validar credenciales
        console.log('Login con:', email, password);
        navigate("/dashboard");
        // Simular validación de credenciales
        // if (email === 'usuario@test.com' && password === '123456') {
            // navigate('/dashboard'); // Redirige al dashboard
        // } else {
            // alert('Credenciales incorrectas');
        // }
    };

    return (
        <div className="auth-container">
          <h2>Iniciar Sesión</h2>
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
