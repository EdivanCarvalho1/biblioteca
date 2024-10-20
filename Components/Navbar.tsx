'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/utils/UserProvider';
import SearchButton from './SearchBar';
import { BookCardProps } from './BookCard';
import { fetchUserInfo } from '@/utils/api-call';

type NavBarProps = {
  page: string;
  setBooks?: (books: BookCardProps[]) => void;
};

const NavBar = ({ page, setBooks }: NavBarProps) => {
  const path = usePathname();
  const { token } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{ nome: string | null } | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      if (token) {
        try {
          const userInfo = await fetchUserInfo(token);

         
          if (userInfo && userInfo.nome) {
            setUsuario({ nome: userInfo.nome });
          } else {
            console.error('Dados do usuário não encontrados', userInfo);
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário:', error);
        }
      }
      setLoading(false);
    };

    loadUserInfo();
  }, [token]);
  if (loading) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };


  return (
    <header className="text-white flex bg-green-800 py-3 px-3 justify-between">
      <nav className="flex text-4xl">
        <Image src="/assets/livroheader.svg" alt="livro" width={36} height={36} />
        <Link href="/">
          <button className="py-3 px-2 font-bold">Livraria</button>
        </Link>
      </nav>
        

      <nav className="flex">
        {path === '/' && setBooks && (
          <SearchButton setBooks={setBooks} />
        )}
        {token ? (
          <>
            <p className="m-3 p-2">{usuario?.nome}</p>
            <button onClick={handleLogout} className="m-3 p-2 hover:bg-white hover:text-green-800 hover:rounded-md">
              Logout
            </button>
          </>


        ) : (
          path === '/login' ? (
            <Link className="m-3 p-2  hover:bg-white hover:text-green-800 hover:rounded-md" href="/">
              Início
            </Link>
          ) : (
            <Link className="m-3 p-2 hover:bg-white hover:text-green-800 hover:rounded-md" href="/login">
              Login
            </Link>
          )
        )}

      </nav>
    </header>
  );
};

export default NavBar;
