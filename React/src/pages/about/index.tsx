import React, { useEffect, useState } from 'react'
import { cardData, Data2 } from './data'
import Button from '../../components/buttons'
import Profile from '../../components/profile'
import images from '../../Types/images'
import Loading from '../../components/loading/Loading'
import CardLoader from '../../components/loading/CardLoader'

function About() {
    const [isLoading, setIsLoading] = useState(true)
    const [isCardLoading, setIsCardLoading] = useState(true)
    {/* Card loder time out */}
    useEffect(() =>{
         setTimeout(() =>{
            setIsCardLoading(false)
        },6000)
    },[])

    useEffect(() => {
        setTimeout(() =>{
            setIsLoading(false)
        },4000)
    },[])
  return (
    <div className='pt-10 px-5'>
        {isLoading
        ?
        <Loading/>
        :
        <>
        <div className='flex flex-col items-center mt-[2rem]'>
           <p className='text-2xl md:text-5xl font-bold pb-10'>Blog & Article</p>
           <p className='text-black/50 text-sm md:text-black/50 md:text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
           <div className=' flex items-center mt-10 '>
                <input type="text" placeholder='Search article, news or recipe...' className=' p-3 rounded-tl-lg rounded-bl-lg border border-black/50 md:p-5 md:rounded-tl-lg md:rounded-bl-lg border border-black/50 '/>
                <Button title='search' className='bg-black text-white p-[0.84rem] md:p-[1.3rem] rounded-tr-lg rounded-br-lg'/>
           </div>
        </div>
        <div className='flex flex-col gap-y-10 md:flex-row pt-10'>
            <div className=' flex-2 flex flex-col items-center gap-y-10'>
                {
                    cardData.map((data)=>(
                        <div className='flex flex-col gap-y-3 w-[90%] md:flex-row items-center'>
                            {isCardLoading?<CardLoader/>:
                            <>
                             <img src={data.image} alt={data.title} className='rounded-2xl w-[100%] md:rounded-2xl w-sm'/>
                            <div className='pl-none md:pl-5'>
                                <p className='text-2xl md:text-3xl font-medium'>{data.title}</p>
                                <p className='text-sm md:text-md'>{data.description}</p>
                                <div>
                                    <Profile profile={images.profile} userName='John Doe' className='flex items-center mt-3 gap-x-3'/>
                                </div>
                            </div>
                            </>}
                           
                        </div>
                    ))
                }            
            </div>
            <div className='flex flex-col gap-y-[1rem] md:flex-1 flex-col md:gap-y-[3rem]'>
                <p className='font-bold'>Tasty Recipes</p>
               {
                 Data2.map((data)=>(
                    <>
                    <div className='flex flex-row items-center'>
                        <img src={data.image} alt={data.title} className='rounded-lg w-[90px] md:rounded-2xl md:w-[120px]' />
                        <div className='pl-4 md:pl-5'>
                            <p className='text-sm md:text-lg font-medium'>{data.title}</p>
                            <p className='text-[9px] md:text-[11px]'>{data.description}</p>
                        </div>
                    </div>
                    </>
                 ))
               }
            </div>
        </div>
        </>
        }
    </div>
  )
}

export default About
