import Head from 'next/head'
import { useState } from 'react'
import CandidatoCreateForm from '@/components/CandidatoCreateForm'
import CandidatoUpdateForm from '@/components/CandidatoUpdateForm'
import CandidatoList from '@/components/CandidatoList'

export default function Home() {
  // 1 = criar, 2 = atualizar, 3 = listar
  const [aba, setAba] = useState(1)

  return (
    <>
      <Head>
        <title>Desafio Técnico - Grupo Panna</title>
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          Sistema RH - Grupo Panna
        </h1>

        {/* Menu simples */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setAba(1)}
            className={`px-4 py-2 rounded text-white font-semibold
              ${aba === 1 ? 'bg-blue-700' : 'bg-blue-500'}
              hover:bg-blue-700 transition-all`}
          >
            Cadastrar
          </button>

          <button
            onClick={() => setAba(2)}
            className={`px-4 py-2 rounded text-white font-semibold
              ${aba === 2 ? 'bg-orange-700' : 'bg-orange-500'}
              hover:bg-orange-700 transition-all`}
          >
            Atualizar (CPF)
          </button>

          <button
            onClick={() => setAba(3)}
            className={`px-4 py-2 rounded text-white font-semibold
              ${aba === 3 ? 'bg-green-700' : 'bg-green-500'}
              hover:bg-green-700 transition-all`}
          >
            Listar
          </button>
        </div>

        {/* Renderização condicional das abas */}
        {aba === 1 && <CandidatoCreateForm />}
        {aba === 2 && <CandidatoUpdateForm />}
        {aba === 3 && <CandidatoList />}
      </main>
    </>
  )
}
