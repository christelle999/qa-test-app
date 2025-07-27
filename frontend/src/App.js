// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;


// frontend/src/index.js (should remain as-is unless Router isn't wrapping App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// Now rename or adjust your component files:
// frontend/src/Login.js
// frontend/src/Homepage.js
// Make sure they are named properly and exported as components.

// Example Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('https://qa-test-app-egya.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) navigate('/homepage');
    else alert('Invalid credentials');
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

// Example Homepage.js
import React from 'react';

function Homepage() {
  return <h2>Welcome to Homepage</h2>;
}

export default Homepage;
