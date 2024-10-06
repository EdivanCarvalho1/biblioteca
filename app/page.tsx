import BookCard from "@/components/BookCard";
import NavBar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <>
      <NavBar page="login" />
      <BookCard />
    </>
  );
}