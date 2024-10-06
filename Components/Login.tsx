import React from 'react'
import Image from 'next/image'
const Login = () => {
  return (
   
    <div className=" bg-green-700 flex flex-col px-6 py-8 
    items-center justify-top h-screen ">
      <Image src="\assets\livroheader.svg"
      width={50} 
      height={50}
      alt={''} />
      
      <div className="w-full bg-green-800 rounded-lg 
      shadow border sm:max-w-md  border-green-500 ">
        <div className='p-3 md:space-y-6 sm:p-8'>
          <h1 className="font-bold text-black">
          Login
          </h1>
          <form className='flex flex-col'>
            <div>
              <label htmlFor="email" className="flex"
              >Email</label>
              <input type="text" className='rounded-lg ' placeholder='emailexemplos@gmial.com'/>
            </div>

            <div>
              <label htmlFor="password">
                Senha
              </label>
            </div>
          </form>
        </div>
      </div>
      
      </div>
      
  )
}

export default Login