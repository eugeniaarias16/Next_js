import { getProductswithFilters } from "actions/getProductswithFilters";

// ✅ Función para obtener subcategorías y productos filtrados
export async function getTopProducts(selectedCategory,limit=10) {
  const selectedSubCategory = selectedCategory.selectedCategory.SubCategory;
  console.log("✅ selectedSubCategory", selectedSubCategory);

  // Recorremos cada subcategoría y obtenemos los productos filtrados
  const subCategoryWithProducts = await Promise.all(
    selectedSubCategory.map(async (subCat) => {
      const filters = { ...subCat.apiCall, rating:{operator:">=", value:4.5} };
      console.log(` Filters for ${subCat.name}:`, filters);

      // Obtener productos con los filtros
      const products = await getProductswithFilters(filters, limit);
      products?products:null;
      console.log(`✅ Productos para ${subCat.name}:`, products);

      return { ...subCat, products }; // Agregar productos a cada subcategoría
    })
  );

  console.log(" Final Data to Return: ", { selectedSubCategory: subCategoryWithProducts });

  return { selectedSubCategory: subCategoryWithProducts };
}