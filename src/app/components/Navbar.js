'use client';
import Link from 'next/link';

const Navbar = () => {
  let user = null;
  if (typeof window !== 'undefined') {
    try {
      user = JSON.parse(localStorage.getItem('loggedInUser'));
    } catch (e) {
      localStorage.removeItem('loggedInUser');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <Link href="/dashboard">Dashboard</Link>
      {!user ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <>
          <span>Welcome, {user.firstName}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;