import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [userData, setUserData] = useState();
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.firstname || form.firstname.length < 3)
      return setError("First name must be at least 3 characters");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm)
      return setError("Passwords do not match");

    setUserData({
      fullname: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      email: form.email,
      password: form.password,
    });
    navigate("/user-login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center">
          <img src="/assets/logo.png" alt="MoveX Logo" className="w-20" />
        </div>

        <h1 className="text-2xl font-bold text-black text-center mb-4">
          Create your account
        </h1>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-3 w-full">
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First name"
              className=" px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            />
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last name"
              className=" px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            />
          </div>

          {/* <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          /> */}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email "
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />

          <input
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm password"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/user-login")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
