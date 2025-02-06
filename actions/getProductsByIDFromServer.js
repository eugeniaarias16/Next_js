import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Función para buscar un producto por el campo interno "id"
export async function getProductById(productId) {
    try {
        if (!productId) {
            console.error("❌ Error: El productId es inválido:", productId);
            return null;
        }

        //  `productId` a número si el campo `id` en Firestore es un número
        const numericProductId = Number(productId); 

        console.log("🔍 Buscando producto con ID:", numericProductId);

        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("id", "==", numericProductId)); 
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log("⚠️ Producto no encontrado en Firestore");
            return null;
        }

        const productDoc = snapshot.docs[0];

        const productData = {
            idFirestore: productDoc.id, // ID único de Firestore
            ...productDoc.data()
        };

        console.log("✅ Producto encontrado:", productData);
        return productData;

    } catch (error) {
        console.error("❌ Error al obtener el producto:", error);
        return null;
    }
}
