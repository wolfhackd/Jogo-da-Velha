# Backend - Jogo da Velha Multiplayer

## Visão geral

Este backend gerencia a lógica do Jogo da Velha em tempo real, incluindo criação e entrada em salas, validação das jogadas, alternância de turno, pontuação e sincronização entre clientes conectados por WebSocket.

## Tecnologias

- Socket.IO (WebSocket)
- TypeScript
- Fastify
- Vitest

## Principais responsabilidades

1. Gerenciar as regras do jogo (tabuleiro, vitória e pontuação);
2. Criar e manter salas de partidas por `roomId`;
3. Permitir comunicação em tempo real entre dois jogadores;
4. Escutar e emitir eventos para sincronizar os clientes;
5. Manter o estado das partidas em memória durante a execução da aplicação.

## Arquitetura

### Ponto de entrada

O servidor é iniciado em `src/server.ts` e expõe um Socket.IO com CORS habilitado para todas as origens.

### Módulos principais

- `src/server.ts`: inicia o Fastify e o Socket.IO
- `src/socket/connection.ts`: registra os handlers na conexão do cliente
- `src/socket/handlers/room.handler.ts`: lógica de entrada em sala e reconexão
- `src/socket/handlers/game.handler.ts`: processamento das jogadas
- `src/socket/handlers/game.state.ts`: armazenamento dos jogos em memória
- `src/socket/game/game.factory.ts`: criação das partidas
- `src/socket/game/game.logic.ts`: verificações de turno, vencedor e pontuação
- `src/socket/game/game.actions.ts`: execução da jogada no tabuleiro

## Estrutura dos dados

Cada partida é representada por um objeto `Game` com:

```ts
{
  roomId: string;
  board: ("X" | "O" | null)[];
  currentPlayer: "X" | "O";
  players: {
    X: Player | null;
    O: Player | null;
  };
  moves: {
    X: number[];
    O: number[];
  };
  score: {
    X: number;
    O: number;
  };
}
```

O estado das partidas é armazenado no `Map`:

```ts
export const Games = new Map<string, Game>();
```

## Fluxo da partida

1. O cliente envia `room:join` com o ID da sala.
2. Se a sala ainda não existe, o backend a cria e atribui ao primeiro jogador o símbolo `X`.
3. O segundo jogador entra como `O` na mesma sala.
4. O evento `game:start` é emitido para informar o início da partida.
5. O cliente envia `game:play` com a posição escolhida.
6. O backend valida a jogada e atualiza o tabuleiro.
7. O servidor verifica vencedor, emite `game:switch` e `game:board` para todos na sala.
8. Se houver ganho, o evento `game:win` é emitido e o score é incrementado.

## Eventos Socket.IO

### Client -> Server

- `room:join` — entra em uma sala (`roomId`)
- `game:play` — envia uma jogada (`position`, `roomId`)

### Server -> Client

- `game:joined` — jogador entrou na sala com sucesso
- `game:reconnected` — jogador reconectou e voltou à sala
- `game:start` — partida iniciada
- `game:switch` — turno atualizado
- `game:board` — tabuleiro e estado atual da partida
- `game:win` — anúncio do vencedor e atualização de pontuação
- `game:error` — sala cheia ou erro de estado

## Regras do jogo

- O tabuleiro possui 9 casas.
- Os jogadores alternam entre `X` e `O`.
- O vencedor é o jogador que formar uma linha, coluna ou diagonal com 3 símbolos iguais.
- O backend incrementa a pontuação ao detectar o vencedor.
- O tabuleiro é resetado para a próxima rodada.

## Execução local

```bash
cd backend
npm install
npm run dev
```

O backend fica disponível em:

```text
http://localhost:8000
```

## Testes

```bash
cd backend
npm run test:run
```

Os testes validam a criação de partidas e a lógica de vencedor e pontuação.

## Observações

- O backend não usa banco de dados; todo o estado é armazenado em memória.
- A solução foi desenhada para partidas dinâmicas em rede e ambiente de demonstração/local.
- Para mais detalhes sobre o projeto completo, consulte a documentação principal em [../README.md](../README.md).
