import React, { useState } from "react";
import axios from "axios";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    message: "",
    otp: "",
    otpVerified: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Invalid Email format" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3069/send-otp", {
        email: formData.email,
      });
      setOtpSent(true);
      console.log("Response from backend:", response.data);
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      alert("Failed to send OTP. Check logs for details.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3069/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      setFormData((prev) => ({ ...prev, otpVerified: true }));
      if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to verify OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid Email format";
    if (!formData.otpVerified) newErrors.otp = "Please verify email OTP";
    if (!formData.inquiryType)
      newErrors.inquiryType = "Please select an inquiry type";
    if (!formData.message) newErrors.message = "Message is required";
    else if (formData.message.length > 500)
      newErrors.message = "Message exceeds 500 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://ugdev.cs.smu.ca:3069/send-confirmation",
          {
            email: formData.email,
            fullName: formData.fullName,
            inquiryType: formData.inquiryType,
            message: formData.message,
          }
        );

        setSubmitted(true);
        setOtpSent(false);
        setFormData({
          fullName: "",
          email: "",
          inquiryType: "",
          message: "",
          otp: "",
          otpVerified: false,
        });

        alert(response.data.message);
      } catch (err) {
        console.error(
          "Error sending confirmation email:",
          err.response?.data || err.message
        );
        alert("Failed to send confirmation email.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const inputBaseClass =
    "w-full px-4 py-2.5 rounded-xl bg-white/75 dark:bg-gray-800/75 text-light-text dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-500 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D3D86]/60 dark:focus:ring-dark-highlight/60";

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-light-border via-light-background to-light-border dark:from-gray-900 dark:via-dark-background dark:to-gray-900 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/80 dark:bg-dark-border/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-black/5 dark:border-white/10 text-light-text dark:text-dark-text">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            Inquiry Form
          </h2>
          <div className="w-20 h-1 bg-[#6D3D86] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-sm md:text-base opacity-80">
            Questions about our woodland trails, site visits, or natural burial services? Reach out to our stewardship team.
          </p>
        </div>

        {submitted && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium text-center">
            Your form has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              className={`${inputBaseClass} ${
                errors.fullName
                  ? "border-red-400"
                  : "border-black/15 dark:border-white/15"
              }`}
            />
            {errors.fullName && (
              <span className="text-xs font-medium text-red-500 mt-1 block">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email & OTP Verification */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  errors.email
                    ? "border-red-400"
                    : "border-black/15 dark:border-white/15"
                }`}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-[#6D3D86] hover:bg-[#5a3170] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>

            {otpSent && (
              <div className="mt-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`${inputBaseClass} ${
                    errors.otp
                      ? "border-red-400"
                      : "border-black/15 dark:border-white/15"
                  }`}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={formData.otpVerified}
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-all cursor-pointer ${
                    formData.otpVerified
                      ? "bg-emerald-600/80 cursor-default"
                      : "bg-emerald-700 hover:bg-emerald-800"
                  }`}
                >
                  {formData.otpVerified ? "Verified ✓" : "Verify OTP"}
                </button>
              </div>
            )}

            {errors.email && (
              <span className="text-xs font-medium text-red-500 mt-1 block">
                {errors.email}
              </span>
            )}
            {errors.otp && (
              <span className="text-xs font-medium text-red-500 mt-1 block">
                {errors.otp}
              </span>
            )}
          </div>

          {/* Inquiry Type */}
          <div>
            <label
              htmlFor="inquiryType"
              className="block text-sm font-semibold mb-1.5"
            >
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className={`${inputBaseClass} ${
                errors.inquiryType
                  ? "border-red-400"
                  : "border-black/15 dark:border-white/15"
              }`}
            >
              <option value="">Select an option</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Site Visit Request">Site Visit Request</option>
              <option value="Burial Service Query">Burial Service Query</option>
            </select>
            {errors.inquiryType && (
              <span className="text-xs font-medium text-red-500 mt-1 block">
                {errors.inquiryType}
              </span>
            )}
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="message" className="block text-sm font-semibold">
                Message
              </label>
              <span className="text-xs opacity-65">
                {formData.message.length} / 500
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              className={`${inputBaseClass} resize-y ${
                errors.message
                  ? "border-red-400"
                  : "border-black/15 dark:border-white/15"
              }`}
            />
            {errors.message && (
              <span className="text-xs font-medium text-red-500 mt-1 block">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-6 rounded-xl bg-[#6D3D86] hover:bg-[#5a3170] dark:bg-dark-highlight dark:hover:opacity-90 text-white font-semibold text-base shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
