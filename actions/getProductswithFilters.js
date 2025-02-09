import { db } from "./firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export const getProductswithFilters = async (filters = {}, limitResults = 10, brands = [], tags = []) => {
    try {
        const productsCollection = collection(db, "products"); // Referencia a la colección

        let filtersArray = []; // lista de condiciones WHERE

        // 🔹 Recorrer los filtros dinámicamente
        Object.keys(filters).forEach((key) => {
            const value = filters[key];

            if (typeof value === "object" && value.operator && value.value !== undefined) {
                // 🔹 Filtrar por operadores personalizados (Ej: rating >= 4.5)
                filtersArray.push(where(key, value.operator, value.value));
            } else if (value !== undefined && value !== null && value !== "") {
                // 🔹 Filtrar exacto (Ej: product_type == "lipstick")
                filtersArray.push(where(key, "==", value));
            }
        });

        // 🔹 Manejar filtrado de brands (Firestore solo permite "in" con <= 10 elementos)
        let allProducts = [];

        if (brands.length > 0) {
            const brandChunks = [];
            for (let i = 0; i < brands.length; i += 10) {
                brandChunks.push(brands.slice(i, i + 10));
            }

            for (const chunk of brandChunks) {
                let brandQuery = query(productsCollection, where("brand", "in", chunk), ...filtersArray, limit(limitResults));
                const snapshot = await getDocs(brandQuery);
                allProducts.push(...snapshot.docs.map((doc) => ({ idFirestore: doc.id, ...doc.data() })));
            }
        } else {
            // 🔹 Si no hay marcas, ejecutar la consulta general
            let productsQuery = query(productsCollection, ...filtersArray, limit(limitResults));
            const snapshot = await getDocs(productsQuery);
            allProducts = snapshot.docs.map((doc) => ({ idFirestore: doc.id, ...doc.data() }));
        }

        // 🔹 Filtrar por tags (Firestore no permite filtrar arrays internos directamente)
        if (tags.length > 0) {
            allProducts = allProducts.filter((product) => 
                tags.every((tag) => product.tag_list?.includes(tag))
            );
        }

        console.log("✅ Productos filtrados:", allProducts);
        return allProducts;

    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        return [];
    }
};
