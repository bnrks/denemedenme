import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetpassword } from "../firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetpassword(email)) {
      console.log("başarılı");
    }
  };
  return (
    <div className="login-container container-fluid">
      <h1
        id="AppName"
        className="text-center align-items-center justify-content-center d-flex .jersey-10-regular third "
      >
        VocabMentor
      </h1>

      <div className="card login-card w-50 mx-auto third">
        <div className="login-card-body card-body ">
          <h2 className="text-center mb-4 primary">Şifreni yenile</h2>
          <form onSubmit={handleSubmit}>
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

            <div className="d-grid gap-2 mb-3">
              <button type="submit" className="btn bg-fourth">
                Yenileme linki gönder.
              </button>
            </div>
            <div className="d-grid gap-2 mb-3">
              <Link
                to="/"
                className="text-decoration-none  primary text-center"
              >
                Giriş yap
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
