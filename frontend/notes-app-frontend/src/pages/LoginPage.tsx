import { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>;
  loginError: string | null;
}

const LoginPage = ({ onLogin, loginError }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-bold text-gray-600 block"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {loginError && (
            <p className="text-sm text-red-500 text-center">{loginError}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center text-gray-500 text-xs">
          <p>Hint: Use admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;