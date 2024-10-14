import React from 'react'

const Return = () => {
  return (
    <div className="bg-green-700 flex flex-col px-6 py-8 items-center h-screen">
      <div className="mt-5 w-full text-white bg-green-800 rounded border sm:max-w-md border-green-500">
        <div className="flex flex-col md:space-y-6 sm:p-8">
          <form  action="">
            <h1 className="font-bold text-xl">Devolução</h1>
            <div>
                <label htmlFor="" className="block p-1">Nome do livro</label>
                <select
              className='rounded-lg w-full font-semibold text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'>
                <option value="" hidden></option>
              </select>
            </div>
            <div>
                <label htmlFor="" className="block p-1">Nome do usuário</label>
                <input
                className='rounded-lg w-full text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                 type="text" ></input>
            </div>
            <button type='submit' className='hover:bg-green-600 bg-green-700 rounded-xl mt-2 w-full p-1'>
              Registrar Devolução
            </button>
            </form>
            </div>
            </div>
            </div>
  )
}

export default Return