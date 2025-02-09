import { db } from "@/firebase"
import { collection, getDocs, where, query, addDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const categoria = searchParams.get("categoria")
    const brands = searchParams.get("brands")?.split(",") || []
    const tags = searchParams.get("tags")?.split(",") || []

    const productsCollection = collection(db, "products")

    try {
        let filtros = []

        if (categoria) filtros.push(where("category", "==", categoria))
        if (brands.length > 0) filtros.push(where("brand", "in", brands))
        
        const queryFilters = query(productsCollection, ...filtros)
        const snapshot = await getDocs(filtros.length > 0 ? queryFilters : productsCollection)

        let productosFinales = snapshot.docs.map((documentRef) => {
            const id = documentRef.id
            const productoData = documentRef.data()
            productoData.id = id
            return productoData
        })

        // Filtrar por tags (Firestore no permite "where array contains múltiples valores")
        if (tags.length > 0) {
            productosFinales = productosFinales.filter(product =>
                tags.every(tag => product.tag_list.includes(tag))
            )
        }

        return NextResponse.json({
            message: "Productos obtenidos con éxito",
            error: false,
            payload: productosFinales
        })

    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los productos",
            error: true,
            payload: null
        })
    }
}


export async function POST(req) {

    const producto = await req.json()

    try {

        const productsCollection = collection(db, "products")
        await addDoc(productsCollection, { ...producto })

        return NextResponse.json({
            message: "Producto creado con exito",
            error: false,
            payload: null
        })

    } catch (error) {

        return NextResponse.json({
            message: "Error al crear el producto",
            error: true,
            payload: null
        })
    }
}