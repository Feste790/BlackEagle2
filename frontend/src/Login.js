import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated, apiUrl = 'http://localhost:5000' }) {
    const [formData, setFormData] = useState({
        email: '', // Zmieniono z e_mail na email
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Wysyłane dane:', formData);
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || `Błąd serwera: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            setIsAuthenticated(true);
            navigate('/movies');
        } catch (err) {
            setError(err.message || 'Wystąpił błąd podczas logowania');
            console.error('Błąd:', err);
        }
    };

    return (
        <div className="login-page">
            <div className="center">
                <div className="login_logo">
                    <img src="/logo.png" alt="Logo" className="logo-image" />
                </div>
                <h2 className="formTitle">Logowanie</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email" // Zmieniono z e_mail na email
                            className="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            className="password"
                            placeholder="Hasło"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submitButtonLogin">
                        Zaloguj
                    </button>
                </form>
                <p className="linkreg">
                    Nie masz konta?{' '}
                    <a href="/register" className="text_register_acc">
                        <span className="text_register_acc_butt">Zarejestruj się</span>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;