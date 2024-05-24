import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addWordToFirestore, uploadAudioToStorage } from "../firebase";

const WordAddForm = () => {
  const [englishWord, setEnglishWord] = useState("");
  const [turkishEquivalent, setTurkishEquivalent] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [pictureFile, setPictureFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!englishWord || !turkishEquivalent || !exampleSentence) {
      setErrorMessage(
        "İngilizce kelime, Türkçe karşılığı ve örnek cümle alanları zorunludur."
      );
      return;
    }

    try {
      const audioURL = await uploadAudioToStorage(audioFile);
      await addWordToFirestore(
        englishWord,
        turkishEquivalent,
        exampleSentence,
        pictureFile,
        audioFile ? audioFile : null
      );
      console.log("Kelime Firebase'a başarıyla eklendi.");
      setEnglishWord("");
      setTurkishEquivalent("");
      setExampleSentence("");
      setPictureFile(null);
      setAudioFile(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Firebase'a kelime eklenirken hata oluştu:", error);
      setErrorMessage(
        "Kelime eklenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setPictureFile(file);
  };

  const handleAudioSelect = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  return (
    <div className="container-fluid">
      <div>
        <Link to={"/"} className="text-decoration-none">
          <h1
            id="AppName"
            className="text-center align-items-center justify-content-center d-flex .jersey-10-regular third "
          >
            VocabMentor
          </h1>
        </Link>
        <div className="container word-add-container position-relative p-3 mt-3">
          <h1 className="p-3 text-center fourth">Kelime Ekle</h1>
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}

          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fourth">İngilizce Kelime:</label>
                  <input
                    type="text"
                    className="form-control bg-primary border-0"
                    value={englishWord}
                    onChange={(e) => setEnglishWord(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fourth">Türkçe Karşılığı:</label>
                  <input
                    type="text"
                    className="form-control bg-primary border-0"
                    value={turkishEquivalent}
                    onChange={(e) => setTurkishEquivalent(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fourth">Örnek Cümle:</label>
                  <textarea
                    className="form-control bg-primary border-0"
                    style={{ minHeight: "150px" }}
                    value={exampleSentence}
                    onChange={(e) => setExampleSentence(e.target.value)}
                  />
                </div>
                <button
                  className="btn bg-fourth primary text-center mx-auto px-4 align-items-center justify-content-center d-flex mt-3"
                  type="submit"
                >
                  Ekle
                </button>
              </form>
            </div>
            <div className="col-md-6 d-flex flex-column  align-items-center">
              <div className="w-100">
                <div className="mb-3 ">
                  <label className="form-label fourth">Resim:</label>
                  <input
                    type="file"
                    className="form-control bg-primary border-0"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fourth">Sesli Okunuş:</label>
                  <input
                    type="file"
                    className="form-control bg-primary border-0"
                    accept="audio/*"
                    onChange={handleAudioSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordAddForm;
