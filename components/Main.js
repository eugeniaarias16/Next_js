import React from 'react';
import ByCategory from './ByCategory';
import SliderCards from './SliderCards';
import { mainApiCalls } from 'services/mainApiCalls';
export default async function Main() {
    const { Top20RatedProducts, TopLipstick, TopMascaras } = await mainApiCalls();

    return (
        <div className='min-h-screen w-full p-2.5 flex flex-col align-middle items-center'>
            <ByCategory/>
            <SliderCards products={Top20RatedProducts} title="Top Rated Products"/>
            <SliderCards products={TopMascaras} title="Your Next Mascara"/>
            <SliderCards products={TopLipstick} title="Top Lipsticks"/>
        </div>
    );
} 