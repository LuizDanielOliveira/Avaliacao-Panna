import { useEffect, useState } from 'react'

interface Candidato {
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: string
  qualificacoes: string
  curriculo?: string
}

export default function CandidatoList() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const res = await fetch('http://localhost:3001/candidatos')
        const data = await res.json()
        setCandidatos(data)
      } catch (err: any) {
        setErrorMsg(err.message || 'Erro ao buscar candidatos.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDownload = (base64: string, nome: string) => {
    const link = document.createElement('a')
    link.href = base64
    link.download = `${nome}-curriculo.pdf`
    link.click()
  }

  if (loading) {
    return <p className="text-center text-gray-300">Carregando...</p>
  }

  if (errorMsg) {
    return <p className="text-center text-red-400">{errorMsg}</p>
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl px-6 py-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-cyan-300 text-center mb-6">
        Lista de Candidatos
      </h1>

      {candidatos.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum candidato cadastrado.</p>
      ) : (
        <ul className="space-y-6">
          {candidatos.map((c, i) => (
            <li
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 transition-all"
            >
              <p className="mb-1"><span className="font-semibold text-cyan-300">Nome:</span> {c.nome}</p>
              <p className="mb-1"><span className="font-semibold text-cyan-300">CPF:</span> {c.cpf}</p>
              <p className="mb-1"><span className="font-semibold text-cyan-300">Email:</span> {c.email}</p>
              <p className="mb-1"><span className="font-semibold text-cyan-300">Telefone:</span> {c.telefone}</p>
              <p className="mb-1"><span className="font-semibold text-cyan-300">Endereço:</span> {c.endereco}</p>
              <p className="mb-2"><span className="font-semibold text-cyan-300">Qualificações:</span> {c.qualificacoes}</p>

              {c.curriculo && (
                <button
                  onClick={() => handleDownload(c.curriculo!, c.nome)}
                  className="text-sm text-blue-400 hover:text-blue-300 underline mt-2"
                >
                  📎 Baixar Currículo (Base64)
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
