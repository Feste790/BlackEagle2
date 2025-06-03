import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setIsAuthenticated, apiUrl }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '', // Zmieniono z e_mail na email
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Wysyłane dane:', formData); // Debugowanie
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Błąd rejestracji');
            }

            const loginResponse = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email, // Zmieniono z e_mail na email
                    password: formData.password
                })
            });

            if (!loginResponse.ok) {
                const loginData = await loginResponse.json();
                throw new Error(loginData.error || 'Nie udało się zalogować');
            }

            const loginData = await loginResponse.json();
            localStorage.setItem('access_token', loginData.access_token);
            setIsAuthenticated(true);
            navigate('/movies');
        } catch (err) {
            setError(err.message || 'Wystąpił błąd podczas rejestracji');
            console.error('Błąd:', err);
        }
    };

    return (
        <div className="register-page">
            <div className="center">
                <div className="login_logo">
                    <img src="/blackeaglelogo.png" alt="Logo" className="logo-image" />
                </div>
                <h2 className="formTitle">Rejestracja</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="first_name"
                            className="imie"
                            placeholder="Imię"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="last_name"
                            className="nazwisko"
                            placeholder="Nazwisko"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            type="text"
                            name="username"
                            className="login"
                            placeholder="Nazwa użytkownika"
                            value={formData.username}
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
                        Zarejestruj
                    </button>
                </form>
                <p className="linkreg">
                    Masz już konto?{' '}
                    <a href="/login" className="text_register_acc">
                        <span className="text_register_acc_butt">Zaloguj się</span>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;