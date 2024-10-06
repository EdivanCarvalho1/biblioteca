import { BookCardProps } from "@/components/BookCard";
import axios from "axios";



export const fetchBooks = async (): Promise<BookCardProps[]> => {
    try {
        const response = await axios.get("http://localhost:8080/livros/todos")

        const livros: BookCardProps[] = await response.data;

        return livros.map((livro) => ({
            id: livro.id, // Supondo que a estrutura de 'livro' tenha uma propriedade 'id'
            titulo: livro.titulo,
            ano: new Date(livro.ano).getFullYear(),
            genero: livro.genero,
            img: livro.img, // Assegure-se de que a propriedade correspondente existe
            isbn: livro.isbn,
            disponibilidade: livro.disponibilidade // Verifique se essa propriedade existe
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}
