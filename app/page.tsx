'use client'

import BookCard from "@/components/BookCard";
import NavBar from "@/components/Navbar";
import React from "react";
import { useState } from "react";
import { BookCardProps } from "@/components/BookCard";
import { useEffect } from "react";
import { fetchBooks } from "@/utils/api-call";
import { UserProvider, useUserContext } from "@/utils/UserProvider";


export default function Home() {
  const { token } = useUserContext();
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
      <p>{token}</p>
      <NavBar page="/login" setBooks={setBooks} />
      <BookCard books={books} />
    </>
  );
}
