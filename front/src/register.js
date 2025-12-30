import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    entreprise: "",
    phone_number: "",
    role: "staff" // Changed from "user" to "staff"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000"; // Your backend URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Company validation
    if (!formData.entreprise.trim()) {
      newErrors.entreprise = "Le nom de l'entreprise est requis";
    }

    // Phone validation (basic)
    if (formData.phone_number && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone_number.replace(/\s/g, ''))) {
      newErrors.phone_number = "Numéro de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        entreprise: formData.entreprise,
        phone_number: formData.phone_number || "", // Always send string, not undefined
        role: formData.role // Ensure it's "staff" or "admin"
      };

      console.log("Sending registration data:", registerData);

      // Call backend API for registration
      const response = await axios.post(`${API_URL}/api/AuthRoute/register`, registerData);

      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Response data.data:", response.data?.data);

      if (response.data.success) {
        // CORRECT: Access data from response.data.data
        const token = response.data.data?.token;
        const user = response.data.data?.user;
        
        console.log("Token:", token);
        console.log("User:", user);
        console.log("User role:", user?.role);
        
        if (!token || !user) {
          throw new Error("Invalid response from server");
        }
        
        // Store authentication data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setSuccessMessage("Compte créé avec succès ! Redirection en cours...");
        
        // Redirect after 2 seconds - Use optional chaining
        setTimeout(() => {
          if (user?.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      } else {
        setSubmitError(response.data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Register error:", err);
      console.error("Error response:", err.response);
      
      if (err.response) {
        // Handle specific error messages from backend
        const errorMessage = err.response.data?.message || "Erreur lors de l'inscription";
        
        switch (err.response.status) {
          case 400:
            if (errorMessage.includes("role")) {
              setSubmitError("Rôle invalide. Doit être 'admin' ou 'staff'");
            } else if (errorMessage.includes("required")) {
              setSubmitError("Champs obligatoires manquants");
            } else {
              setSubmitError(errorMessage);
            }
            break;
          case 409:
            setSubmitError("Email, nom d'utilisateur ou téléphone déjà utilisé");
            break;
          case 500:
            setSubmitError("Erreur serveur. Veuillez réessayer plus tard");
            break;
          default:
            setSubmitError(errorMessage);
        }
      } else if (err.request) {
        setSubmitError("Impossible de se connecter au serveur. Vérifiez votre connexion.");
      } else {
        setSubmitError("Une erreur est survenue: " + err.message);
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

        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">
          Rejoignez la plateforme de gestion de stock
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Success Message */}
          {successMessage && (
            <div className="success-message">
              <span style={{ marginRight: "8px" }}>✅</span>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="error-message">
              <span style={{ marginRight: "8px" }}>⚠️</span>
              {submitError}
            </div>
          )}

          {/* Username */}
          <label htmlFor="username">Nom d'utilisateur *</label>
          <div className="auth-input">
            <span className="icon">👤</span>
            <input 
              id="username"
              name="username"
              type="text" 
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className={errors.username ? "input-error" : ""}
            />
          </div>
          {errors.username && <span className="field-error">{errors.username}</span>}

          {/* Email */}
          <label htmlFor="email">Email *</label>
          <div className="auth-input">
            <span className="icon">✉️</span>
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={errors.email ? "input-error" : ""}
            />
          </div>
          {errors.email && <span className="field-error">{errors.email}</span>}

          {/* Password */}
          <label htmlFor="password">Mot de passe *</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={errors.password ? "input-error" : ""}
            />
            <span
              className="toggle-password"
              onClick={() => !loading && setShowPassword(!showPassword)}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
          <div className="auth-input">
            <span className="icon">🔒</span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword2 ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            <span
              className="toggle-password"
              onClick={() => !loading && setShowPassword2(!showPassword2)}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {showPassword2 ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}

          {/* Company */}
          <label htmlFor="entreprise">Entreprise *</label>
          <div className="auth-input">
            <span className="icon">🏢</span>
            <input 
              id="entreprise"
              name="entreprise"
              type="text" 
              placeholder="Nom de votre entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              disabled={loading}
              className={errors.entreprise ? "input-error" : ""}
            />
          </div>
          {errors.entreprise && <span className="field-error">{errors.entreprise}</span>}

          {/* Phone */}
          <label htmlFor="phone_number">Numéro de téléphone</label>
          <div className="auth-input">
            <span className="icon">📞</span>
            <input 
              id="phone_number"
              name="phone_number"
              type="text" 
              placeholder="+33 6 12 34 56 78"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={loading}
              className={errors.phone_number ? "input-error" : ""}
            />
          </div>
          {errors.phone_number && <span className="field-error">{errors.phone_number}</span>}

          {/* Role */}
          <label htmlFor="role">Rôle</label>
          <div className="auth-input">
            <span className="icon">🧑‍💼</span>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: "8px" }}>⏳</span>
                Création en cours...
              </>
            ) : (
              "Créer mon compte"
            )}
          </button>

          <p className="auth-switch">
            Vous avez déjà un compte ? <a href="/login">Se connecter</a>
          </p>
        </form>
      </div>
    </div>
  );
}