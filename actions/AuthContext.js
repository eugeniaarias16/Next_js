"use client";
import { auth, googleProvider, db } from "./firebase";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Función para obtener datos de Firestore
    const fetchUserData = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                return userDoc.data(); // Retorna los datos del usuario en Firestore
            }
            return {}; // Si no hay datos, retorna un objeto vacío
        } catch (error) {
            console.error("❌ Error al obtener datos de Firestore:", error);
            return {};
        }
    };

    // 🔹 Escuchar cambios en la autenticación y traer datos de Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fetchUserData(user.uid);

                setLoggedIn(true);
                setCurrentUser({ ...user, ...userData }); // 🔹 Combinamos Auth y Firestore
            } else {
                setLoggedIn(false);
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Limpieza del efecto
    }, []);

    // 🔹 Inicio de sesión con email y contraseña
    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = await fetchUserData(user.uid);

            setLoggedIn(true);
            setCurrentUser({ ...user, ...userData }); // 🔹 Unimos los datos

        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error.message);
        }
    };

    // 🔹 Inicio de sesión con Google
    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            const userData = await fetchUserData(user.uid);

            setLoggedIn(true);
            setCurrentUser({ ...user, ...userData }); // 🔹 Unimos los datos
        } catch (error) {
            console.error("❌ Error con Google Sign-In:", error.message);
        }
    };

    // 🔹 Guardar o actualizar datos en Firestore
    const updateUserData = async (uid, newData) => {
        try {
            const userRef = doc(db, "users", uid);
            await setDoc(userRef, newData, { merge: true });

            setCurrentUser((prevUser) => ({
                ...prevUser,
                ...newData,
            }));

            console.log("✅ Datos del usuario actualizados en Firestore y AuthContext.");
        } catch (error) {
            console.error("❌ Error al actualizar datos del usuario:", error);
        }
    };

    // 🔹 Cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setLoggedIn(false);
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error.message);
        }
    };

    return (
        <Provider value={{ 
            currentUser, 
            setCurrentUser, 
            loggedIn, 
            loading, 
            handleLogin, 
            handleGoogleLogin, 
            handleLogout, 
            updateUserData 
        }}>
            {children}
        </Provider>
    );
};
