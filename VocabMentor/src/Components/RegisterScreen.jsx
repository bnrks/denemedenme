import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../firebase";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = await register(name, email, password); // isim bilgisini de gönder
    console.log(user);
  };

  return (
    <div className="register-container container-fluid">
      <Link to={"/"} className="text-decoration-none">
        <h1
          id="AppName"
          className="text-center align-items-center justify-content-center d-flex .jersey-10-regular third "
        >
          VocabMentor
        </h1>
      </Link>

      <div className="card register-card w-50 mx-auto third">
        <div className="register-card-body card-body ">
          <h2 className="text-center primary mb-4">Kayıt Ol</h2>
          <form onSubmit={handleRegister}>
            {" "}
            {/* onSubmit eventini ekle */}
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control bg-secondary border-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad"
                required
              />
            </div>
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
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control bg-secondary border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                required
              />
            </div>
            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                className="btn bg-fourth primary border-0"
                disabled={!email || !password || !name}
              >
                Kayıt Ol
              </button>
            </div>
            <div className="d-grid gap-2">
              <Link to="/" className="text-decoration-none primary">
                Zaten hesabınız var mı? Giriş yapın.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
