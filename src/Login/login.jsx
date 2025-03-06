import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí se llamaría a la API de backend para validar credenciales
        console.log('Login con:', email, password);
    };

    return (
        <div className="auth-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Ingresar</button>
            </form>
            <div className="auth-links">
                <p onClick={() => navigate('/register')}>Registrarse</p>
                <p onClick={() => navigate('/forgot-password')}>Olvidé mi contraseña</p>
            </div>
        </div>
    );
};

export default Login;
