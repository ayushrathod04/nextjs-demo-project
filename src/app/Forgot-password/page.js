'use client';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!email) return alert('Enter your email');
    if (!isValidEmail(email)) return alert('Invalid email');
    if (!found) return alert('Email not registered');
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /><br />
      <button onClick={handleReset}>Submit</button><br />
      <a href="/login">Back to Login</a>
    </div>
  );
}
