/* 

La API makeup no cuenta con un organizacion tan clara de categorias y sub categorias, 
por lo que hice un array con las mismas, que me ayude a maketar mi pagina.

*/

export const categoriesMap = [
  { 
    name: "Face", 
    id:1,
    link: "/category/Face", 
    image: "/face-category.jpg", 
    SubCategory: [
      { name: "Blush", link: "/sub-category/blush", apiCall: { product_type: "blush" } },
      { name: "HighLighter", link: "/sub-category/highLighter", apiCall: { subcategory: "highlighter"} },
      { name: "Bronzer", link: "/sub-category/bronzer", apiCall: { product_type: "bronzer" } },
      { name: "Foundation", link: "/sub-category/foundation", apiCall: { product_type: "foundation" } },
      { name: "Concealer", link: "/sub-category/concealer", apiCall: { subcategory: "concealer" } }
    ]
  },
  { 
    name: "Lips", 
    id:2,
    link: "/category/Lips", 
    image: "/lips-category.jpg", 
    SubCategory: [
      { name: "Lipstick", link: "/sub-category/lipstick", apiCall: { product_type: "lipstick" } },
      { name: "Lip Gloss", link: "/sub-category/lip-gloss", apiCall: { subcategory: "lip_gloss"} },
      { name: "Lip Liner", link: "/sub-category/lip-liner", apiCall: { product_type: "lip_liner" } },
      { name: "Lip Stain", link: "/sub-category/lip-stain", apiCall: { subcategory: "lip_stain" }}
    ]
    
  },
  { 
    name: "Eyes", 
    id:3,
    link: "/category/Eyes", 
    image: "/eyes-category.jpg", 
    SubCategory: [
      { name: "Eyeshadow", link: "/sub-category/eyeshadow", apiCall: { product_type: "eyeshadow" } },
      { name: "Eyeliner", link: "/sub-category/eyeliner", apiCall: { product_type: "eyeliner" } },
      { name: "Mascara", link: "/sub-category/mascara", apiCall: { product_type: "mascara" } },
      { name: "Eyebrow", link: "/sub-category/eyebrow", apiCall: { product_type: "eyebrow" } }
    ]
  },
  { 
    name: "Nails", 
    id:4,
    link: "/category/Nails", 
    image: "/nails-category.jpg", 
    SubCategory: [
      { name: "Nail Polish", link: "/sub-category/nail-polish", apiCall: { product_type: "nail_polish" } }
    ]
  }
];
