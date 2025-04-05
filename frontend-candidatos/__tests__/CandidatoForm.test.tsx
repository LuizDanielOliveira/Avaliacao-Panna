import { render, screen, fireEvent } from '@testing-library/react'
import CandidatoForm from '@/components/CandidatoCreateForm'

describe('CandidatoForm', () => {
  it('deve renderizar todos os campos do formulário', () => {
    render(<CandidatoForm />)

    expect(screen.getByPlaceholderText('Ex: João da Silva')).toBeInTheDocument()
expect(screen.getByPlaceholderText('Ex: 12345678900 (somente números)')).toBeInTheDocument()
expect(screen.getByPlaceholderText('exemplo@email.com')).toBeInTheDocument()
expect(screen.getByPlaceholderText('Ex: (11) 99999-9999')).toBeInTheDocument()
expect(screen.getByPlaceholderText('Ex: Rua ABC, 123')).toBeInTheDocument()
expect(screen.getByPlaceholderText('Ex: Curso X, experiência Y...')).toBeInTheDocument()

  })

  it('deve mostrar erro se tentar enviar com campos vazios', async () => {
    render(<CandidatoForm />)
    const btn = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(btn)

    // Como ainda não há validação com mensagens, testaremos mais quando implementar isso.
  })
})
