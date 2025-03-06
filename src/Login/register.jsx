import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log('Registro con:', { name, email, password });
        navigate('/'); 
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
            <div className="auth-links">
                <p onClick={() => navigate('/')}>Ya tengo una cuenta</p>
            </div>
        </div>
    );
};

export default Register;
