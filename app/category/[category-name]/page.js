import ByCategory from '@/components/ByCategory';
import SubCategory from '@/components/SubCategory';
import React from 'react'
import { categoriesMap } from '@/services/categoriesMap';

export default async function CategoryPage({params}) {
  
  const { 'category-name': categoryName } = await params;  
  
  let selectedCategory=categoriesMap.find((category)=>category.name.toLowerCase() === categoryName.toLowerCase());

  
  return (
    <div className='flex  flex-col min-h-screen align-middle text-center'>
      <h2 className='text-amber-800 mt-20 text-5xl h-20'>{categoryName}</h2>
      <SubCategory SubCategory={selectedCategory.SubCategory}/>
    </div>
  )
}

