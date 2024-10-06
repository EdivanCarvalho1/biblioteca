import { BookCardProps } from "@/components/BookCard";
import axios from "axios";



export const fetchBooks = async (): Promise<BookCardProps[]> => {
    try {
        const response = await axios.get("http://localhost:8080/livros")

        const livros: BookCardProps[] = await response.data;

        return livros.map((livro) => ({
            id: livro.id,
            titulo: livro.titulo,
            ano: new Date(livro.ano).getFullYear(),
            genero: livro.genero,
            img: livro.img,
            autor: livro.autor.nome,
            isbn: livro.isbn,
            disponibilidade: livro.disponibilidade
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchBooksByTitle = async (title: string): Promise<BookCardProps[]> => {
    try {
        let response;

        // Verifica se o título está vazio
        if (title.trim() !== "") {
            response = await axios.get(`http://localhost:8080/search?title=${title}`);
        } else {

            response = await axios.get("http://localhost:8080/livros");
        }

        const livros: BookCardProps[] = response.data;

        return livros.map((livro) => ({
            id: livro.id,
            titulo: livro.titulo,
            ano: new Date(livro.ano).getFullYear(),
            genero: livro.genero,
            img: livro.img,
            autor: livro.autor.nome,
            isbn: livro.isbn,
            disponibilidade: livro.disponibilidade
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}