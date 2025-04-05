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

export default function CandidatoForm() {
  const [form, setForm] = useState<FormData>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    qualificacoes: '',
    curriculo: '',
  })

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Lida com a mudança de texto nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Lida com o upload do arquivo, convertendo em Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, curriculo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  // Limpa o formulário
  const clearForm = () => {
    setForm({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      endereco: '',
      qualificacoes: '',
      curriculo: '',
    })
  }

  // Envia o formulário para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    // Validação mínima antes de enviar
    if (!form.nome || !form.cpf || !form.email) {
      setErrorMsg('Campos obrigatórios: Nome, CPF, Email')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:3001/candidatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error(`Erro ao enviar: status ${res.status}`)
      }

      // Convert response to JSON (se a API estiver retornando algo)
      const data = await res.json()
      setSuccessMsg('Cadastrado/atualizado com sucesso!')
      console.log('API Response:', data)

      // Limpa o form depois de sucesso
      clearForm()
    } catch (error: any) {
      console.error('Erro ao enviar:', error)
      setErrorMsg(error.message || 'Erro ao cadastrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded space-y-4"
    >
      <h2 className="text-xl font-bold">Cadastro de Candidato</h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-600 p-2 rounded">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 rounded">
          {successMsg}
        </div>
      )}

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="nome">Nome</label>
        <input
          className="border rounded px-3 py-2"
          type="text"
          name="nome"
          id="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex: João da Silva"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="cpf">CPF</label>
        <input
          className="border rounded px-3 py-2"
          type="text"
          name="cpf"
          id="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="Ex: 12345678900 (somente números)"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="email">Email</label>
        <input
          className="border rounded px-3 py-2"
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemplo@email.com"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="telefone">Telefone</label>
        <input
          className="border rounded px-3 py-2"
          type="text"
          name="telefone"
          id="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Ex: (11) 99999-9999"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="endereco">Endereço</label>
        <input
          className="border rounded px-3 py-2"
          type="text"
          name="endereco"
          id="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Ex: Rua ABC, 123"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="qualificacoes">
          Qualificações
        </label>
        <textarea
          className="border rounded px-3 py-2"
          name="qualificacoes"
          id="qualificacoes"
          rows={3}
          value={form.qualificacoes}
          onChange={handleChange}
          placeholder="Ex: Curso X, experiência Y..."
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1" htmlFor="curriculo">Currículo</label>
        <input
          className="border rounded px-3 py-2"
          type="file"
          id="curriculo"
          onChange={handleFileUpload}
        />
        {form.curriculo && (
          <p className="text-sm text-blue-600 mt-1">Arquivo anexado em Base64</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
