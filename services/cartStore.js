import { create } from "zustand";
import { persist } from "zustand/middleware";

/* 
   -- Zustand con Mensajes --
    + Librería para manejar estados globales sin necesidad de pasar props entre componentes.
    + Se agrega persistencia para que el carrito no se reinicie al cambiar de página.
    + Ahora cada acción genera un mensaje de confirmación.
*/

export const useCartStore = create(
  persist(
    (set) => ({
      cartStore: [], // Estado inicial del carrito
      message: "", // Nuevo estado para mostrar mensajes

      // 🛒 Agregar producto al carrito
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cartStore.find((item) => item.id === product.id);
          let newCart;
          
          if (existingProduct) {
            newCart = state.cartStore.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            newCart = [...state.cartStore, { ...product, quantity: 1 }];
          }

          console.log("✅ Producto añadido:", product);
          return {
            cartStore: newCart,
            message: `✅ ${product.name} añadido correctamente. Carrito actualizado.`,
          };
        }),

      //  Remover producto (si llega a 0, lo elimina)
      removeFromCart: (product) =>
        set((state) => {
          const newCart = state.cartStore
            .map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);

          console.log("❌ Producto eliminado:", product);
          return {
            cartStore: [...newCart],
            message: newCart.length > 0 
              ? `🛑 ${product.name} removido del carrito.`
              : `🛒 ${product.name} eliminado. Tu carrito está vacío.`,
          };
        }),

      // Eliminar un producto completamente
    deleteFromCart: (product) =>
  set((state) => {
    const newCart = state.cartStore.filter((item) => item.id !== product.id);
    
    console.log("🗑 Eliminando producto del carrito:", product.id);
    console.log("Nuevo carrito actualizado:", newCart);

    return {
      cartStore: [...newCart], // ✅ Forzar nueva referencia del array
      message: `🛒 El producto ha sido eliminado completamente del carrito.`,
    };
  }),

      //Vaciar carrito
      clearCart: () =>
        set(() => {
          console.log("🔴 Carrito vaciado");
          return { cartStore: [], message: "🛒 Tu carrito ha sido vaciado." };
        }),
    }),

    {
      name: "cart-storage", // Nombre de la clave en localStorage
      getStorage: () => localStorage, // Define que se use localStorage
    }
  )
);
