import CartSummery from "@/components/CartSummery";
import React from "react";
import { normalizeImageUrl } from "@/services/normalizeImageUrl";
import Image from "next/image";
export default function page() {
  let cartShop = [
    {
      id: 1017,
      brand: "Lotus Cosmetics USA",
      name: "Creme to Powder Blush",
      price: "0.0",
      price_sign: "$",
      currency: "USD",
      image_link:
        "https://www.purpicks.com/wp-content/uploads/2018/03/lotus-cosmetics-usa-creme-to-powder-blush.png",
      product_link:
        "https://www.purpicks.com/product/lotus-cosmetics-usa-creme-powder-blush/",
      website_link: "https://purpicks.com/",
      description:
        "A cream to powder blush made with all natural ingredients that applies like a soft cream but finishes like a silky powder. Antioxidant-rich botanicals help moisturize the skin, while natural pigments provide long-lasting buildable color for a healthy, radiant glow. Made with natural and organic ingredients.",
      rating: null,
      category: "cream",
      product_type: "blush",
      tag_list: ["purpicks", "Organic", "USDA Organic"],
    },
    {
      id: 1020,
      brand: "100% Pure",
      name: "Fruit Pigmented Lip & Cheek Tint",
      price: "24.0",
      price_sign: "$",
      currency: "USD",
      image_link:
        "https://www.purpicks.com/wp-content/uploads/2018/03/100-pure-fruit-pigmented-lip-cheek-tint.png",
      product_link:
        "https://www.purpicks.com/product/100-pure-fruit-pigmented-lip-cheek-tint/",
      website_link: "https://purpicks.com/",
      description:
        "A natural lip and cheek tint made with fruit pigments. Provides long-lasting color while nourishing your skin with antioxidants and vitamins.",
      rating: 4.5,
      category: "tint",
      product_type: "lip_cheek_tint",
      tag_list: ["Vegan", "Cruelty-Free", "Natural"],
    },
    {
      id: 1032,
      brand: "ILIA Beauty",
      name: "Multi-Stick",
      price: "34.0",
      price_sign: "$",
      currency: "USD",
      image_link:
        "https://www.purpicks.com/wp-content/uploads/2018/03/ilia-beauty-multi-stick.png",
      product_link: "https://www.purpicks.com/product/ilia-beauty-multi-stick/",
      website_link: "https://purpicks.com/",
      description:
        "A versatile multi-stick that works for cheeks and lips. Made with organic ingredients for a smooth, hydrating application with a natural finish.",
      rating: 4.7,
      category: "stick",
      product_type: "multi-use",
      tag_list: ["Organic", "Vegan", "Cruelty-Free"],
    },
  ];

  console.log(cartShop);

  return (
    <div className="flex mt-20 w-screen h-screen justify-between px-10">
      {/* items en carrito */}
      <section className=" w-3/4  h-[400px] flex flex-wrap gap-2 justify-center">
        <div className="w-full  flex flex-wrap gap-2 justify-center pt-5 overflow-scroll">
          {cartShop.map((item) => (
            <div
              key={item.id}
              className="w-9/10  h-40 bg-ligth-brown/50 rounded-2xl drop-shadow-2xl flex p-4 shadow-lg"
            >
              {/* 📷 Contenedor de la imagen */}
              <div className="w-1/4 h-full flex items-center">
                <Image
                  src={normalizeImageUrl(item.api_featured_image)}
                  width={80}
                  height={80}
                  alt={item.name}
                  priority
                  className="object-contain rounded-lg"
                />
              </div>

              {/* 🛍 Info de la tarjeta */}
              <div className="w-3/4 h-full flex flex-col justify-between px-4">
                <div>
                  <h2 className="text-lg font-bold text-brownn drop-shadow-lg">
                    {item.name}
                  </h2>
                  <h3 className="text-md text-green font-semibold drop-shadow-lg">
                    {item.brand}
                  </h3>
                </div>

                {/* Precios */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-brownn font-medium">
                      Unitary Price:
                    </span>
                    <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                      ${item.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-brownn font-medium">
                      Total Price:
                    </span>
                    <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* informacion de la compra */}

      <section className="w-1/4 min-w-[450px] flex justify-center">
        <CartSummery />
      </section>
    </div>
  );
}
