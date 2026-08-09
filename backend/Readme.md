# Backend

### Tecnologias
- Socket.IO(WebSocket)
- TypeScript
- Fastify


## Descrição do Projeto
> **Principais Responsabilidades**:
>   1. Gerenciamento da lógica do Jogo Da Velha(Regras do Jogo, Tabuleiro, Vencedores)
>   2. Criação de canal via WebSocket para possibilitar a jogatina de dois usuários em dispositivos diferentes.
>   3. Criação e observação de eventos via websocket, para assim possibilitar envio e recebimento de respostas dos usuários.


***Eventos Registrados***

>**Client --> Server**
> - **room:join** ---> Args(roomId: String) --- Evento de criação e participação de salas
> - **game:play** ---> Args(position: number, roomId: String) --- Evento de realização de jogada


>**Server --> Client**
> - **game:joined** --> socketId , symbol --- Avisa que o jogador entrou na sala com sucesso
> - **game:reconnected** --> socketId , symbol --- Avisa a reconexão do jogador
> - **game:start** --> game --- Avisa que o jogo foi iniciado
> - **game:error** --- Emite um aviso que ocorreu algum erro
> - **game:switch** ---> currentPlayer --- Emite o simbolo do jogador da rodada
> - **game:board** ---> board, currentPlayer, moves --- Envia informações necessárias para continuar o jogo após jogada
> - **game:win** ---> winner --- Emite a mensagem que há um vencedor
