import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { doc, setDoc, increment,addDoc, collection, deleteDoc, getDoc, getDocs, onSnapshot, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXrVR4494DPu26hbjLhHCfHgUf5r0Pbsw",
    authDomain: "librify-e50da.firebaseapp.com",
    projectId: "librify-e50da",
    storageBucket: "librify-e50da.appspot.com",
    messagingSenderId: "699128670345",
    appId: "1:699128670345:web:d9f4e5253a5c3d39193e58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, db };

export const agregarLibro = async (libro) => {
    await addDoc(collection(db, 'libros'), libro);
    return true;
};

export const obtenerLibros = async (libro) => {
    onSnapshot(collection(db, 'libros'), libro);
};

export const eliminarLibro = async (id) => {
    await deleteDoc(doc(db, 'libros', id));
    return true;
};

export const obtenerLibroPorId = async (id) => {
    return getDoc(doc(db, 'libros', id));
};

export const actualizarLibro = async (id, libro) => {
    await updateDoc(doc(db, 'libros', id), libro);
    return true;
};

export const agregarUsuario = async (usuario) => {
    await addDoc(collection(db, 'usuarios'), usuario);
    return true;
};

export const obtenerUsuario = async (usuario) => {
    onSnapshot(collection(db, 'usuarios'), usuario);
};

export const eliminarUsuario = async (id) => {
    await deleteDoc(doc(db, 'usuarios', id));
    return true;
};

export const obtenerUsuarioPorId = async (id) => {
    return getDoc(doc(db, 'usuarios', id));
};

export const actualizarUsuario = async (id, usuario) => {
    await updateDoc(doc(db, 'usuarios', id), usuario);
    return true;
};

export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
