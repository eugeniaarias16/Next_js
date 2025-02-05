import https from "https";
import fs from "fs";

// URL de la API
const apiUrl = "https://makeup-api.herokuapp.com/api/v1/products.json";

// Función para descargar productos y guardarlos en un archivo
const fetchProducts = () => {
    return new Promise((resolve, reject) => {
        https.get(apiUrl, (res) => {
            let data = "";

            // Acumulamos los datos recibidos
            res.on("data", (chunk) => {
                data += chunk;
            });

            // Cuando la solicitud termina, guardamos el JSON
            res.on("end", () => {
                try {
                    const productsArray = JSON.parse(data);

                    // Guardamos en un archivo JSON
                    fs.writeFileSync("products.json", JSON.stringify(productsArray, null, 2));

                    console.log("✅ Productos descargados y guardados en products.json");
                    resolve(productsArray);
                } catch (error) {
                    console.error("❌ Error al parsear JSON:", error);
                    reject(error);
                }
            });
        }).on("error", (err) => {
            console.error("❌ Error en la solicitud HTTP:", err);
            reject(err);
        });
    });
};

// Ejecutar la función
fetchProducts();
