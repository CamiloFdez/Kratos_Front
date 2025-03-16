import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log('Solicitud de recuperación para:', email);
        alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
        navigate('/');
    };

    return (
        <div className="auth-container">
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleResetPassword}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Enviar</button>
            </form>
            <div className="auth-links">
                <p onClick={() => navigate('/')}>Volver al inicio</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
