import { AsideBar } from "@components/asideBar"; 
import React from "react";
import { getSubCategoryData } from "services/getSubCategoryData";


export default async function SubCatLayout({ children, params }) {
  const { "subcategory-name": subcategoryName } = await params;
  console.log("Subcategory Name:", subcategoryName);
  const { tags, brands, error } = await getSubCategoryData(subcategoryName);
  

  
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr] pt-10 min-h-screen mt-12">
  {/* Barra de filtros */}
  <AsideBar tags={tags} brands={brands} />

  {/* Contenido principal */}
  <main className="p-6 overflow-auto">{children}</main>
</div>

  );
}
