import { getProductswithFilters } from 'actions/getProductswithFilters';

// 🔹 Función para obtener datos de las subcategorías con productos filtrados
export const fetchSubCategoryData = async ({ selectedCategory,limits }) => {
    try {
        return await Promise.all(
            selectedCategory.SubCategory.map(async (sub) => {
                const filters = { ...sub.apiCall };

                const products = await getProductswithFilters(filters,limits);

                return { name: sub.name, products, link: sub.link };
            })
        );
    } catch (error) {
        console.error("❌ Error fetching subcategory data:", error);
        return [];
    }
};
