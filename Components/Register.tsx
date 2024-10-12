import React from 'react'

const Register = () => {
  return (
    <div className=" bg-green-700 flex flex-col px-6 py-8 items-center  ">
      <div className='mt-5 w-full text-white bg-green-800 rounded
       border sm:max-w-md  border-green-500'>
      <div className='flex flex-col md:space-y-6 sm:p-8'>
        <h1 className='font-bold text-xl '>
      Registre-se
        </h1>
      <form  className=" space-y-4 md:space-y-6 "action="">
        <div>
          <label className='p-1 block' htmlFor="name">Nome</label>
          <input className="w-full border text-white  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 block rounded-lg"type="name" placeholder='Edivan Carvalho'></input>
        </div>
        <div className='flex flex-col'>
          <label className='p-1 block' htmlFor="address">Endereço</label>
          <div className='m-1 '>
          <input className=' px-2 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg '  type="text" placeholder='CEP'></input>
          <input className='mt-1  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg px-2' type="text" placeholder='Rua Tal'></input>
          <input className='mt-1  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 ml-1 px-2 w-24 rounded-lg' type="text" placeholder='Numero'></input>
          <input className=' mt-1  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg'type="text" placeholder='Bairo Tal'></input>
          <input className=' mt-1  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg'type="text" placeholder='Complemento'></input>
          </div>
          
        </div>
        <div>
          <label className='p-1 block' htmlFor="email">Email</label>
          <input className=" w-full border rounded-lg block  border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5" type="text" placeholder='emailexemplo@gmail.com'></input>
        </div>
        <div>
          <label className='p-1 block' htmlFor="password">Senha</label>
          <input className="w-full border block rounded-lg border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5" type="text" placeholder='******'></input>
        </div>
        <div>
          <label className='p-1 block' htmlFor="confirmpassword">Confirme a senha</label>
          <input className="w-full rounded-lg border block border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 " type="text" placeholder='******'></input>
        </div>
        <button className='rounded-lg border w-full bg-green-600  hover:bg-green-700 p-1'>Criar</button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default Register