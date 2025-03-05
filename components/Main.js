import React from "react";
import ByCategory from "./ByCategory";
import SliderCards from "./SliderCards";
import { getProductswithFilters } from "@/actions/getProductswithFilters"; 
export default async function Main() {
  /* const { Top20RatedProducts, TopLipstick, TopMascaras } = await mainApiCalls(); */

  const Top20RatedProducts = await getProductswithFilters({
    rating: { operator: ">=", value: 4.5 },
  });
  console.log("Top20", Top20RatedProducts);
  const TopLipstick = await getProductswithFilters({
    product_type: "lipstick",
    rating: { operator: ">=", value: 4.5 },
  });
  console.log("Top Lipsticks", TopLipstick);

  const TopMascaras = await getProductswithFilters({
    product_type: "mascara",
    rating: { operator: ">=", value: 4.5 },
  });
  console.log("Top Mascaras:", TopMascaras);

  return (
    <div className="min-h-screen w-full  sm:p-2.5 flex flex-col align-middle items-center">
      <ByCategory />
      <SliderCards products={Top20RatedProducts} title="Top Rated Products" />
      <SliderCards products={TopMascaras} title="Your Next Mascara" />
      <SliderCards products={TopLipstick} title="Top Lipsticks" />
    </div>
  );
}
