import { getProductswithFilters } from "actions/getProductswithFilters";
import { categoriesMap } from "services/categoriesMap";

// ✅ Función para obtener subcategorías y productos filtrados
export async function getSubCategoryData(subcategoryName, brands = [], tags = []) {
  const selectedSubCategory = categoriesMap
    .flatMap((category) => category.SubCategory)
    .find((subCat) => subCat.link.includes(subcategoryName));

  if (!selectedSubCategory) {
    return { error: "Subcategory not found", data: [], tags: [], brands: [] };
  }

  // 🔹 Definir filtros
  const filters = { ...selectedSubCategory.apiCall };
  const data = await getProductswithFilters(filters, 70, brands, tags);

  // 🔹 Obtener Tags y Brands únicos
  const tagsList = [...new Set(data.flatMap((product) => product.tag_list || []))];
  const brandsList = [...new Set(data.map((product) => product.brand).filter(Boolean))];

  return { selectedSubCategory, data, tags: tagsList, brands: brandsList };
}
