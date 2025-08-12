'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!isValidEmail(email)) {
      alert('Invalid email format');
    } else if (!user) {
      alert('Invalid credentials');
    } else {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful');
      router.push('/dashboard');
    }
    // api 
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button><br />
      <a href="/forgot-password">Forgot Password?</a><br />
      <a href="/register">Register</a>
    </div>
  );
}