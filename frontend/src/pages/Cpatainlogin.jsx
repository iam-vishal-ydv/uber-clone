import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CaptainLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [captainData, setCaptainData] = useState();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setCaptainData(formData);
    setFormData({});
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center">
          <img src="/assets/logo.png" alt="MoveX Logo" className="w-20" />
        </div>

        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Captain Sign In
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              value={formData.email}
              placeholder="Enter phone or email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formData.password}
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
          Join a fleet?{" "}
          <span
            onClick={() => navigate("/captain-signup")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Register as a Captain
          </span>
        </p>

        <button
          onClick={() => navigate("/user-login")}
          className="w-full my-4 bg-gray-900 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
        >
          Login as User
        </button>
      </div>
    </div>
  );
}
