"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AsideBar = ({ brands, tags }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados locales para los filtros seleccionados
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Cargar filtros desde la URL al inicio
  useEffect(() => {
    setSelectedBrands(searchParams.get("brands")?.split(",") || []);
    setSelectedTags(searchParams.get("tags")?.split(",") || []);
  }, [searchParams]);

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (event, setState) => {
    const { value, checked } = event.target;
    setState((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  // Aplicar filtros manualmente al hacer clic en el botón
  const applyFilters = () => {
    const newParams = new URLSearchParams();

    if (selectedBrands.length > 0) newParams.set("brands", selectedBrands.join(","));
    if (selectedTags.length > 0) newParams.set("tags", selectedTags.join(","));

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <form className="w-full p-2.5 flex flex-col flex-wrap mt-20">
      <h3 className="w-full text-center text-3xl text-green font-bold">Filters</h3>

      {/* Filtrar por Marca */}
      <fieldset>
        <h4 className="gradient-ligth p-1 text-center text-white text-xl font-semibold mt-8 mb-4">Filter By Brands</h4>
        <ul className="flex gap-2 flex-col">
          {brands.map((brand, index) => (
            <li className="flex gap-1.5 items-center" key={index}>
              <input
                type="checkbox"
                id={`brand-${index}`}
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => handleCheckboxChange(e, setSelectedBrands)}
                className="rounded-full h-5 w-5 accent-green"
              />
              <label htmlFor={`brand-${index}`} className="decoration-none w-3/4 px-2 py-1 text-lg font-md text-brownn">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Filtrar por Tags */}
      <fieldset>
        <h4 className="gradient-ligth p-1 text-center text-white text-xl font-semibold mb-4">Filter By Tags</h4>
        <ul className="flex gap-2 flex-col">
          {tags.map((tag, index) => (
            <li className="flex gap-1.5 items-center" key={index}>
              <input
                type="checkbox"
                id={`tag-${index}`}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={(e) => handleCheckboxChange(e, setSelectedTags)}
                className="rounded-full h-5 w-5 accent-green"
              />
              <label htmlFor={`tag-${index}`} className="decoration-none w-3/4 px-2 py-1 text-lg font-md text-brownn">
                {tag}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Botón para aplicar filtros */}
      <button
        type="button"
        onClick={applyFilters}
        className="mt-4 px-4 py-2 bg-green text-white text-xl rounded-lg hover:bg-gold hover:text-brownn hover:font-semibold transition-all"
      >
        Apply Filters
      </button>
    </form>
  );
};
