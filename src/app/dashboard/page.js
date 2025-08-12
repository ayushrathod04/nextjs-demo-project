'use client';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const users = JSON.parse(localStorage.getItem('users')) || [];

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!u) throw new Error();
      setUser(u);
    } catch {
      localStorage.removeItem('loggedInUser');
      router.push('/login');
    }
  }, []);

  const chartData = {
    labels: ['India', 'USA', 'Other'],
    datasets: [{
      label: 'Users by Country',
      data: [
        users.filter((u) => u.country === 'India').length,
        users.filter((u) => u.country === 'USA').length,
        users.filter((u) => !['India', 'USA'].includes(u.country)).length,
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.firstName || 'User'}!</h2>
      <button onClick={() => {
        localStorage.removeItem('loggedInUser');
        router.push('/login');
      }}>Logout</button>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ width: 300, height: 300 }}>
          <h4>Pie Chart</h4>
          <Pie data={chartData} />
        </div>
        <div style={{ width: 300, height: 300 }}>
          <h4>Bar Chart</h4>
          <Bar data={chartData} />
        </div>
        <div style={{ width: 300, height: 300 }}>
          <h4>Donut Chart</h4>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
}