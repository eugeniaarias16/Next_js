"use client";
import { auth, googleProvider } from "./firebase"; 
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Escuchar cambios en la autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setCurrentUser(user);
            } else {
                setLoggedIn(false);
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Limpieza del efecto
    }, []);

    // Inicio de sesión con email y contraseña
    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error.message);
        }
    };

    // Inicio de sesión con Google
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("❌ Error con Google Sign-In:", error.message);
        }
    };

    // Cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error.message);
        }
    };

    return (
        <Provider value={{ currentUser, loggedIn, loading, handleLogin, handleGoogleLogin, handleLogout }}>
            {children}
        </Provider>
    );
};

