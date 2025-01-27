export default async function apiService(apiCall, limit = 20 ) {
    const BASE = "http://makeup-api.herokuapp.com/api/v1/products.json?";
    const fullUrl = BASE + apiCall;
  
    try {
        const res = await fetch(fullUrl, { 
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
  
        const data = await res.json();
        return data.length > limit ? data.slice(0, limit) : data;
    } catch (error) {
        console.error("API Service Error:", error.message);
        return [];
    }
}