import React from 'react';
import { type NavProps } from '../nav';
import images from '../../Types/images';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

interface Props{
    items:NavProps[];
}

function Footer({items}:Props) {
  return (
    <div className='flex flex-col px-5 pt-[4rem] pb-[0.4rem]'>
      <div className='flex flex-col md:justify-between md:flex-row items-center py-[2rem]'>
        <div className='flex flex-col items-center md:items-start gap-y-7'>
            <img src={images.logo} alt="logo"  className='w-[20%]'/>
            <p className='text-black/50 text-sm'>Lorem ipsum dolor sit amet, consectetuipisicing elit, </p>
        </div>
        <div className='flex flex-col md:flex-row gap-x-5 items-center'>
            {
                items.map((item)=>(
                    <li key={item.path} className='list-none'>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                ))
            }
        </div>
      </div>
      <hr className='broder border-black/50 border-1'/>
      <div className='flex items-center justify-between py-[2rem]'>
       <div className='flex flex-1 justify-end'>
         <p className=' flex text-[10px]'>© 2020 Flowbase. Powered by <span className='text-active pl-1'> Webflow</span></p>
       </div>
        <div className='flex flex-1 justify-end gap-x-3'>
            <FaFacebook/>
            <FaTwitter/>
            <FaInstagram/>
        </div>
      </div>
    </div>
  );
}

export default Footer;
