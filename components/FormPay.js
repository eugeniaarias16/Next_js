import { AuthContext } from "actions/AuthContext";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { auth, db } from "actions/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const FormPay = ({ textButton, setAbleToPay}) => {
  const { currentUser, setCurrentUser, loggedIn } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [userCards, setUserCards] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    alias: "",
    payerName: "",
    dni: "",
    cardType: "credit",
    cardNumber: "",
    expiryDate: "",
  });

  // Cargar tarjetas del usuario al montar el componente y cuando currentUser cambie
  useEffect(() => {
    const loadUserCards = async () => {
      if (auth.currentUser?.uid) {
        try {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserCards(userData.payCard || []);

            // Actualizar el contexto si es necesario
            if (setCurrentUser && userData) {
              setCurrentUser((prevUser) => ({
                ...prevUser,
                ...userData,
              }));
            }
          }
        } catch (error) {
          console.error("Error loading user cards:", error);
          toast.error("Error loading your cards");
        }
      }
    };

    loadUserCards();
  }, [currentUser?.uid, setCurrentUser]);

  useEffect(() => {
    console.log("Current user data:", currentUser);
    console.log("PayCard data:", currentUser?.payCard);
  }, [currentUser]);
  // Validación de datos
  const validateInputs = useCallback(() => {
    let newErrors = {};

    if (!paymentInfo.alias.trim()) newErrors.alias = "Card alias is required";
    if (!/^[A-Za-z\s]+$/.test(paymentInfo.payerName.trim())) {
      newErrors.payerName = "Name should only contain letters and spaces";
    }
    if (!/^\d{8}$/.test(paymentInfo.dni)) {
      newErrors.dni = "DNI must be exactly 8 digits";
    }
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [paymentInfo]);

  // Manejo de cambios en inputs
  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;

    let newValue = value;
    if (id === "dni") {
      newValue = value.replace(/\D/g, "").slice(0, 8);
    } else if (id === "cardNumber") {
      newValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    } else if (id === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      newValue =
        cleaned.length >= 2
          ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
          : cleaned;
    }

    setPaymentInfo((prev) => ({ ...prev, [id]: newValue }));
  }, []);

  // Formatear el número de tarjeta mostrando solo los últimos 4 dígitos
  const formatCardNumber = (number) => `...${number.slice(-4)}`;

  const handleAction = async () => {

    //Verificar si los datos son válidos
    if (!validateInputs()) {
      toast.error("❌ Please fix the errors before saving.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    //Verificar si el usuario está logueado
    if (loggedIn) {
      try {
        if (!auth.currentUser?.uid) {
          toast.error("⚠️ You must be logged in to save cards", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
          });
          return;
        }
  
        // Verificar si la tarjeta ya existe
        const existingCard = userCards.find((card) => card.cardNumber === paymentInfo.cardNumber);
  
        if (!existingCard) {
          const newCard = {
            alias: paymentInfo.alias,
            cardNumber: paymentInfo.cardNumber,
            lastNumbers: formatCardNumber(paymentInfo.cardNumber.replace(/\s/g, "")),
            cardType: paymentInfo.cardType,
            payerName: paymentInfo.payerName,
            dni: paymentInfo.dni,
            expiryDate: paymentInfo.expiryDate,
            createdAt: new Date().toISOString(),
          };
  
          const updatedCards = [...userCards, newCard];
  
          // Guardar en Firestore
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          const currentData = userDoc.exists() ? userDoc.data() : {};
  
          await setDoc(userRef, { ...currentData, payCard: updatedCards }, { merge: true });
  
          // Actualizar el contexto global
          setCurrentUser((prevUser) => ({
            ...prevUser,
            payCard: updatedCards,
          }));
  
          setUserCards(updatedCards);
         
  
          // Mostrar notificación de éxito
          toast.success("✅ Card added successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
          });
        } else {
          console.warn("❌ Card already exists."); 
        }
        setAbleToPay(true); // Habilitar el pago
  
      } catch (error) {
        console.error("❌ Error saving card:", error);
        toast.error(`⚠️ Error saving card: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    } else {
      try {
        Object.keys(paymentInfo).forEach((key) => {
          sessionStorage.setItem(key, paymentInfo[key]);
        });
  
        setAbleToPay(true);
  
        toast.success("✅ Card saved locally!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
        });
  
      } catch (error) {
        console.error("❌ Error saving card to LocalStorage:", error);
        toast.error("⚠️ Error saving information.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    }
  };
  
  

  console.log(userCards);
  const handleCardSelection = (cardNumber) => {
 
    const selectedCard = userCards.find(card => card.cardNumber === cardNumber);
    if(selectedCard){
      setPaymentInfo({
        alias: selectedCard.alias,
        payerName: selectedCard.payerName,
        dni: selectedCard.dni,
        cardType: selectedCard.cardType,
        cardNumber: selectedCard.cardNumber,
        expiryDate: selectedCard.expiryDate
    })};}

  return (
    <>
      <h2 className="text-green text-3xl font-bold mt-4 mb-4 text-center">
        Payment Information
      </h2>
      <div className="w-full flex h-full shadow-lg rounded-xl ">
        <section className="w-1/4 bg-light-sand p-2">
          <h4 className="w-full text-center mt-2 text-[20px] text-brownn font-medium">
            Your Pay Cards
          </h4>
          <div className="">
            {userCards.map((card, index) => (
              <button type="button"  onClick={() => handleCardSelection(card.cardNumber)}
                key={index}
                className="mb-4 p-3 w-full bg-white/50 rounded-lg shadow hover:scale-95 hover:transition-all ease-in-out"
              >
                <p className="font-bold">{card.alias}</p>
                <p>{card.lastNumbers}</p>
                <p className="text-sm text-gray-600">{card.cardType}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="w-full max-w-2xl p-6">
          {/* Input Alias */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">Alias:</p>
            <input
              type="text"
              id="alias"
              placeholder="Card alias"
              value={paymentInfo.alias}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.alias ? "border-red-500" : "border-light-brown"
              }`}
            />
            {errors.alias && (
              <p className="text-red-500 text-sm">{errors.alias}</p>
            )}
          </div>

          {/* Input Nombre */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">Cardholder Name:</p>
            <input
              type="text"
              id="payerName"
              placeholder="Name"
              value={paymentInfo.payerName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.payerName ? "border-red-500" : "border-light-brown"
              }`}
            />
            {errors.payerName && (
              <p className="text-red-500 text-sm">{errors.payerName}</p>
            )}
          </div>

          {/* Input DNI */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">DNI:</p>
            <input
              type="text"
              id="dni"
              placeholder="DNI"
              value={paymentInfo.dni}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.dni ? "border-red-500" : "border-light-brown"
              }`}
            />
            {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
          </div>

          {/* Input Tipo de Tarjeta */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">Card Type:</p>
            <select
              id="cardType"
              value={paymentInfo.cardType}
              onChange={handleInputChange}
              className="w-full p-2 border border-light-brown rounded-lg"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          {/* Input Número de Tarjeta */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">Card Number:</p>
            <input
              type="text"
              id="cardNumber"
              placeholder="**** **** **** ****"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.cardNumber ? "border-red-500" : "border-light-brown"
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          {/* Input Expiry Date */}
          <div className="mb-4">
            <p className="text-light-brown font-semibold">
              Expiry Date (MM/YY):
            </p>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.expiryDate ? "border-red-500" : "border-light-brown"
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate}</p>
            )}
          </div>
          <div className="flex justify-center w-full">

          {/* Botón Guardar */}
          <button
            type="button"
            onClick={()=>handleAction(loggedIn)}
            className=" mt-4 cursor-pointer  w-[200px] bg-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-ligth-brown/70 hover:text-green transition-all"
            >
            {textButton}
          </button>
            </div>
        </section>

      </div>
      <ToastContainer />
    </>
  );
};
