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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, curriculo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

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

      await res.json()
      setSuccessMsg('Cadastrado com sucesso!')
      clearForm()
    } catch (error: any) {
      setErrorMsg(error.message || 'Erro ao cadastrar.')
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <div className="flex justify-center px-4 pt-6 pb-16">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-3xl font-bold text-cyan-300 text-center mb-2">
          Cadastro de Candidato
        </h2>
        <p className="text-sm text-gray-300 text-center mb-8">
          Preencha todos os dados abaixo para cadastrar um novo candidato.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nome completo" name="nome" value={form.nome} onChange={handleChange} />
          <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />
          <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} className="md:col-span-2" />
          <Textarea label="Qualificações" name="qualificacoes" value={form.qualificacoes} onChange={handleChange} />
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-300 font-medium block mb-1">
            Currículo (PDF DOC, etc.)
          </label>
          <input
            type="file"
            id="curriculo"
            onChange={handleFileUpload}
            className="text-blue-400 file:text-white file:bg-blue-700 file:rounded file:px-4 file:py-1 file:cursor-pointer file:border-0"
          />
          {form.curriculo && (
            <p className="text-green-400 text-sm mt-1">✔ Arquivo anexado</p>
          )}
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded mt-4 text-sm text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded mt-4 text-sm text-center">
            {successMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}

type InputProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  className?: string
}

const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  className = '',
}: InputProps) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm text-gray-300 font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      placeholder={label}
    />
  </div>
)

type TextareaProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({ label, name, value, onChange }: TextareaProps) => (
  <div className="flex flex-col md:col-span-2">
    <label className="text-sm text-gray-300 font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={3}
      value={value}
      onChange={onChange}
      className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      placeholder={label}
    />
  </div>
)
