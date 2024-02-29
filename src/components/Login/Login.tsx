import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'

type LoginProps = {
    onLoginStatusChange: (username: string) => void;
};


export const Login: React.FC<LoginProps> = ({ onLoginStatusChange }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .get('https://fakestoreapi.com/users')
            .then(response => {
                const users = response.data;
                const user = users.find((u: any) => u.username === username && u.password === password);

                if (user) {
                    setError(null);
                    onLoginStatusChange(username);
                    navigate('/test_task_shop/products');
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Username
                    <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password
                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className={styles.btn} type="submit">Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};
