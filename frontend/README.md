# Frontend - Jogo da Velha

## Visão geral

Este frontend é a interface web do Jogo da Velha multiplayer. Ele conecta com o backend por WebSocket, permite criar ou entrar em salas, e exibe o estado do tabuleiro em tempo real para dois jogadores.

A aplicação foi construída com React, React Router e TypeScript, usando Socket.IO para sincronizar jogadas e eventos da partida.

## Tecnologias

- React 19
- React Router 8
- TypeScript
- Vite
- Socket.IO Client
- Tailwind CSS
- shadcn/ui

## Requisitos

- Node.js 18+
- npm
- Backend rodando localmente ou em um servidor acessível

## Configuração

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do frontend com a URL do backend:

```env
VITE_BACKEND_URL=http://localhost:3000
```

> Ajuste a URL conforme o ambiente do backend. Se o backend estiver em outro host ou porta, substitua o valor acima.

## Scripts

```bash
npm run dev
```

Inicia o servidor de desenvolvimento do React Router.

```bash
npm run build
```

Gera a build de produção.

```bash
npm run start
```

Executa a aplicação em modo produção.

```bash
npm run typecheck
```

Valida os tipos TypeScript e gera os tipos do React Router.

## Como usar

### 1. Página inicial

Na rota `/`, o usuário pode:

- criar uma nova sala automaticamente;
- entrar em uma sala informando um ID manualmente.

### 2. Sala da partida

Ao acessar `/game/:roomId`, o frontend:

- conecta ao Socket.IO;
- envia o evento para entrar na sala;
- recebe o estado inicial do jogo;
- sincroniza a vez do jogador e o tabuleiro.

### 3. Fluxo do jogo

- O jogador cria ou entra em uma sala.
- O backend define os símbolos e a ordem da partida.
- O cliente recebe eventos como:
  - `game:start`
  - `game:switch`
  - `game:board`
  - `game:win`
  - `game:error`
- O tabuleiro é renderizado e as jogadas são enviadas para o backend.

## Estrutura do projeto

```text
frontend/
├── app/
│   ├── components/
│   ├── config/
│   │   └── socket/
│   ├── lib/
│   ├── modules/
│   │   ├── Home/
│   │   └── Tic-Tac-Hoe/
│   ├── routes/
│   └── root.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── react-router.config.ts
├── Dockerfile
└── README.md
```

## Observações importantes

- A aplicação depende diretamente do backend para a lógica do jogo e do matchmaking por sala.
- O cliente armazena o ID do usuário no `localStorage` para manter a identificação do jogador entre reconexões.
- Em caso de erro de sala ou conexão, a aplicação redireciona o usuário para a tela inicial.

## Execução local

Na raiz do frontend:

```bash
npm install
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

Se o backend estiver rodando em outra porta, ajuste `VITE_BACKEND_URL` antes de iniciar o frontend.

## Relacionado

- Backend: [../backend/README.md](../backend/README.md)
