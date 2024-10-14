'use client'
import React from "react";
import Image from "next/image";
export type BookCardProps = {
    id: number,
    titulo: string,
    ano: number,
    genero: string,
    img: string,
    isbn: string,
    disponibilidade: string,
    autor: string
}

type BookCardComponentProps = {
    books: BookCardProps[];
}
const BookCard = ({ books }: BookCardComponentProps) => {

    return (
        <>
            <div className="grid gap-4 m-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                    <div
                        className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 m-3 transform hover:-translate-y-1"
                        key={book.id}
                    >
                        <Image
                            className="align-center h-auto w-36 rounded-t-lg mb-4"
                            src={book.img}
                            alt={book.titulo}
                            width={150}
                            height={150}
                        />
                        <div className="flex flex-col items-start">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                {book.titulo}
                            </h2>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Autor:</span> {book.autor}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Ano Lançamento:</span>  {book.ano}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Gênero</span>  {book.genero}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ISBN:</span>  {book.isbn}</p>
                            <p
                                className={`text-sm font-medium mt-2 ${book.disponibilidade === 'Disponível'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}
                            >
                                {book.disponibilidade}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default BookCard;