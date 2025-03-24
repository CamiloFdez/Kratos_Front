import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/auth.css';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/usuarios/login', { name, email, password });
            console.log('Registro exitoso:', response.data);
            alert("Cuenta creada. Ahora inicia sesión.");
            navigate('/');
        } catch (error) {
            console.error('Error en registro:', error);
            setError("Error al registrar. Es posible que el correo ya esté en uso.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
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
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Registrarse</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="auth-links">
                <p onClick={() => navigate('/')}>Ya tengo una cuenta</p>
            </div>
        </div>
    );
};

export default Register;
