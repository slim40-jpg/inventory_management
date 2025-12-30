import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000"; // Your backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format d'email invalide");
      return;
    }

    setLoading(true);

    try {
      // Call backend API for login
      const response = await axios.post(`${API_URL}/api/AuthRoute/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store authentication data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        // Set default axios header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        switch (err.response.status) {
          case 400:
            setError("Données invalides");
            break;
          case 401:
            setError("Email ou mot de passe incorrect");
            break;
          case 404:
            setError("Utilisateur non trouvé");
            break;
          case 500:
            setError("Erreur serveur. Veuillez réessayer plus tard");
            break;
          default:
            setError("Erreur de connexion");
        }
      } else if (err.request) {
        // Request was made but no response
        setError("Impossible de se connecter au serveur");
      } else {
        // Other errors
        setError("Une erreur est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">
          <span role="img" aria-label="box">📦</span>
        </div>

        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Accédez à votre plateforme de gestion</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <span style={{ marginRight: "8px" }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Email */}
          <label htmlFor="email">Email</label>
          <div className="auth-input">
            <span className="icon">✉️</span>
            <input 
              id="email"
              type="email" 
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <label htmlFor="password">Mot de passe</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength="6"
            />
            <span
              className="toggle-password"
              onClick={() => !loading && setShowPassword(!showPassword)}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: "8px" }}>⏳</span>
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>

          <div className="auth-links">
            <a href="/forgot-password" className="forgot-password">
              Mot de passe oublié ?
            </a>
            <p className="auth-switch">
              Vous n'avez pas de compte ?{" "}
              <a href="/register">Créer un compte</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}