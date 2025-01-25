export default async function apiService(apiCall) {
   
    const BASE = "http://makeup-api.herokuapp.com/api/v1/products.json?";
    const fullUrl = BASE + apiCall;
  
    try {
        const res = await fetch(fullUrl, { 
            cache: 'no-store', //Nunca usa la caché; siempre hace una nueva solicitud.
            headers: {
                'Accept': 'application/json' //espera recibir datos en formato JSON como respuesta.
            }
        });
  
       
        const data = await res.json();
        return data.length > 20 ? data.slice(0, 20) : data;
    } catch (error) {
        console.error("API Service Error:", error.message);
        return [];
    }
}