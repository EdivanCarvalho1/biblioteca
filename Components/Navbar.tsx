import React from "react";
import Image from "next/image";
import Link from "next/link";

type NavBarProps = {
  page: string
}

const NavBar = ({ page }: NavBarProps) => {
  return (
    <header className="text-white flex bg-green-800 py-3 px-3 justify-between">
      <nav className="flex text-4xl">
        <Image
          src="/assets/livroheader.svg"
          alt="livro"
          width={36}
          height={36}
        />
        <h1 className="py-2 px-2 font-bold">
          Livraria
        </h1>
      </nav>
      <nav className="flex">
        <h1 className="m-3 p-1">Buscar</h1>
        <input className="rounded-lg m-3 p-1 text-black" type="text" placeholder="Nome do Livro"></input>
          {
            page !== "" ? (
              <Link className='m-3 p-1' href={"/" + page}>
                {page.charAt(0).toUpperCase() + page.slice(1).toLowerCase()}
              </Link>
          ) : (
              <Link className="m-3 p-1" href="/">Início</Link>
            )
          }
      </nav>
    </header>
  );
};

export default NavBar;