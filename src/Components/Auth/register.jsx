import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await axios.post('http://localhost:8080/usuarios', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            console.log('Registro exitoso:', response.data);
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (err) {
            console.error('Error en registro:', err);
            setError(err.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-brand">
            <img 
                src="/Logoeci.png" 
                alt="Logo Escuela Colombiana de Ingeniería"
                className="university-logo"
            />
                <h1>ESCUELA COLOMBIANA DE INGENIERÍA JULIO GARAVITO</h1>
                <p>UNIVERSIDAD</p>
            </div>
            
            <div className="register-form-container">
                <div className="register-form">
                    <div className="register-header">
                        <h2>Registro</h2>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Tu nombre completo"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="ejemplo@escuela.edu.co"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                        </button>
                    </form>
                    
                    <div className="form-links">
                        <p>
                            ¿Ya tienes una cuenta? {' '}
                            <a 
                                className="form-link" 
                                onClick={() => navigate('/')}
                            >
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;