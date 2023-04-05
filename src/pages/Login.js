import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../Firebase";
import Swal from 'sweetalert2'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (auth.currentUser) {
    return <Navigate to="/absensi" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/absensi");
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password Yang Anda Masukan Salah!',
      })
    }
  };

  return (
    <div>
      <div class="w-full max-w-md mx-auto mt-40">
      <form
        onSubmit={handleSubmit}
        class="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md"
      >
        <h2 class="text-2xl font-medium mb-6 text-center ">Login</h2>
        <div class="mb-4 mt-14">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <p class="text-sm">
            Don't have an account?{" "}
            <Link to="/register" class="text-blue-500 hover:text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
