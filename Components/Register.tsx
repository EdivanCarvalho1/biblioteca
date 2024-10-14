"use client";
import React, { useState, useEffect } from 'react';
import { createUser } from '@/utils/api-call';
import { useRouter } from 'next/navigation';
import { createAdmin } from '@/utils/api-call';

export type UserProps = {
  nome: string;
  cpf: string;
  email: string;
  senha: number;
  sexo: string;
  role: string;
};

export type AddressProps = {
  cidade: string;
  rua: string;
  numero: number;
  bairro: string;
  complemento: string;
  cep: string;
};

const Register = () => {
  const codigoBibliotecario = "123456789"

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [sexo, setSexo] = useState("");

  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState(0);
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [codigo, setCodigo] = useState("")

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      nome,
      cpf,
      email,
      senha: password,
      sexo,
      role: codigo === codigoBibliotecario ? "admin" : "user",
    };

    const endereco = {
      cidade,
      rua,
      numero,
      bairro,
      complemento,
      cep,
    };

    if (codigo === codigoBibliotecario) {
      await createAdmin(user, endereco);
    } else {
      await createUser(user, endereco);
    }
  };
  if (!isMounted) return null;

  return (
    <div className="bg-green-700 flex flex-col px-6 py-8 items-center">
      <div className="mt-5 w-full text-white bg-green-800 rounded border sm:max-w-md border-green-500">
        <div className="flex flex-col md:space-y-6 sm:p-8">
          <form onSubmit={handleSubmit} action="">
            <h1 className="font-bold text-xl">Registre-se</h1>
            <div>
              <div>
                <label className="p-1 block" htmlFor="name">Nome</label>
                <input
                  className="w-full border text-white border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 block rounded-lg"
                  type="text"
                  placeholder="Seu Nome"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="p-1 block" htmlFor="cpf">CPF</label>
                <input
                  className="w-full border block rounded-lg border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5"
                  type="text"
                  placeholder="CPF"
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="p-1 block" htmlFor="email">Email</label>
                <input
                  className="w-full border rounded-lg block border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5"
                  type="email"
                  placeholder="emailexemplo@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="p-1 block" htmlFor="genero">Gênero</label>
                <select
                  id="genero"
                  className="bg-green-600 text-white border border-green-500 rounded-lg p-2 w-full cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  onChange={(e) => setSexo(e.target.value)}
                  required
                >
                  <option value="" className="bg-green-600 text-white">Selecione seu gênero</option>
                  <option value="Masculino" className="bg-green-600 text-white">Masculino</option>
                  <option value="Feminino" className="bg-green-600 text-white">Feminino</option>
                  <option value="Não-Binário" className="bg-green-600 text-white">Não-binário</option>
                  <option value="Gênero-Fluido" className="bg-green-600 text-white">Gênero fluido</option>
                  <option value="Transgênero" className="bg-green-600 text-white">Transgênero</option>
                  <option value="Outro" className="bg-green-600 text-white">Outro</option>
                  <option value="Prefiro Não Dizer" className="bg-green-600 text-white">Prefiro não dizer</option>
                </select>
              </div>
              <div>
                <label className="p-1 block" htmlFor="password">Senha</label>
                <input
                  className="w-full border block rounded-lg border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5"
                  type="password"
                  placeholder="Senha"
                  onChange={(e) => setPassword(Number(e.target.value))}
                  required
                />
              </div>
              <label className="p-1 block" htmlFor="">É Bibliotecário?</label>
              <input
                className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg w-full"
                type="text"
                placeholder="Código Bibliotecário"
                onChange={(e) => setCodigo(e.target.value)}
              />
              <div className="flex flex-col">
                <label className="p-1 block" htmlFor="address">Endereço</label>
                <div className="m-1">
                  <input
                    className="px-2 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg w-full"
                    type="text"
                    placeholder="CEP"
                    onChange={(e) => setCep(e.target.value)}
                    required
                  />
                  <input
                    className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg px-2 w-full"
                    type="text"
                    placeholder="Cidade"
                    onChange={(e) => setCidade(e.target.value)}
                    required
                  />
                  <input
                    className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg px-2 w-72"
                    type="text"
                    placeholder="Rua"
                    onChange={(e) => setRua(e.target.value)}
                    required
                  />
                  <input
                    className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 ml-1 px-2 w-20 rounded-lg"
                    type="text"
                    placeholder="Número"
                    onChange={(e) => setNumero(Number(e.target.value))}
                    required
                  />
                  <input
                    className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg w-full"
                    type="text"
                    placeholder="Bairro"
                    onChange={(e) => setBairro(e.target.value)}
                    required
                  />
                  <input
                    className="mt-1 border-green-500 bg-green-600 placeholder:text-slate-200 placeholder:p-1 p-1.5 rounded-lg w-full"
                    type="text"
                    placeholder="Complemento"
                    onChange={(e) => setComplemento(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type='submit' className="rounded-lg border w-full bg-green-600 hover:bg-green-700 p-1 mt-3">Criar</button>

            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Register;
