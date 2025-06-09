'use client'
import React from 'react'
import axios from 'axios';

import { useRouter } from 'next/navigation';
export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
try {
      // Make a POST request to your login API endpoint
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email,
      password: password
    },{withCredentials: true});
    if (response.status === 200) {
      console.log("Login successful");
      // Redirect or update UI as needed
      router.push('/dashboard');
    }} catch (error: any) {
      // Handle error
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      console.error("Login failed:", errorMessage);
      setError(errorMessage);
      
      // Handle error, show message to user, etc.
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
