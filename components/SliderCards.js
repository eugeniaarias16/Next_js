import Cards from "./Cards";


export default function SliderCards({ products, title}) {
  

  return (
    <div className="w-[95%] flex flex-col items-center mt-10 gap-6">
      
      {/* Título */}
      <div
        className=" xs:w-9/10 xs:text-3xl sm:w-8/10 md:w-7/10 lg:w-1/2 p-3 gradient-ligth rounded-xl bg.opa  text-center mb-4 text-4xl text-green font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:text-light-sand"
      >
        {title}
      </div>

      {/* Slider de Tarjetas */}
      <div className="w-full p-6 bg-light-brown/50 backdrop-blur-lg rounded-xl shadow-lg flex justify-center overflow-x-auto gap-4 custom-scrollbar">
        {products.map((product) => (
            <Cards key={product.id} product={product}/>
       ))}
      </div>
    </div>
  );
}
