import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase.js"; 

import fs from "fs";

// Leer el archivo JSON y convertir los datos a objetos de JavaScript antes de subirlos a Firebase
const loadProductsFromJson = () => {
    try {
        const rawData = fs.readFileSync("./actions/products.json", "utf8"); 
        const productsArray = JSON.parse(rawData);
        console.log("✅ JSON cargado correctamente");
        return productsArray;
    } catch (error) {
        console.error("❌ Error al leer el JSON:", error);
        return [];
    }
};

// Función para migrar productos a Firestore
export async function migrateProducts() {
    const productsCollection = collection(db, "products"); // Referencia a la colección
    const products = loadProductsFromJson(); // Cargar productos desde JSON

    if (products.length === 0) {
        console.log("❌ No hay productos para subir.");
        return;
    }

    for (const product of products) {
        try {
            await addDoc(productsCollection, product);
            console.log(`✅ Producto agregado: ${product.name}`);
        } catch (error) {
            console.error("❌ Error al subir producto:", error);
        }
    }

    console.log(" Todos los productos fueron subidos a Firestore");
}

// Ejecutar la migración
migrateProducts();


