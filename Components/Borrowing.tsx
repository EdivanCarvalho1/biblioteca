"use client";
import React, { useEffect, useState } from 'react';
import { BookCardProps } from './BookCard';
import { fetchAllUsers, fetchAvailableBooks, fetchAdminInfo } from '@/utils/api-call';
import { useUserContext } from '@/utils/UserProvider';
import { UserProps } from './Register';
import { saveEmprestimo } from '@/utils/api-call';

export type EmprestimoProps = {
  idLivro: number;
  idUsuario: number;
  idBibliotecario: number;
}
const Borrowing = () => {
  const { token } = useUserContext();
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [idLivro, setIdLivro] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const fetchAllBooks = async () => {
    if (token) {
      const fetchedBooks = await fetchAvailableBooks(token);
      setBooks(fetchedBooks || []);
      const fetchedUsers = await fetchAllUsers(token);
      setUsers(fetchedUsers || []);
    }
  };

  const fetchAdmin = async (token: string) => {
    if (token) {
      try {
        const response = await fetchAdminInfo(token);
        setAdminId(response ? response.id : null);
      } catch (error) {
        console.log(error);
        setAdminId(null);
      }
    }
  };

  useEffect(() => {
    fetchAllBooks();
    fetchAdmin(token!);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const emprestimo = {
        idLivro: Number(idLivro),
        idUsuario: Number(idUsuario),
        idBibliotecario: Number(adminId),
        senha: userPassword
      };

      if (token !== null) {
        const result = await saveEmprestimo(token, emprestimo);
      } else {
        console.log("Token is null");
      }

    } catch (error) {
      console.log(error)
    }



  };



  return (
    <div className="bg-green-700 flex flex-col px-6 py-8 items-center h-screen">
      <div className="mt-5 w-full text-white bg-green-800 rounded border sm:max-w-md border-green-500 ">
        <div className="flex flex-col md:space-y-6 sm:p-8 ">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-xl">Empréstimo</h1>
            <div className='pt-3'>
              <label htmlFor="">Nome do Livro</label>
              <select
                className='rounded-lg w-full font-semibold text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}>
                <option defaultValue={""} className='hidden'>Livro</option>
                {
                  books.map((book) => (
                    <option value={book.id} key={book.id}>{book.titulo}</option>
                  ))
                }
              </select>
            </div>
            <div className='pt-3'>
              <label htmlFor="">Usuário</label>
              <select
                className="rounded-lg border font-semibold border-green-500 text-white bg-green-600 placeholder:p-1 w-full p-1.5"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}>
                <option defaultValue={""} className='hidden'>Usuário</option>
                {
                  users.map((user) => (
                    <option value={user.id} key={user.id}>{user.nome}</option>
                  ))
                }
              </select>
              <div>
                <label htmlFor="email" className="block p-1">Email</label>
                <input
                  type="password"
                  className='rounded-lg w-full text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                  placeholder='Sua Senha'
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='pt-3'>
              <button type='submit' className='hover:bg-green-600 bg-green-700 rounded-xl w-full p-1'>
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Borrowing;