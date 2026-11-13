/**
 * @file Login.jsx
 * @description login page for the Woodland Conservation Site. This component provides a user interface for users to log in with their email/username and password. It includes form validation and a toggle for showing/hiding the password.
 * @author Lee Jonah
 */

import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace this with backend authentication.
    // For now, the form only demonstrates the login interface.
    setMessage("Login authentication is not implemented yet.");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-8 py-16 bg-light-border dark:bg-dark-background">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-lg p-10">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Sign in to your Woodland Conservation account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="identifier"
              className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
            >
              Email Address or Username
            </label>

            <input
              id="identifier"
              type="text"
              autoComplete="username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Log In
          </button>
        </form>

        {message && (
          <p
            role="status"
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
          >
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
