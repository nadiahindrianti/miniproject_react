import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const dummyUser = { email: 'nadiah@gmail.com', password: 'nadiahindrianti271,.' };
    const user = JSON.parse(localStorage.getItem('user'));

    
    if (user && user.email === email && user.password === password) {
      localStorage.setItem('isLoggedIn', true);
      navigate('/dasboard_admin');
    } else if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem('user', JSON.stringify(dummyUser));
      localStorage.setItem('isLoggedIn', true);
      navigate('/dasboard_admin');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 p-4 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3">
        {isLoggedIn ? (
          <div>
            <h1 className="text-2xl mb-4">Welcome, {email}</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
            </form>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormLogin;