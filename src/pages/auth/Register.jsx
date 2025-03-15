import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Implement Firebase Authentication registration here
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite font-sans">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Register</h2>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full border-gray-300 rounded-2xl p-3 shadow-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 block w-full border-gray-300 rounded-2xl p-3 shadow-sm"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-300">
          Register
        </button>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
