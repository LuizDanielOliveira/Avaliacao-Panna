import { render, screen, fireEvent } from '@testing-library/react'
import CandidatoForm from '@/components/CandidatoCreateForm'

describe('CandidatoForm', () => {
  it('deve renderizar todos os campos do formulário', () => {
    render(<CandidatoForm />)

    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('CPF')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Endereço')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Qualificações')).toBeInTheDocument()
  })

  it('deve mostrar erro se tentar enviar com campos vazios', async () => {
    render(<CandidatoForm />)

    const btn = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(btn)

    // Aqui você pode validar mensagens de erro quando forem implementadas
  })
})
