# Jogo da Velha Multiplayer

Projeto full-stack de Jogo da Velha em tempo real para dois jogadores, com salas por ID e sincronização em tempo real utilizando Socket.IO. A aplicação possui backend em Node.js/Fastify e frontend em React + TypeScript.

## Visão geral

Este projeto permite que dois jogadores entrem na mesma sala, alternem as jogadas em tempo real e acompanhem o estado do tabuleiro, da vez atual e da pontuação. O backend gerencia as partidas em memória e o frontend renderiza a interface e troca eventos com o servidor por WebSocket.

### Tecnologias principais

- Backend: Node.js, TypeScript, Fastify, Socket.IO
- Frontend: React, React Router, TypeScript, Vite
- Estilização: Tailwind CSS e shadcn/ui
- Testes: Vitest

## Funcionalidades

- Criação de sala pelo usuário
- Entrada em sala existente por ID
- Define automaticamente os símbolos X e O
- Sincronização do tabuleiro em tempo real
- Controle de turno entre jogadores
- Verificação de vencedor
- Sistema de pontuação por partida
- Reconexão de jogador mantida pelo identificador do usuário
- Estado em memória para partidas em execução

## Arquitetura

O projeto está dividido em dois módulos principais:

- backend/: servidor de jogos, WebSocket e regras da partida
- frontend/: interface web do jogo

### Backend

O backend inicia um servidor Fastify e um Socket.IO na porta 8000. Ele escuta eventos como entrada em sala, jogadas e notificações de início/fim de partida.

### Frontend

O frontend exibe a tela inicial para criar ou entrar em uma sala e a tela de jogo para realizar as jogadas. Ele se conecta ao backend via Socket.IO e atualiza o tabuleiro com base nos eventos enviados pelo servidor.

## Estrutura do repositório

```text
Jogo-da-Velha/
├── backend/
│   ├── src/
│   │   ├── socket/
│   │   │   ├── game/
│   │   │   ├── handlers/
│   │   │   └── middleware/
│   │   ├── tests/
│   │   └── server.ts
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── README.md
├── README.md
└── .gitignore
```

## Requisitos

- Node.js 18 ou superior
- npm
- Git

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/wolfhackd/Jogo-da-Velha.git
cd Jogo-da-Velha
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do frontend

```bash
cd ../frontend
npm install
```

## Execução

### Backend

Na pasta backend:

```bash
npm run dev
```

O backend ficará disponível em:

```text
http://localhost:8000
```

### Frontend

Na pasta frontend, crie um arquivo `.env` com a URL do backend:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Em seguida, inicie o frontend:

```bash
npm run dev
```

A aplicação web normalmente estará disponível em:

```text
http://localhost:5173
```

> Se o backend estiver em outra porta ou host, ajuste `VITE_BACKEND_URL` antes de iniciar o frontend.

## Fluxo de uso

1. O usuário abre a aplicação na rota `/`.
2. O cliente pode criar uma nova sala automaticamente ou entrar em uma sala usando um ID.
3. Ao entrar em uma sala, o backend cria a partida se ela não existir.
4. O primeiro usuário entra como `X` e o segundo como `O`.
5. Cada jogada é enviada para o servidor via evento `game:play`.
6. O backend valida:
   - turno do jogador;
   - posição livre;
   - existência da sala e da partida.
7. A jogada é registrada, o tabuleiro é atualizado e o estado da partida é broadcast para todos da sala.
8. Se houver vencedor, o servidor calcula o ponto e reinicia o tabuleiro para a próxima rodada.

## Eventos Socket.IO

### Eventos do cliente para o servidor

- `room:join`: entra em uma sala
- `game:play`: envia a jogada com `position` e `roomId`

### Eventos do servidor para o cliente

- `game:joined`: confirmação de entrada na sala
- `game:reconnected`: confirmação de reconexão
- `game:start`: inicia a partida com o estado atual
- `game:board`: atualiza o tabuleiro e o turno
- `game:switch`: troca o jogador atual
- `game:win`: notifica vencedor e atualiza pontuação
- `game:error`: erro, como sala cheia ou inconsistência de estado

## Regras do jogo

- O tabuleiro possui 9 casas.
- Os jogadores jogam alternando entre `X` e `O`.
- A partida é vencida ao completar uma linha, coluna ou diagonal com 3 símbolos iguais.
- Quando alguém vence, o backend acrescenta um ponto à pontuação do jogador e reinicia o tabuleiro.
- O estado da partida é mantido em memória no servidor durante a execução da aplicação.

## Testes

O backend inclui testes automatizados para validar a lógica do jogo.

Para executar os testes:

```bash
cd backend
npm run test:run
```

## Observações importantes

- O projeto não utiliza banco de dados; o estado das partidas fica em memória.
- A identificação do usuário é mantida em `localStorage` no frontend para ajudar em reconexões.
- A aplicação foi pensada como um jogo local multiplayer em rede em um ambiente de desenvolvimento/uso simples.

## Documentação adicional

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
