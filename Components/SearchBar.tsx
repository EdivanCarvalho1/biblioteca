'use client'
import React from "react";
import { useState } from "react";
import { BookCardProps } from "./BookCard";
import { fetchBooksByTitle } from "@/utils/api-call";

type SearchButtonProps = {
    setBooks: (books: BookCardProps[]) => void;
}
const SearchButton = ({ setBooks }: SearchButtonProps) => {

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim() === "") {
            const allBooks = await fetchBooksByTitle("");
            setBooks(allBooks)
        } else {
            const result = await fetchBooksByTitle(searchTerm);
            setBooks(result)
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex">
            <input
                className="rounded-lg m-4 p-1 text-black"
                type="text"
                placeholder="Nome do Livro"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button
                type="submit"
                className="text-white rounded-lg m-3 p-2  hover:bg-white hover:text-green-800"
            >
                Buscar
            </button>
        </form>
    )
}

export default SearchButton;