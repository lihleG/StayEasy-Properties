import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  // Handle Google Sign-In
  const handleGoogleLogin = () => {
    // Redirect to the backend Google Auth route
    window.location.href = "http://localhost:5100/auth/google";
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {/* Google Sign-In Button */}
      <button onClick={handleGoogleLogin} className="google-login-button">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Logo"
          className="google-logo"
        />
        {isLogin ? "Sign in with Google" : "Sign up with Google"}
      </button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;