import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">
          <span role="img" aria-label="box">📦</span>
        </div>

        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">
          Rejoignez la plateforme de gestion de stock
        </p>

        <form className="auth-form">
          {/* Username */}
          <label>Nom d'utilisateur</label>
          <div className="auth-input">
            <span className="icon">👤</span>
            <input type="text" placeholder="johndoe" />
          </div>

          {/* Email */}
          <label>Email</label>
          <div className="auth-input">
            <span className="icon">✉️</span>
            <input type="email" placeholder="votre@email.com" />
          </div>

          {/* Password */}
          <label>Mot de passe</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm Password */}
          <label>Confirmer le mot de passe</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="••••••••"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Company */}
          <label>Entreprise</label>
          <div className="auth-input">
            <span className="icon">🏢</span>
            <input type="text" placeholder="Nom de votre entreprise" />
          </div>

          {/* Phone */}
          <label>Numéro de téléphone</label>
          <div className="auth-input">
            <span className="icon">📞</span>
            <input type="text" placeholder="+33 6 12 34 56 78" />
          </div>

          {/* Role */}
          <label>Rôle</label>
          <div className="auth-input">
            <span className="icon">🧑‍💼</span>
            <select>
              <option>Staff (Gestionnaire)</option>
              <option>Admin</option>
            </select>
          </div>

          <button type="submit" className="auth-button">
            Créer mon compte
          </button>

          <p className="auth-switch">
            Vous avez déjà un compte ? <a href="/login">Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  );
}
