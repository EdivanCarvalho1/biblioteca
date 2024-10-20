import { BookCardProps } from "@/components/BookCard";
import { UserProps } from "@/components/Register";
import axios from "axios";
import { AddressProps } from "@/components/Register";
import { jwtDecode } from "jwt-decode";
import { EmprestimoProps } from "@/components/Borrowing";
export type DecodedToken = {
    sub: string;
    role: string;
}

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
export const fetchAvailableBooks = async (token: string): Promise<BookCardProps[]> => {
    try {
        const response = await axios.get("http://localhost:8080/livros/available", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

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
                role: "admin",
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
        const response = await axios.post('http://localhost:8080/auth/login', {
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

export const fetchAdminInfo = async (token: string) => {
    if (token) {
        try {
            const response = await axios.get('http://localhost:8080/admin/info', {
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

export const fetchAllUsers = async (token: string) => {
    if (token) {
        try {
            const response = await axios.get('http://localhost:8080/user/list', {
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
export const saveEmprestimo = async (token: string, emprestimo: EmprestimoProps) => {
    if (token) {
        try {
            const response = await axios.post('http://localhost:8080/emprestimo/emprestar', emprestimo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return alert("Emprestimo realizado com sucesso!");
        } catch (error) {
            console.log(error)
        }
    }
}
export const decodeToken = (token: string) => {
    if (!token) return null;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export const fetchEmprestimos = async (token: string) => {
    if (token) {
        try {
            const response = await axios.get('http://localhost:8080/emprestimo/list', {
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

export const returnBook = async (token: string, devolucao: Object) => {
    if (token) {
        try {
            const response = await axios.post(`http://localhost:8080/emprestimo/devolver`, devolucao, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return alert("Livro devolvido com sucesso!");
        } catch (error) {
            console.log(error)
        }
    }
}