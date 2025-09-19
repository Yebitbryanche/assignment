import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import images from '../../Types/images';
import { useState } from 'react';
import { FaX } from 'react-icons/fa6';


interface Props{
    items:NavProps[];
}

export interface NavProps{
    title:string;
    path:string;
}

function Navbar({items}:Props) {
    const [toggleNav,setToggleNav] = useState(false)
    const handleMenuToggle = ()=>{
        setToggleNav(!toggleNav)
    }
    const location= useLocation()
    const currentPage = location.pathname
  return (
    <>
      <nav className='flex items-center justify-between px-3 py-4 fixed w-full bg-white'>
        <img className='w-[90px] md:w-[140px]' src={images.logo} alt="logo" />
        <div className='hidden md:flex items-center gap-x-20'>
            <ul className={((currentPage == "/") || (currentPage ==="/signin") ) ? "hidden":'block flex items-center gap-x-7'}>
                {
                    items.map((item)=>(
                        <li key={item.path}>
                            <Link to={item.path} className={currentPage === item.path?"text-active font-medium":"hover:text-active hover:ease-in duration-200"}>{item.title}</Link>
                        </li>
                        
                    ))
                }
            </ul>
            <div className='flex items-center gap-x-5'>
                <Link to={"/"}> Signup </Link>
                <Link to={"/signin"}>Sigin</Link>
                <FaFacebookF className='hover:text-active hover:ease-in duration-200'/>
                <FaTwitter className='hover:text-active hover:ease-in duration-200'/>
                <FaInstagram className='hover:text-active hover:ease-in duration-200'/>
            </div>
        </div>
        {toggleNav?<FaX className=' z-20 text-white fixed right-2 md:hidden' onClick={handleMenuToggle}/>:<FiMenu onClick={handleMenuToggle} className='md:hidden'/>}
        {
            toggleNav &&  <div className='w-full bg-zinc-800/70 flex flex-col items-center fixed top-0 left-0 p-3 gap-y-5 md:hidden'>
                                <ul className='flex flex-col items-center gap-y-4 mt-4'>
                                    {
                                        items.map((item)=>(
                                            <li key={item.path}>
                                                <Link to={item.path}  className='text-white hover:text-active text-md'>{item.title}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className='flex items-center gap-x-5'>
                                    <FaFacebookF className='text-active'/>
                                    <FaTwitter className='text-active'/>
                                    <FaInstagram className='text-active'/>
                                </div>
                           </div>
        }
      </nav>
    </>
  )
}

export default Navbar
