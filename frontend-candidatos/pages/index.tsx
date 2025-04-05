import Head from 'next/head'
import { useState } from 'react'
import CandidatoCreateForm from '@/components/CandidatoCreateForm'
import CandidatoUpdateForm from '@/components/CandidatoUpdateForm'
import CandidatoList from '@/components/CandidatoList'

export default function Home() {
  const [aba, setAba] = useState(1)

  return (
    <>
      <Head>
        <title>Sistema RH - Grupo Panna</title>
      </Head>

      <main
  className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/bg-rh.jpg')",
  }}
>
  <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl px-6 py-8">
    {/* Título */}
    <h1 className="text-3xl font-bold text-center text-white mb-6">
      Sistema RH
    </h1>

    {/* Menu interno */}
    <div className="flex justify-center gap-4 mb-10">
      <button
        onClick={() => setAba(1)}
        className={`px-5 py-2 rounded-md text-white font-semibold transition-all
          ${aba === 1 ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        Cadastrar
      </button>

      <button
        onClick={() => setAba(2)}
        className={`px-5 py-2 rounded-md text-white font-semibold transition-all
          ${aba === 2 ? 'bg-orange-700' : 'bg-orange-600 hover:bg-orange-700'}`}
      >
        Atualizar (CPF)
      </button>

      <button
        onClick={() => setAba(3)}
        className={`px-5 py-2 rounded-md text-white font-semibold transition-all
          ${aba === 3 ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'}`}
      >
        Listar
      </button>
    </div>

    {/* Área de conteúdo */}
    <div>
      {aba === 1 && <CandidatoCreateForm />}
      {aba === 2 && <CandidatoUpdateForm />}
      {aba === 3 && <CandidatoList />}
    </div>
  </div>
</main>
    </>
  )
}
