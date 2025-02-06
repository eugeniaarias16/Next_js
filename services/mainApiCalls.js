import { getProductswithFilters } from 'actions/getProductswithFilters';

export const mainApiCalls=async()=> {
   
    const Top20RatedProducts= await getProductswithFilters({
        rating:{operator:">=", value:4.5 }
    });
    console.log("Top20",Top20RatedProducts);

    const TopLipstick= await getProductswithFilters({
        product_type:"lipstick",
        rating:{operator:">=", value:4.5}
    });
   console.log("Top Lipsticks",TopLipstick);
    
   const TopMascaras= await getProductswithFilters({
    product_type:"mascara",
    rating:{operator:">=", value: 4.5}
   });
   console.log("Top Mascaras:",TopMascaras);

   return {Top20RatedProducts, TopLipstick, TopMascaras}
   

}