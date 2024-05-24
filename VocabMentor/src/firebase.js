import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { pass, sign } from "three/examples/jsm/nodes/Nodes.js";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyAj1Ro6Fz2mtZvJlkdE6fHs3L-r38JeiBU",
  authDomain: "vocabmentor-5442c.firebaseapp.com",
  projectId: "vocabmentor-5442c",
  storageBucket: "vocabmentor-5442c.appspot.com",
  messagingSenderId: "726811599707",
  appId: "1:726811599707:web:7979ab51c0a435b607b07e",
  measurementId: "G-5X0RH2TEZR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, setDoc, doc };
export const register = async (name, email, password) => {
  // isim parametresini ekleyin
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Kullanıcı bilgilerini Firestore'a kaydet
    await addUserInfoToFirestore(user.uid, name, email);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
const addUserInfoToFirestore = async (userId, name, email) => {
  try {
    await setDoc(doc(db, "users", userId), {
      name: name,
      email: email,
    });
    console.log("Kullanıcı bilgileri Firestore'a kaydedildi.");
  } catch (error) {
    console.error("Firestore'a kullanıcı bilgileri kaydedilirken hata:", error);
  }
};
export const uploadImageToStorage = async (imageFile) => {
  console.log(imageFile);
  const storageRef = ref(storage, "images/" + imageFile.name); // storage değişkenini kullanın
  await uploadBytes(storageRef, imageFile);
  const imageURL = await getDownloadURL(storageRef);
  return imageURL;
};

export const uploadAudioToStorage = async (audioFile) => {
  if (!audioFile) {
    return null;
  }
  const storage = getStorage();
  const storageRef = ref(storage, "audios/" + audioFile.name);
  await uploadBytes(storageRef, audioFile);
  const audioURL = await getDownloadURL(storageRef);
  return audioURL;
};

export const addWordToFirestore = async (
  englishWord,
  turkishEquivalent,
  exampleSentences,
  imageFile,
  audioFile
) => {
  console.log(imageFile);
  try {
    const imageURL = await uploadImageToStorage(imageFile);
    const audioURL = await uploadAudioToStorage(audioFile);
    // Firestore'a eklenecek yeni kelime belgesi
    const newWord = {
      inEnglish: englishWord,
      inTurkish: turkishEquivalent,
      exampleSentences: exampleSentences,
      firstRound: true,
      secondRound: true,
      thirdRound: true,
      fourthRound: true,
      fifthRound: true,
      sixthRound: true,
      pictureURL: imageURL,
      voiceURL: audioURL,
      // Diğer alanları buraya ekleyebilirsiniz
    };

    // Firestore'a yeni belge ekleyin
    await addDoc(collection(db, "words"), newWord);
    console.log("Yeni kelime Firestore'a başarıyla eklendi.");
  } catch (error) {
    console.error("Firestore'a kelime eklenirken hata oluştu:", error);
    throw error; // Hata durumunda bir hata fırlatın, işlemi kullanan bileşen bunu ele alabilir
  }
};

export const fetchUserName = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid)); // Firestore'dan kullanıcı belgesini al
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.name;
    } else {
      throw new Error("Kullanıcı bulunamadı");
    }
  } catch (error) {
    console.error("Firestore'dan kullanıcı ismi alınırken hata oluştu:", error);
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const resetpassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Yenileme linki  gönderildi.");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export { app, auth }; // İhtiyacınıza göre diğer Firebase modüllerini de ekleyebilirsiniz.
