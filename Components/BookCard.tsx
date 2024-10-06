'use client'
import React, { useEffect, useState } from "react";
import { fetchBooks } from "@/utils/api-call";

export type BookCardProps = {
    id: number,
    titulo: string,
    ano: number,
    genero: string,
    img: string,
    isbn: string,
    disponibilidade: string
}

const BookCard = () => {

    const [books, setBooks] = useState<BookCardProps[]>([]);

    const loadBooks = async () => {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <>
            <div className="flex m-3 flex-wrap">
                {books.map(book => (
                    <div className="p-3 bg-slate-100 shadow-sm shadow-neutral-400 m-3" key={book.id}>
                        <h2>{book.titulo}</h2>
                        <p>Ano: {book.ano}</p>
                        <p>Gênero: {book.genero}</p>
                        <img src={book.img} alt={book.titulo} />
                        <p>ISBN: {book.isbn}</p>
                        <p>Disponibilidade: {book.disponibilidade}</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default BookCard;