import React from 'react'

export default function SubCatLayout({children}) {
  
  
  
  
  return (
    <div className="grid grid-cols-4 pt-10 min-h-screen mt-12">
      
      {/* Barra de filtos */}
      <aside className="col-start-1 col-end-2  border-r-2 bg-ligth-brown/20 h-[700px]">
        <section className="w-full p-2.5 flex flex-col flex-wrap mt-20">
          <h3 className='w-full text-center text-3xl '>Filters </h3>
        </section>
      </aside>

      {/* Contendio principal */}
    <main className="col-start-2 col-end-5 p-6 overflow-auto">
          {children}
    </main>

    </div>
)
}
