import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "actions/AuthContext";
import { auth, db } from "actions/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export const FormUser = ({ loggedIn, textButton }) => {
  const { currentUser, updateUserData } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [email, setEmail] = useState(currentUser?.email || "");
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState(
    currentUser?.address || {
      street: "",
      number: "",
      city: "",
      isFlat: false,
      zipCode: "",
      floor: "",
      apartment: "",
    }
  );


  useEffect(() => {
    if (currentUser?.email) setEmail(currentUser.email);
    if (currentUser?.address) setAddress(currentUser.address);
  }, [currentUser]);

  const validateInputs = () => {
    let newErrors = {};

    if (!address.street || /\d/.test(address.street)) {
      newErrors.street = "Street name cannot contain numbers";
    }
    if (!address.number || isNaN(address.number)) {
      newErrors.number = "Address number must be a valid number";
    }
    if (!address.city) {
      newErrors.city = "City is required";
    }
    if (!address.zipCode || isNaN(address.zipCode)) {
      newErrors.zipCode = "Zip Code must be a valid number";
    }
    if (!phoneNumber || phoneNumber.length < 7 || isNaN(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number (at least 7 digits)";
    }
    if (address.isFlat) {
      if (!address.floor) newErrors.floor = "Floor is required for flats";
      if (!address.apartment)
        newErrors.apartment = "Apartment number is required for flats";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  //  Determinar si guardar en Firestore o LocalStorage
  const handleAction = async () => {
    if (!validateInputs()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    if (loggedIn) {
      // 🔹 Guardar en Firestore y actualizar AuthContext
      try {
        const updatedData = {
          phoneNumber,
          address,
          lastUpdated: new Date().toISOString(),
        };

        await updateUserData(auth.currentUser.uid, updatedData);
        toast.success("Information updated successfully!");

        // 🔥 **IMPORTANTE: Actualizar `next` en CheckUserData después de guardar**
        setNext(true);

      } catch (error) {
        console.error("❌ Error updating information:", error);
        toast.error("Error updating information: " + error.message);
      }
    } else {
      // 🔹 Guardar en LocalStorage
      try {
        Object.keys(address).forEach((key) => {
          localStorage.setItem(key, address[key]);
        });
        localStorage.setItem("phoneNumber", phoneNumber);
        toast.success("Information saved locally!");

        // 🔥 **IMPORTANTE: También actualizar `next` para el caso de LocalStorage**
        setNext(true);
      } catch (error) {
        console.error("❌ Error saving to LocalStorage:", error);
        toast.error("Error saving information.");
      }
    }
  };


  return (
    <section className="w-full p-6 mt-6">
      <div className="w-full flex gap-4">
        <div className="mb-4 w-1/2">
          <p>Your Email is:</p>
          <input
            value={email}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full bg-ligth-sand p-2 border rounded-lg`}
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
            className={`w-full bg-ligth-sand p-2 border rounded-lg ${
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
            className={`w-full bg-ligth-sand p-2 border rounded-lg ${
              errors.street ? "border-red-500" : "border-light-brown"
            }`}
          />
          <input
            type="text"
            id="number"
            value={address.number}
            placeholder="Number"
            onChange={handleAddressChange}
            className={`w-full bg-ligth-sand p-2 border rounded-lg ${
              errors.number ? "border-red-500" : "border-light-brown"
            }`}
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            id="city"
            value={address.city}
            placeholder="City"
            onChange={handleAddressChange}
            className={`w-full bg-ligth-sand p-2 border rounded-lg ${
              errors.city ? "border-red-500" : "border-light-brown"
            }`}
          />
          <input
            type="text"
            id="zipCode"
            value={address.zipCode}
            placeholder="Zip Code"
            onChange={handleAddressChange}
            className={`w-full bg-ligth-sand p-2 border rounded-lg ${
              errors.zipCode ? "border-red-500" : "border-light-brown"
            }`}
          />
          {errors.city && (
            <p className="text-red-500  text-sm">{errors.city}</p>
          )}
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode}</p>
          )}
        </div>
      </div>

      <div className=" w-full flex justify-center items-end gap-4">
        <div className="mb-4 w-1/4">
          <p className="text-light-brown font-semibold">Is a Flat?</p>
          <select
            onChange={handleIsFlat}
            value={address.isFlat ? "yes" : "no"}
            className="w-full bg-ligth-sand p-2 border border-light-brown rounded-lg"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {address.isFlat && (
          <div className="mb-4 w-3/4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="floor"
                value={address.floor}
                placeholder="Floor"
                onChange={handleAddressChange}
                className={`w-full bg-ligth-sand p-2 border rounded-lg ${
                  errors.floor ? "border-red-500" : "border-light-brown"
                }`}
              />
              <input
                type="text"
                id="apartment"
                value={address.apartment}
                placeholder="Apartment"
                onChange={handleAddressChange}
                className={`w-full bg-ligth-sand p-2 border rounded-lg ${
                  errors.apartment ? "border-red-500" : "border-light-brown"
                }`}
              />
              {errors.floor && (
                <p className="text-red-500 text-sm">{errors.floor}</p>
              )}
              {errors.apartment && (
                <p className="text-red-500 text-sm">{errors.apartment}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAction}
        className="mt-4 w-full bg-green text-white px-4 py-2 rounded-lg"
      >
        {textButton}
      </button>
    </section>
  );
};
