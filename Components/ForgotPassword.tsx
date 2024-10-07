import Link from 'next/link';
import React from 'react'

const ForgotPassword = () => {
  return (
    <div className='bg-green-700 flex flex-col px-6 py-8 items-center justify-center h-screen'>
        <div className=" mt-5 w-full text-white bg-green-800 rounded-lg xl:p-0
      shadow border sm:max-w-md  border-green-500   ">
        <div className='flex flex-col md:space-y-6 sm:p-8 '> 
          <h1 className="font-bold  text-xl md:text-2xl">
          Reuperar Conta
          </h1>
          <form action="">
            <div>
                <label htmlFor="email" className="block p-1">Email</label>
                <input type="text" className='rounded-lg w-full text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5' placeholder='exemplo@gmail.com'></input>
            </div>
            <Link href="/recoveraccount">
            <button type='submit' className='hover:bg-green-600 mt-2 bg-green-700 rounded-xl w-full p-1'>
              Entrar
            </button>
            </Link>
            
          </form>
          </div>
        </div>
      </div>
      
  )
}

export default ForgotPassword;