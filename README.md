# Repositórios Separados: Frontend e Backend

Este projeto foi separado em dois repositórios para facilitar manutenção, deploy e resolução de problemas.

---

## FRONTEND (Next.js + Tailwind CSS)

### Instruções de Instalação
```bash
npm install
npm run dev
```

### Principais Dependências
- `next`
- `react`
- `tailwindcss`
- `eslint`
- `typescript`

### Problemas Comuns Resolvidos

#### 3. Porta já em uso
**Solução:** Finalize processos na porta 3000 com:
```bash
npx kill-port 3000
```
