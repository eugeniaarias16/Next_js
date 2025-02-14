import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "actions/AuthContext";
import { auth, db } from "actions/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormUser = ({ loggedIn, textButton, setNext }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    street: "",
    number: "",
    city: "",
    isFlat: false,
    zipCode: "",
    floor: "",
    apartment: "",
  });

  // Actualizar datos cuando `currentUser` cambia
  useEffect(() => {
    if (currentUser) {
      setPhoneNumber(currentUser.phoneNumber || "");
      setEmail(currentUser.email || "");
      setAddress(
        currentUser.address || {
          street: "",
          number: "",
          city: "",
          isFlat: false,
          zipCode: "",
          floor: "",
          apartment: "",
        }
      );
    }
  }, [currentUser]);

  // Validación de datos
  const validateInputs = () => {
    let newErrors = {};

    if (!address.street || /\d/.test(address.street))
      newErrors.street = "Street name cannot contain numbers";
    if (!address.number || isNaN(address.number))
      newErrors.number = "Address number must be a valid number";
    if (!address.city) newErrors.city = "City is required";
    if (!address.zipCode || isNaN(address.zipCode))
      newErrors.zipCode = "Zip Code must be a valid number";
    if (!phoneNumber || phoneNumber.length < 7 || isNaN(phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number (at least 7 digits)";
    if (address.isFlat) {
      if (!address.floor) newErrors.floor = "Floor is required for flats";
      if (!address.apartment)
        newErrors.apartment = "Apartment number is required for flats";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Funciones de cambio de estado
  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setAddress((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleIsFlat = (e) => {
    const isFlat = e.target.value === "yes";
    setAddress((prev) => ({
      ...prev,
      isFlat,
      floor: isFlat ? prev.floor : "",
      apartment: isFlat ? prev.apartment : "",
    }));
  };

  // Guardado de datos (Firestore o LocalStorage)

  const handleAction = async () => {
    if (!validateInputs()) {
      toast.error("❌ Please fix the errors before saving.", {
        position: "top-center",
        autoClose: 5000, // Duración más larga para mejor visibilidad
        hideProgressBar: false, // Muestra la barra de carga
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (loggedIn) {
      try {
        const updatedData = {
          phoneNumber,
          address,
          lastUpdated: new Date().toISOString(),
        };

        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, updatedData, { merge: true });

        // Verificar si los datos se guardaron correctamente
        const verifyDoc = await getDoc(userRef);
        if (verifyDoc.exists()) {
          setCurrentUser((prev) => ({
            ...prev,
            ...updatedData,
          }));
        }

        toast.success("✅ Information updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setNext(true); // Habilitar el siguiente paso
      } catch (error) {
        console.error("❌ Error updating information:", error);
        toast.error(`❌ Error updating information: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      try {
        localStorage.setItem("phoneNumber", phoneNumber);
        Object.keys(address).forEach((key) => {
          localStorage.setItem(key, address[key]);
        });

        toast.success("✅ Information saved locally!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setNext(true);
      } catch (error) {
        console.error("❌ Error saving to LocalStorage:", error);
        toast.error("❌ Error saving information.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <section className="w-full p-6 mt-6  rounded-xl shadow-lg ">
      <div className="w-full flex gap-4">
        <div className="mb-4 w-1/2">
          <p className="text-light-brown font-semibold">Your Email:</p>
          <input
            value={email}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-light-brown rounded-lg bg-light-sand"
          />
        </div>

        <div className="mb-4 w-1/2">
          <p className="text-light-brown font-semibold">Your Phone Number:</p>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`w-full p-2 border rounded-lg bg-light-sand ${
              errors.phoneNumber ? "border-red-500" : "border-light-brown"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-light-brown font-semibold">Your Address:</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            id="street"
            value={address.street}
            placeholder="Street"
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-lg bg-light-sand"
          />
          <input
            type="text"
            id="number"
            value={address.number}
            placeholder="Number"
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-lg bg-light-sand"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          id="city"
          value={address.city}
          placeholder="City"
          onChange={handleAddressChange}
          className="w-1/2 p-2 border rounded-lg bg-light-sand"
        />
        <input
          type="text"
          id="zipCode"
          value={address.zipCode}
          placeholder="Zip Code"
          onChange={handleAddressChange}
          className="w-1/2 p-2 border rounded-lg bg-light-sand"
        />
      </div>

      <div className="w-full flex justify-center items-end gap-4">
        <div className="mb-4 w-1/4">
          <p className="text-light-brown font-semibold">Is it a Flat?</p>
          <select
            onChange={handleIsFlat}
            value={address.isFlat ? "yes" : "no"}
            className="w-full p-2 border border-light-brown rounded-lg bg-light-sand"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          type="button"
          onClick={handleAction}
          className="mt-4 cursor-pointer  w-[200px] bg-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-ligth-brown/70 hover:text-green transition-all"
        >
          {textButton}
        </button>
      </div>
    </section>
  );
};
