import React, { useState } from 'react';

export default function UserValidation({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Only used for Signup
  });
  const [greeting, setGreeting] = useState(''); // State for greeting message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5000/login'
      : 'http://localhost:5000/signup';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();
      console.log('Authentication successful:', data);

      if (!isLogin) {
        setGreeting(`Hello, ${data.name}!`); // Set greeting for signup
        setTimeout(() => onLoginSuccess(), 2000); // Redirect after 2 seconds
      } else {
        onLoginSuccess(); // Redirect immediately for login
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {greeting ? (
          <h2 className="text-2xl font-bold mb-4 text-center">{greeting}</h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? 'Login' : 'Signup'}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isLogin ? 'Login' : 'Signup'}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 underline"
              >
                {isLogin ? 'Signup' : 'Login'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}