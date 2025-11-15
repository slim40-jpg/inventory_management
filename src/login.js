import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !email || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    // Simulate login - in real app, call API
    try {
      // Store user info in localStorage
      const user = {
        username,
        email,
        role: "Administrateur",
        initial: username.charAt(0).toUpperCase()
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la connexion");
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
          {error && <p className="error-message">{error}</p>}

          {/* Username */}
          <label>Nom d'utilisateur</label>
          <div className="auth-input">
            <span className="icon">👤</span>
            <input 
              type="text" 
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <label>Email</label>
          <div className="auth-input">
            <span className="icon">✉️</span>
            <input 
              type="email" 
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <label>Mot de passe</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>

          <p className="auth-switch">
            Vous n'avez pas de compte ?{" "}
            <a href="/register">Créer un compte</a>
          </p>
        </form>
      </div>
    </div>
  );
}
