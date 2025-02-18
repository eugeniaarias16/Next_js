import { getProductswithFilters } from "actions/getProductswithFilters";
import { categoriesMap } from "services/categoriesMap";

export async function getSubCategoryData(subcategoryName, brands = [], tags = []) {
  let error = null; // ✅ Definir error desde el inicio
  console.log("Subcategory:", subcategoryName);
  const selectedSubCategory = categoriesMap
    .flatMap((category) => category.SubCategory)
    .find((subCat) => subCat.link.includes(subcategoryName));

  if (!selectedSubCategory) {
    error = "Subcategory not found";
    return { error, data: [], tags: [], brands: [] };
  }

  try {
    // 🔹 Definir filtros
    const filters = { ...selectedSubCategory.apiCall };
    const data = await getProductswithFilters(filters, 70, brands, tags);

    // 🔹 Obtener Tags y Brands únicos
    const tagsList = [...new Set(data.flatMap((product) => product.tag_list || []))];
    const brandsList = [...new Set(data.map((product) => product.brand).filter(Boolean))];

    return { selectedSubCategory, data, tags: tagsList, brands: brandsList, error };
  } catch (err) {
    return { error: err.message, data: [], tags: [], brands: [] };
  }
}
