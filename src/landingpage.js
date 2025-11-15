import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Main Icon */}
      <div className="main-icon">
        📦
      </div>

      {/* Title */}
      <h1 className="landing-title">Plateforme de Gestion de Stock</h1>

      {/* Subtitle */}
      <p className="landing-subtitle">
        Solution complète pour gérer votre matériel événementiel à travers
        plusieurs entrepôts et régions.
      </p>

      {/* Features */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon blue">🏬</div>
          <h2>Multi-Entrepôts</h2>
          <p>Gérez plusieurs dépôts répartis dans différentes régions</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon purple">📊</div>
          <h2>Tableaux de Bord</h2>
          <p>Visualisez vos stocks et mouvements en temps réel</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon green">🧑‍🤝‍🧑</div>
          <h2>Multi-Utilisateurs</h2>
          <p>Gestion des rôles et permissions pour votre équipe</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="landing-buttons">
        <Link to="/login" className="btn primary">Se connecter</Link>
        <Link to="/register" className="btn secondary">Créer un compte</Link>
      </div>
    </div>
  );
}
