 import { db } from "@/actions/firebase";
 import { collection, getDocs } from "firebase/firestore";

export const GetProducts =async () => {

    const productsCollection=collection(db,"products");
    const snapshot=await getDocs(productsCollection)
        return snapshot.docs.map((documetRef)=>{
            const id= documetRef.id;
            const productData={};
            productData.id=id;
            return productData
        })

}