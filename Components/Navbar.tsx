'use client'

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { BookCardProps } from "./BookCard";
import { usePathname } from 'next/navigation';
import SearchButton from './SearchBar';

type NavBarProps = {
  page: string;
  setBooks: (books: BookCardProps[]) => void;
};

const NavBar = ({ page, setBooks }: NavBarProps) => {

  const path = usePathname();

  return (
    <header className="text-white flex bg-green-800 py-3 px-3 justify-between">
      <nav className="flex text-4xl">
        <Image
          src="/assets/livroheader.svg"
          alt="livro"
          width={36}
          height={36}
        />
        <Link href="/">
          <button className="py-3 px-2 font-bold">Livraria</button>
        </Link>
      </nav>

      <nav className="flex">

        {
          path === '/' && (
            <SearchButton setBooks={setBooks} />

          )
        }

        {page !== "" ? (
          <Link className="m-3 p-2 hover:bg-white hover:text-green-800 hover:rounded-md" href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()}
          </Link>
        ) : (
          <Link className="m-3 p-1" href="/">
            Início
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;