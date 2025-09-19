interface Props{
    items:CardInterface[]
    className?:string;
}

export interface CardInterface{
    image:any;
    title:string;
    color:string;
}

function FoodCard({items,className}:Props) {
  return (
   <div className="grid grid-cols-2 gap-4 md:flex items-center justify-center md:gap-x-5">
    {
        items.map((item, index)=>(
             <div key={index} className={`${item.color} ${className}`}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
            </div>
        ))
    }
   </div>
  )
}

export default FoodCard
