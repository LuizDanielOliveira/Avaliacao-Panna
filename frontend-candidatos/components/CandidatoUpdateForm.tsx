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
        method: 'PUT',
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
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl px-6 py-8 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold text-cyan-300 text-center mb-6">
        Atualizar Candidato por CPF
      </h2>

      {errorMsg && (
        <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded text-sm text-center mb-4">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded text-sm text-center mb-4">
          {successMsg}
        </div>
      )}

      {/* Campo para buscar CPF */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Digite o CPF para buscar"
          className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={cpfBusca}
          onChange={e => setCpfBusca(e.target.value)}
        />
        <button
          onClick={handleBuscarCPF}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition-all"
        >
          Buscar
        </button>
      </div>

      {/* Formulário preenchido */}
      {form && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
            name="cpf"
            value={form.cpf}
            disabled
          />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          <input
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            placeholder="Endereço"
          />
          <textarea
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 placeholder:text-gray-400 text-white"
            name="qualificacoes"
            rows={3}
            value={form.qualificacoes}
            onChange={handleChange}
            placeholder="Qualificações"
          />

          <div className="pt-2">
            <label className="text-sm text-gray-300 font-medium block mb-1">
              Currículo (PDF, DOC, etc.)
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="text-blue-400 file:text-white file:bg-blue-700 file:rounded file:px-4 file:py-1 file:cursor-pointer file:border-0"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'Atualizando...' : 'Salvar Alterações'}
          </button>
        </form>
      )}
    </div>
  )
}
