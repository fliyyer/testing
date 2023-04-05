import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../Firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  if (auth.currentUser) {
    return <Navigate to="/absensi" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      console.log(user);
      navigate("/login")
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-40">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-center text-2xl font-medium mb-4">Register</h2>
    <div className="mb-4 mt-14">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Register
      </button>
      <p className="text-gray-600 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-800">
          Login
        </Link>
      </p>
    </div>
    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
  </form>
</div>
  );
};

export default Register;