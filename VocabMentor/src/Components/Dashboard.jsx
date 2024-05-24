// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { fetchUserName } from "../firebase";
import { auth } from "../firebase"; // auth nesnesini ihtiyacımız var

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // Yükleniyor durumunu kontrol etmek için bir state ekledik
  const capitilize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giriş yapan kullanıcının UID'sini al
        const uid = auth.currentUser.uid;
        const name = await fetchUserName(uid); // Firestore'dan kullanıcı adını alın
        setUserName(capitilize(name));
      } catch (error) {
        console.error("Kullanıcı adı alınırken hata oluştu:", error);
      } finally {
        setLoading(false); // Veri alımı bittiğinde yükleniyor durumunu kaldır
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>; // Yükleniyor durumunda bekleyin mesajı gösterelim
  }

  return (
    <>
      <div className="container-fluid">
        <Link to={"/"} className="text-decoration-none">
          <h1
            id="AppName"
            className="text-center align-items-center justify-content-center d-flex .jersey-10-regular third "
          >
            VocabMentor
          </h1>
        </Link>
        <div className="row d-flex align-items-center justify-content-evenly mt-4 ">
          <div className="col-5 dashboard-col-left p-5    rounded">
            <span className="fs-1">
              Hoşgeldin {userName}, günün nasıl geçiyor?
            </span>
            <iframe
              className=""
              src="https://lottie.host/embed/6efbabba-0c73-4a03-8252-40528f38fa7f/Y8dh7mqAI5.json"
            ></iframe>
          </div>
          <div className="col-5 dashboard-menu d-flex flex-column align-items-center justify-content-evenly rounded p-4 ">
            <Link
              to="/"
              className="text-decoration-none dashboard-menu-link   primary text-center"
            >
              Sınava başla
            </Link>{" "}
            <Link
              to="/wordaddpage"
              className="text-decoration-none dashboard-menu-link  primary text-center"
            >
              Kelime ekle
            </Link>{" "}
            <Link
              to="/"
              className="text-decoration-none dashboard-menu-link  primary text-center"
            >
              Analiz Raporu
            </Link>{" "}
            <Link
              to="/"
              className="text-decoration-none  dashboard-menu-link primary text-center"
            >
              Ayarlar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
