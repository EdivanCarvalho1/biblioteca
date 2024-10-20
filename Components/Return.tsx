'use client';
import React from 'react';
import { useUserContext } from '@/utils/UserProvider';
import { useState, useEffect } from 'react';
import { fetchEmprestimos, returnBook } from '@/utils/api-call';

const Return = () => {
  const { token } = useUserContext();
  const [borrowings, setBorrowings] = useState<Object[]>([]);
  const [idEmprestimo, setIdEmprestimo] = useState<number | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [password, setPassword] = useState<string>('');

  const fetchAllBorrowings = async () => {
    if (token) {
      const response = await fetchEmprestimos(token);
      setBorrowings(response);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idEmprestimo === null || idUsuario === null) {
      return alert("Por favor, preencha todos os campos.");
    }
    try {
      const devolucao = {
        idEmprestimo: idEmprestimo,
        idUsuario: idUsuario,
      };
      if (token) {
        await returnBook(token, devolucao);
        alert("Livro devolvido com sucesso!");
        fetchAllBorrowings(); // Recarregar os empréstimos após a devolução
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao devolver o livro. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    fetchAllBorrowings();
  }, [token]);

  const handleBorrowingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIdEmprestimo = parseInt(e.target.value);
    const selectedBorrowing = borrowings.find(borrowing => borrowing.idEmprestimo === selectedIdEmprestimo);

    if (selectedBorrowing) {
      setIdEmprestimo(selectedIdEmprestimo);
      setIdUsuario(selectedBorrowing.usuario.id); // Define o ID do usuário automaticamente
    } else {
      setIdEmprestimo(null);
      setIdUsuario(null);
    }
  };

  return (
    <div className="bg-green-700 flex flex-col px-6 py-8 items-center h-screen">
      <div className="mt-5 w-full text-white bg-green-800 rounded border sm:max-w-md border-green-500">
        <div className="flex flex-col md:space-y-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-xl">Devolução</h1>
            <div>
              <label htmlFor="livro" className="block p-1">Nome do livro</label>
              <select
                className='rounded-lg w-full font-semibold text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                onChange={handleBorrowingChange}>
                <option value="">Selecione um livro</option>
                {
                  borrowings.map((borrowing) => (
                    <option value={borrowing.idEmprestimo} key={borrowing.idEmprestimo}>
                      {borrowing.livro.titulo} - {borrowing.usuario.nome}
                    </option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="usuario" className="block p-1">ID do usuário</label>
              <input
                className='rounded-lg w-full text-white border border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5'
                type="number"
                value={idUsuario || ''}
                readOnly
                placeholder="ID do Usuário" />
            </div>
        
            <button type='submit' className='hover:bg-green-600 bg-green-700 rounded-xl mt-2 w-full p-1'>
              Registrar Devolução
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Return;
