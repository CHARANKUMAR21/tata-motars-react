import React, { useState, useEffect } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import "./SignUpModal.css";

const API_URL = "http://localhost:3000/users";

const SignUpModal = ({ onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Close modal on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("signup-modal-overlay")) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === "signup" && !formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (activeTab !== "phone") {
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.password) {
        newErrors.password =
          activeTab === "signup"
            ? "Please create a password"
            : "Please enter your password";
      } else if (activeTab === "signup" && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = "Please enter your phone number";
      } else if (
        !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          formData.phone
        )
      ) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const response = await fetch(`${API_URL}?email=${cleanEmail}`);
      if (!response.ok) throw new Error("Failed to check email");
      const users = await response.json();
      return users.some(
        (user) => user.email && user.email.trim().toLowerCase() === cleanEmail
      );
    } catch (error) {
      console.error("Email check error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // For signup, verify email doesn't exist
      if (activeTab === "signup") {
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
          alert("This email is already registered. Please log in instead.");
          return;
        }
      }

      let response;
      if (activeTab === "login") {
        response = await handleLogin();
      } else if (activeTab === "phone") {
        response = await handlePhoneSignup();
      } else {
        response = await handleEmailSignup();
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error(`${activeTab} error:`, error);
      alert(error.message || `An error occurred during ${activeTab}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignup = async () => {
    return await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        createdAt: new Date().toISOString(),
      }),
    });
  };

  const handleLogin = async () => {
    const response = await fetch(
      `${API_URL}?email=${formData.email.trim().toLowerCase()}`
    );
    if (!response.ok) throw new Error("Login failed");

    const users = await response.json();
    const user = users[0];

    if (!user) throw new Error("Email not found");
    if (user.password !== formData.password)
      throw new Error("Incorrect password");

    return { ok: true };
  };

  const handlePhoneSignup = async () => {
    return await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: formData.phone.trim(),
        createdAt: new Date().toISOString(),
      }),
    });
  };

  if (success) {
    return (
      <div className="signup-modal-overlay">
        <div className="signup-modal success-animation">
          <div className="checkmark">✓</div>
          <h2>Success!</h2>
          <p>
            {activeTab === "login"
              ? "You're now logged in!"
              : "Account created successfully!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="signup-tabs">
          <button
            className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
        </div>

        <div className="signup-content">
          <h2>{activeTab === "signup" ? "Create Account" : "Welcome Back"}</h2>

          <div className="social-buttons">
            <button type="button" className="social-button google">
              <FaGoogle className="social-icon" />
              Continue with Google
            </button>
            <button type="button" className="social-button facebook">
              <FaFacebookF className="social-icon" />
              Continue with Facebook
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === "signup" && (
              <div className="form-group">
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            )}

            {activeTab !== "phone" ? (
              <>
                <div className="form-group">
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={
                        activeTab === "signup" ? "Create Password" : "Password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "error" : ""}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>
              </>
            ) : (
              <div className="form-group">
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                </div>
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : activeTab === "signup" ? (
                "Sign Up"
              ) : activeTab === "login" ? (
                "Log In"
              ) : (
                "Send Verification Code"
              )}
            </button>
          </form>

          {activeTab !== "phone" && (
            <div className="phone-login">
              <button
                type="button"
                className="phone-button"
                onClick={() => setActiveTab("phone")}
              >
                <FaPhone /> Continue with Phone
              </button>
            </div>
          )}
        </div>

        <div className="signup-footer">
          {activeTab === "signup" ? (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setActiveTab("login")}>
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={() => setActiveTab("signup")}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
