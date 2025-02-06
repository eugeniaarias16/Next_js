import { db } from "./firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export const getProductswithFilters = async (filters = {}, limitResults = 10) => {
    try {
        const productsCollection = collection(db, "products"); // 📌 1️⃣ Referencia a la colección

        let filtersArray = []; // lista de condiciones WHERE

        // 🔹 Recorrer los filtros dinámicamente
        Object.keys(filters).forEach((key) => {
            const value = filters[key];

            // Si el filtro es numérico con operador (ej: rating: { operator: ">=", value: 4.5 })
            if (typeof value === "object" && value.operator && value.value !== undefined) {
                filtersArray.push(where(key, value.operator, value.value));
            }
            // Si el filtro es un valor exacto (ej: product_type: "lipstick")
            else {
                filtersArray.push(where(key, "==", value));
            }
        });

        // Ejecutamos la consulta con los filtros aplicados y el límite de resultados
        const productsQuery = query(productsCollection, ...filtersArray, limit(limitResults));
        const snapshot = await getDocs(productsQuery);

        // Convertimos los resultados en un array de objetos
        const products = snapshot.docs.map((doc) => ({
            idFirestore: doc.id, // ID único en Firestore
            ...doc.data()
        }));

        console.log("Productos filtrados:", products);
        return products;

    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        return [];
    }
};
