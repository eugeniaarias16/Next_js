"use client";
import { useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // 🔹 Importamos useRouter
import { AuthContext } from "actions/AuthContext";

export const IsLogin = () => {
  const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const router = useRouter(); // Hook para redirección
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alternar entre Login y Registro
  const toggleForm = () => setIsLogin(!isLogin);

  // Manejo de cambio en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  //Manejo del formulario
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await handleLogin(email, password); //  Iniciar sesión
        router.push("/admin/userInformation"); //  Redirigir tras éxito
      } catch (error) {
        console.error("Error en el login:", error.message);
      }
    },
    [email, password, handleLogin, router]
  );

//LogIn with Google
const handleGoogle=async () => {
  try {
    await handleGoogleLogin(); // Iniciar sesión con Google
    router.push("/admin/userInformation"); // Redirigir tras éxito
  } catch (error) {
    console.error("Error con Google Sign-In:", error.message);
  }
}


  return (
    <main className="rounded-2xl w-8/10 h-8/10 border-light-brown p-6 shadow-2xl">
      {/* Título */}
      <h2 className="w-8/10 text-[40px] m-auto gradient-ligth text-center mt-7 rounded-2xl bg-light-sand text-green font-bold py-2 shadow-md">
        {isLogin ? "Log In" : "Register"}
      </h2>

      {/* Formulario */}
      <form
        className="flex flex-col items-center mt-10 mb-10 space-y-6"
        onSubmit={handleSubmit}
      >
        <fieldset className="w-full">
          {/* Input de Email */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="email" className="text-brownn pl-3 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border bg-sand/30 border-ligth-brown rounded-lg bg-light-sand"
              required
            />
          </div>

          {/* Input de Contraseña */}
          <div className="col-span-full sm:col-span-3 mt-4">
            <label htmlFor="password" className="text-brownn pl-3 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border bg-sand/30 border-ligth-brown rounded-lg bg-light-sand"
              required
            />
          </div>

          {/* Botón de acción */}
          <div className="col-span-full flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 hover:bg-gold w-[150px] bg-green/70 text-sand hover:text-red-900 rounded-lg font-semibold hover:bg-light-brown transition-all ease-in-out shadow-md"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </fieldset>
      </form>

      {/* Inicio de sesión con Google */}
      <div className="flex justify-center mt-4">
        <button
          onClick={()=>handleGoogle()}
          className="px-6 py-2 bg-blue-950 text-sand rounded-lg font-semibold hover:bg-gold hover:text-red-900 transition-all ease-in-out shadow-md"
        >
          Sign in with Google
        </button>
      </div>

      {/* Botón para cambiar entre Login y Registro */}
      <div className="m-auto text-center mt-7 text-brownn hover:text-green hover:scale-105 transition-transform ease-in-out">
        <button onClick={toggleForm} className="cursor-pointer font-medium">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}
        </button>
      </div>
    </main>
  );
};
