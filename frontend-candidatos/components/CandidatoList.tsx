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

  if (loading) return <p className="text-center text-gray-500">Carregando...</p>
  if (errorMsg) return <p className="text-red-600 text-center">{errorMsg}</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Candidatos</h1>
      {candidatos.length === 0 ? (
        <p>Nenhum candidato cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {candidatos.map((c, i) => (
            <li key={i} className="p-4 bg-white rounded shadow">
              <p><strong>Nome:</strong> {c.nome}</p>
              <p><strong>CPF:</strong> {c.cpf}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Telefone:</strong> {c.telefone}</p>
              <p><strong>Endereço:</strong> {c.endereco}</p>
              <p><strong>Qualificações:</strong> {c.qualificacoes}</p>
              {c.curriculo && (
                <button
                  onClick={() => handleDownload(c.curriculo!, c.nome)}
                  className="mt-2 text-blue-600 underline"
                >
                  📎 Anexo Base64
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
