import apiService from './apiService';

export default async function apiCalls() {
    try {
        const [Top20RatedProducts, TopLipstick, TopMascaras] = await Promise.all([
            apiService("rating_greater_than=4.5"),
            apiService("product_type=lipstick&rating_greater_than=4.5"),
            apiService("product_type=mascara")
        ]);

        return { Top20RatedProducts, TopLipstick, TopMascaras };
    } catch (error) {
        console.error("API Calls Error:", error);
        return { Top20RatedProducts: [], TopLipstick: [], TopMascaras: [] };
    }
}