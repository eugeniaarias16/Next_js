import { AsideBar } from "components/asideBar";
import React from "react";
import { getSubCategoryData } from "services/getSubCategoryData";


export default async function SubCatLayout({ children, params }) {
  const { "subcategory-name": subcategoryName } = params;
  const { tags, brands, error } = await getSubCategoryData(subcategoryName);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-4 pt-10 min-h-screen mt-12">
      {/* Barra de filtros */}
      <aside className="col-start-1 col-end-2 shadow-xl bg-ligth-brown/20 h-auto p-2 rounded-2xl backdrop-blur-3xl">
        <AsideBar tags={tags} brands={brands} />
      </aside>

      {/* Contenido principal */}
      <main className="col-start-2 col-end-5 p-6 overflow-auto">{children}</main>
    </div>
  );
}
