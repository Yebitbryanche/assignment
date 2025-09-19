import Button from '../../components/buttons'
import images from '../../Types/images'
import { PiForkKnifeFill, PiTimerFill } from "react-icons/pi";
import Profile from '../../components/profile';
import { AiFillPlayCircle } from "react-icons/ai";
import FoodCard from '../../components/dishCard';
import { foodData } from '../../Types/foodData';
import Loading from '../../components/loading/Loading';
import { useEffect, useState } from 'react';

function Home() {
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() =>{
    setTimeout(() =>{
      setIsLoading(false)
    },4000)
  })

  return (<>
       {
        isLoading?
        <Loading/>:
        <div className='px-3 flex flex-col items-center pt-[2rem]'>
      <div className='flex flex-col-reverse w-[98%] md:flex-row items-ceneter w-full bg-background mt-[2rem] rounded-4xl'>
        <div className='px-3 md:pl-10 py-10 flex-1 flex flex-col items-start'>
           <Button className='flex flex-row-reverse rounded-full bg-white py-2 px-4' title='Hot Recipes' icon={<img src={images.scroll} alt=''/>}/>
           <h1 className='text-[32px] md:text-[64px] font-medium'>
            Spicy delicious chicken wings
           </h1>
           <p className='text-zinc-600 text-sm md:text-md'>
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim 
           </p>
           <div className='w-full flex justify-between mt-none gap-x-none md:w-[40%] items-center mt-10 gap-x-5'>
            <Button title='30 Minutes' icon={<PiTimerFill />} className='flex flex-row-reverse items-center bg-zinc-500/20 py-2 px-4 rounded-full gap-x-2'/>
            <Button title='Chicken' icon={<PiForkKnifeFill />} className='flex flex-row-reverse items-center bg-zinc-500/20 py-2 px-4 rounded-full gap-x-2'/>
           </div>
           <div className='flex pt-[2rem] w-full md:w-[70%] gap-x-10 pt-[8rem] items-center justify-between'>
            <Profile profile={images.profile} userName='John Doe'className='flex flex-row items-center gap-x-2'/>
            <Button title='View Recipes' icon={<AiFillPlayCircle />} className='flex p-2 md: items-center bg-black p-4 text-white rounded-lg'/>
           </div>
        </div>
        <div className='flex-1'>
          <img src={images.chicken} alt="" className=' rounded-br-none rounded-tr-4xl rounded-tl-4xl md:rounded-tl-none rounded-tr-4xl rounded-br-4xl h-full w-full' />
        </div>
      </div>

      {/*Categry section */}

      <div className='w-full mt-[5rem] md:mt-[10rem] w-full'>
        <div className='flex flex-col items-center justify-none  px-4 py-[2rem] md:flex md:flex-row justify-between px-4 py-[2rem]'>
          <h1 className='text-[30px] font-bold md:text-[48px] font-bold'>Categories</h1>
          <Button title='View All Categories' className='p-3 bg-background rounded-xl text-sm md:p-5 bg-background rounded-2xl text-md'/>
        </div>

        <div className='w-80%'>
          <FoodCard items={foodData} className='p-4 flex items-center flex-col gap-y-5 rounded-2xl mx-[0.5rem] md:p-4 md:items-center flex-col gap-y-5 rounded-2xl md:mx-[2rem]'/>
        </div>
      </div>
    </div>
       }
  </>
    
  )
}

export default Home
