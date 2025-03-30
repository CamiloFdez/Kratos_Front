import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/auth.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (!email.includes('@') || !email.includes('.')) {
                throw new Error('Por favor ingresa un correo electrónico válido');
            }
            
            setIsSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
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
                        <h2>Recuperar Contraseña</h2>
                        {error && <p className="error-message">{error}</p>}
                        {isSubmitted ? (
                            <p className="success-message">
                                Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
                            </p>
                        ) : (
                            <p className="info-text">
                                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                            </p>
                        )}
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleResetPassword}>
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
                                    disabled={isLoading}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
                            </button>
                        </form>
                    ) : (
                        <button 
                            className="btn"
                            onClick={() => navigate('/')}
                        >
                            Volver al Inicio de Sesión
                        </button>
                    )}

                    <div className="form-links">
                        <a className="form-link" onClick={() => navigate("/")}>
                            ¿Recordaste tu contraseña? Inicia sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;