import { render, screen, waitFor } from '@testing-library/react'
import CandidatoList from '@/components/CandidatoList'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          nome: 'João',
          cpf: '12345678900',
          email: 'joao@email.com',
          telefone: '11999999999',
          endereco: 'Rua A',
          qualificacoes: 'React, Node',
          curriculo: 'dGVzdGU=' // Base64 de "teste"
        }
      ])
  })
) as jest.Mock

describe('CandidatoList', () => {
  it('deve renderizar candidato após fetch', async () => {
    render(<CandidatoList />)

    await waitFor(() => {
      expect(screen.getByText(/João/)).toBeInTheDocument()
      expect(screen.getByText(/React, Node/)).toBeInTheDocument()
    })
  })
})
