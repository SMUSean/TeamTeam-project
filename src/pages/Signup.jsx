import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaRegCircle, FaTimesCircle } from "react-icons/fa";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const status = "user";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const passwordRules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    {
      label: "Uppercase and lowercase letters (A-Z, a-z)",
      valid: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { label: "At least one number (0-9)", valid: /\d/.test(password) },
    {
      label: "At least one special character (!@#$%^&*)",
      valid: /[^A-Za-z0-9\s]/.test(password),
    },
  ];

  const allPasswordRulesMet = passwordRules.every((rule) => rule.valid);
  const hasConfirmInput = confirmPassword.length > 0;
  const passwordsMatch = hasConfirmInput && password === confirmPassword;
  const passwordsMismatch = hasConfirmInput && password !== confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allPasswordRulesMet) {
      setIsError(true);
      setMessage(
        "Password must be at least 8 characters and include uppercase/lowercase letters, a number, and a symbol."
      );
      return;
    }

    if (!passwordsMatch) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setIsError(false);
    setMessage("Account registration is not implemented yet.");
  };

  const inputClass =
    "w-full border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-light-text dark:text-dark-text bg-white/80 dark:bg-gray-800/80 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D3D86]/60 dark:focus:ring-dark-highlight/60 transition-all";

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12 bg-gradient-to-b from-light-border via-light-background to-light-border dark:from-gray-900 dark:via-dark-background dark:to-gray-900">
      <div className="w-full max-w-md rounded-3xl bg-white/80 dark:bg-dark-border/90 backdrop-blur-xl shadow-2xl p-8 md:p-10 border border-black/5 dark:border-white/10">
        <h1 className="text-3xl font-extrabold text-center text-light-primary dark:text-dark-primary mb-2">
          Create an Account
        </h1>

        <p className="text-center text-sm text-light-text/80 dark:text-dark-text/80 mb-8">
          Join Woodland Conservation
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className={inputClass}
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className={inputClass}
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
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
              className={inputClass}
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Enter your username"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
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
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#6D3D86] dark:text-[#f0E68C] hover:opacity-80 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Live Password Requirements Checklist */}
            <ul className="mt-2.5 space-y-1 text-xs">
              {passwordRules.map((rule) => (
                <li
                  key={rule.label}
                  className={`flex items-center gap-2 transition-colors ${
                    rule.valid
                      ? "text-emerald-700 dark:text-emerald-400 font-medium"
                      : "text-light-text/65 dark:text-dark-text/65"
                  }`}
                >
                  {rule.valid ? (
                    <FaCheckCircle className="shrink-0" />
                  ) : (
                    <FaRegCircle className="shrink-0" />
                  )}
                  <span>{rule.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1.5 text-sm font-semibold text-light-text dark:text-dark-text"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#6D3D86] dark:text-[#f0E68C] hover:opacity-80 cursor-pointer"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div
              className={`mt-2 flex items-center gap-2 text-xs transition-colors ${
                passwordsMatch
                  ? "text-emerald-700 dark:text-emerald-400 font-medium"
                  : passwordsMismatch
                  ? "text-red-600 dark:text-red-400 font-medium"
                  : "text-light-text/65 dark:text-dark-text/65"
              }`}
            >
              {passwordsMatch ? (
                <FaCheckCircle className="shrink-0" />
              ) : passwordsMismatch ? (
                <FaTimesCircle className="shrink-0" />
              ) : (
                <FaRegCircle className="shrink-0" />
              )}
              <span>Passwords match</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#6D3D86] hover:bg-[#5a3170] dark:bg-dark-highlight dark:hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Form Feedback */}
        {message && (
          <p
            role="status"
            className={`mt-4 text-center text-sm font-medium ${
              isError
                ? "text-red-600 dark:text-red-400"
                : "text-light-text/85 dark:text-dark-text/85"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Navigation */}
        <p className="text-center mt-6 text-sm text-light-text/80 dark:text-dark-text/80">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6D3D86] dark:text-[#f0E68C] font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
