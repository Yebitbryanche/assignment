import React from 'react'
interface Props{
    profile:any;
    userName:string;
    className?:string;
}

function Profile({profile,userName, className}:Props) {
  return (
    
      <div className={className}>
        <img src={profile} alt="" />
        <div>
            <p>{userName}</p>
            <p className='text-sm text-black/50'>15 March 2022</p>
        </div>
      </div>
   
  )
}

export default Profile
