import React, { useState } from 'react';
import { loginUser } from '../../api/CameraApi';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

import LoginHeader from './LoginHeader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password: contrasena });
            localStorage.setItem('sanctum_token', response.access_token);
            localStorage.setItem('name', response.name);
            localStorage.setItem('rol', response.rol);
            localStorage.setItem('id', response.id);
            navigate('/dashboard'); 
        } catch (err) {
            setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className={styles.loginBackground}>
            <>
                <LoginHeader />
                <div className={styles.Hola}>
                    <div className={`${styles['container-form']} ${styles['sign-up']}`}>
                        <div className={styles['welcome-back']}>
                            <div className={styles.message}>
                                <h2> Bienvenido a DataFarm</h2>
                                <p>Las plagas ya no son un problema</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.formulario}>
                            <h2 className={styles['create-account']}> Iniciar Sesión</h2>
                            <p className={styles['cuenta-gratis']}> Por favor ingresa tu correo y contraseña</p>
                             {error && <p style={{ color: 'red' }}>{error}</p>}
                            <input
                                type="email"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                            <button className={styles['custom-button']} type="submit">Ingresar</button>
                        </form>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Login;
