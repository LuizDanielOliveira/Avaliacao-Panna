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

#### 1. Tailwind não funciona corretamente
**Solução:** Verificar se `postcss.config.js` e `tailwind.config.js` estão presentes. Para Next.js v15+, não é necessário `tailwind.config.js` se estiver usando a configuração automática.

#### 2. Imagens quebradas
**Solução:** Verifique se as imagens estão em `/public` e use `next/image` corretamente.

#### 3. Porta já em uso
**Solução:** Finalize processos na porta 3000 com:
```bash
npx kill-port 3000
```
