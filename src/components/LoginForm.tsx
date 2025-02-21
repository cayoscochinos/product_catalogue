import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const { login: authLogin } = useAuth();
  const [error, setError] = useState<string>('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await login(credentials);
      authLogin(token);
      history.push('/products');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <h2>Login</h2>
      <p>Use test@example.com / password123 to login</p>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm; 