/**
 * @file Signup.jsx
 * @description Signup page for the Woodland Conservation Site. This component provides a user interface for users to create an account with their email and password. It includes form validation and a toggle for showing/hiding the password.
 * @author Lee Jonah
 */

import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  // Store the information entered into the form.
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Control password visibility.
  const [showPassword, setShowPassword] = useState(false);

  // Display feedback after form submission.
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page.
    e.preventDefault();

    // Check that the password is long enough.
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    // Check that both passwords match.
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // TODO: Replace this with backend account registration.
    // No account is created at this stage.
    setMessage("Account registration is not implemented yet.");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-8 py-16 bg-light-border dark:bg-dark-background">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-lg p-10">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Create an Account
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Join Woodland Conservation
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Form Feedback */}
        {message && (
          <p
            role="status"
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
          >
            {message}
          </p>
        )}

        {/* Login Navigation */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
