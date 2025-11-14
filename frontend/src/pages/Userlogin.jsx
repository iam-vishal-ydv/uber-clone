import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await axiosInstance.post("/users/login", formData);
    if (res.status == 200) {
      navigate("/home");
      localStorage.setItem("token", res.data.token);
      setFormData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center">
          <img src="/assets/logo.png" alt="MoveX Logo" className="w-20" />
        </div>
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          User Login
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              onChange={handleChange}
              required
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              required
              value={formData.password}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5">
          New here?{" "}
          <Link
            to="/user-signup"
            className="text-black font-semibold hover:underline"
          >
            Create new Account
          </Link>
        </p>

        <button
          onClick={() => navigate("/captain-login")}
          className="w-full my-4 bg-gray-900 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
        >
          Login as Captain
        </button>
      </div>
    </div>
  );
}
