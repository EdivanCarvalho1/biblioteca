'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { decodeToken, loginUser } from '@/utils/api-call';
import { useUserContext } from '@/utils/UserProvider';

const Login = () => {
  const { setToken, setRole } = useUserContext();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = await loginUser(email, senha);
      const decodedToken = decodeToken(token);
      localStorage.setItem('token', token);
      if (decodedToken) {
        setRole(decodedToken.role);
      }
      setToken(token);
    } catch (err) {
      setError('Credenciais inválidas');
      console.error(err);
    }
  };

  return (
    <div className="bg-green-700 flex flex-col px-6 py-8 items-center justify-top h-screen">
      <Image src="/assets/livroheader.svg" width={50} height={50} alt={''} />

      <div className="mt-5 w-full text-white bg-green-800 rounded-lg xl:p-0 shadow border sm:max-w-md border-green-500">
        <div className='flex flex-col md:space-y-6 sm:p-8'>
          <h1 className="font-bold text-xl md:text-2xl">Login</h1>
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block p-1">Email</label>
              <input
                type="email"
                className='rounded-lg w-full text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                placeholder='exemplo@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className='block p-1'>Senha</label>
              <input
                type="password"
                className="rounded-lg border font-semibold border-green-500 text-white bg-green-600 placeholder:p-1 w-full p-1.5"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>


            {error && <p className='text-red-500'>{error}</p>}

            <button type='submit' className='hover:bg-green-600 bg-green-700 rounded-xl w-full p-1'>
              Entrar
            </button>

            <p className='text-sm font-light text-green-200 flex'>Ainda não possui uma conta?
              <a href="/register" className='ml-1 underline'>Crie aqui</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
