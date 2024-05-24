import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <div className="login-container container-fluid">
      <Link to={"/"} className="text-decoration-none">
        <span
          id="AppName"
          className="text-center align-items-center justify-content-center d-flex .jersey-10-regular third mainPagelogo "
        >
          VocabMentor
        </span>
      </Link>

      <div className="card login-card w-50 mx-auto third">
        <div className="login-card-body card-body ">
          <h2 className="text-center mb-4 primary">Giriş Yap</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control bg-secondary border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta"
                required
              />
            </div>
            <div className="form-group mb-3 ">
              <input
                type="password"
                className="form-control border-0 bg-secondary "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                required
              />
            </div>
            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn bg-fourth secondary">
                Giriş Yap
              </button>
            </div>
            <div className="d-grid gap-2 mb-3">
              <Link to="/register" className="btn bg-primary fourth ">
                Kayıt Ol
              </Link>
            </div>
            <div className="d-grid gap-2 mb-3">
              <Link
                to="/resetpassword"
                className="text-decoration-none  primary text-center"
              >
                Şifremi Unuttum
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
