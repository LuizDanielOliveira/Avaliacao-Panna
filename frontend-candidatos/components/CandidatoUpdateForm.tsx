import { useState } from 'react'

interface FormData {
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: string
  qualificacoes: string
  curriculo: string
}

export default function CandidatoUpdateForm() {
  const [cpfBusca, setCpfBusca] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [form, setForm] = useState<FormData | null>(null)

  const handleBuscarCPF = async () => {
    if (!cpfBusca) {
      setErrorMsg('Informe um CPF')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const res = await fetch('http://localhost:3001/candidatos')
      const data = await res.json()
      const candidato = data.find((c: FormData) => c.cpf === cpfBusca)

      if (!candidato) throw new Error('CPF não encontrado.')

      setForm(candidato)
    } catch (error: any) {
      setErrorMsg(error.message || 'Erro ao buscar candidato.')
      setForm(null)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return
    setForm(prev => ({ ...(prev as FormData), [e.target.name]: e.target.value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !form) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...(prev as FormData), curriculo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const res = await fetch(`http://localhost:3001/candidatos/${form.cpf}`, {
        method: 'PUT', // ← ATUALIZA em vez de criar novo
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error(`Erro: ${res.status}`)

      setSuccessMsg('Atualizado com sucesso!')
    } catch (error: any) {
      setErrorMsg(error.message || 'Erro ao atualizar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Atualizar Candidato por CPF</h2>

      {errorMsg && <div className="bg-red-100 text-red-700 p-2 rounded">{errorMsg}</div>}
      {successMsg && <div className="bg-green-100 text-green-700 p-2 rounded">{successMsg}</div>}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="CPF"
          className="flex-1 border px-3 py-2 rounded"
          value={cpfBusca}
          onChange={e => setCpfBusca(e.target.value)}
        />
        <button
          onClick={handleBuscarCPF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {form && (
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input
            className="w-full border p-2 rounded"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded bg-gray-100"
            name="cpf"
            value={form.cpf}
            disabled
          />
          <input
            className="w-full border p-2 rounded"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />
          <textarea
            className="w-full border p-2 rounded"
            name="qualificacoes"
            rows={3}
            value={form.qualificacoes}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileUpload} />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Atualizando...' : 'Salvar'}
          </button>
        </form>
      )}
    </div>
  )
}
