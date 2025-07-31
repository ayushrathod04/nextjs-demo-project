'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', country: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { firstName, lastName, email, password, country } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      firstName && lastName &&
      emailRegex.test(email) &&
      password.length >= 6 &&
      country
    );
  };

  const handleRegister = () => {
    if (!validateForm()) return alert('Please fill all fields correctly');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email.toLowerCase() === formData.email.toLowerCase());
    if (exists) return alert('Email already registered');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    router.push('/login');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Register</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password (min 6 chars)" onChange={handleChange} /><br />
      <select name="country" onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select><br />
      <button onClick={handleRegister}>Register</button><br />
      <a href="/login">Back to Login</a>
    </div>
  );
}
