import Cards from "./Cards";

export default function SliderCards({ products, title, link }) {


  return (
    <div className="w-[95%] flex flex-col items-center mt-10 gap-6">
      {/* Título */}
      <div
        className="w-1/2 p-3 rounded-xl bg-sand text-center mb-4 text-4xl text-green font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:text-light-sand"
      >
        {title}
      </div>

      {/* Slider de Tarjetas */}
      <div className="w-full p-6 bg-light-brown/50 backdrop-blur-lg rounded-xl shadow-lg flex justify-center overflow-x-auto gap-4 custom-scrollbar">
        {products.map((product) => (
          <Cards key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
