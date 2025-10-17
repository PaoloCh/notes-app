import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
import apiClient from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await apiClient.post('/auth/login', { username, password });
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setLoginError(null);
    } catch (error) {
      setLoginError('Invalid username or password.');
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <NotesPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} loginError={loginError} />
      )}
    </div>
  );
}

export default App;
