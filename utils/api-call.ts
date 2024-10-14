import { BookCardProps } from "@/components/BookCard";
import { UserProps } from "@/components/Register";
import axios from "axios";
import { AddressProps } from "@/components/Register";



export const fetchBooks = async (): Promise<BookCardProps[]> => {
    try {
        const response = await axios.get("http://localhost:8080/livros/list")

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
        if (title.trim() !== "") {
            response = await axios.get(`http://localhost:8080/livros/search?title=${title}`);
        } else {

            response = await axios.get("http://localhost:8080/livros/list");
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

export const createUser = async (user: UserProps, endereco: AddressProps) => {
    try {
        if (user != null && endereco != null) {
            const requestBody = {
                nome: user.nome,
                cpf: user.cpf,
                email: user.email,
                senha: user.senha.toString(),
                sexo: user.sexo,
                numEmprestimo: 0,
                role: "user",
                endereco: {
                    rua: endereco.rua,
                    cidade: endereco.cidade,
                    numero: endereco.numero,
                    bairro: endereco.bairro,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                }
            };

            const response = await axios.post("http://localhost:8080/user/registrar", requestBody);
            alert("Usuário criado com sucesso!");
            return response.data;
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    } catch (error) {
        console.error(error);
        alert("Insira um email válido!");
    }
};

export const createAdmin = async (user: UserProps, endereco: AddressProps) => {
    try {
        if (user != null && endereco != null) {
            const requestBody = {
                nome: user.nome,
                cpf: user.cpf,
                email: user.email,
                senha: user.senha.toString(),
                sexo: user.sexo,
                salario: 3000,
                role: user.role,
                endereco: {
                    rua: endereco.rua,
                    cidade: endereco.cidade,
                    numero: endereco.numero,
                    bairro: endereco.bairro,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                }
            };

            const response = await axios.post("http://localhost:8080/admin/registrar", requestBody);
            alert("Administrador criado com sucesso!");
            return response.data;
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    } catch (error) {
        console.error(error);
        alert("Insira um email válido!");
    }
};


export const loginUser = async (email: string, senha: string) => {
    try {
        const response = await axios.post('http://localhost:8080/user/login', {
            email,
            senha,
        });
        return response.data.token;
    } catch (error) {
        console.error('Erro ao fazer login', error);
        throw error;
    }
};

export const loginAdmin = async (email: string, senha: string) => {
    try {
        const response = await axios.post('http://localhost:8080/admin/login', {
            email,
            senha,
        });
        return response.data.token;
    } catch (error) {
        console.error('Erro ao fazer login', error);
        throw error;
    }
};

export const fetchUserInfo = async (token: string) => {
    if (token) {
        try {
            const response = await axios.get('http://localhost:8080/user/info', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
}