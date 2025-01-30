export const generateStars = (rating) => {
    let finalRating=0;
    if(!rating){ //simulamos puntaje de rating si este = "null"
        finalRating=(Math.random()*(5-3)+3).toFixed(1);
    }else{
        finalRating=rating;
    }
  
    const fullStars = Math.floor(finalRating);
    const emptyStars = 5 - fullStars;
    return (
      <span className="text-gold text-xl">
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };
  
/* Simulamos precio en caso de que no exista */
  export const generatePrice=(price)=>{
    let finalPrice=0;
    if(price==0 || !price){
        finalPrice=Math.random()*(50-10)+10;
    }else{
        finalPrice=price;
    }
    return Math.floor(finalPrice);
  };