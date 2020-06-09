# MemoryCards

A ideia para esse jogo surgiu de um trabalho da faculdade, cujo o objetivo era desenvolver um jogo mobile sem o uso de qualquer biblioteca/framework específico para jogos. O intuito era fazer com que os alunos explorassem a linguagem para conhecer suas limitações e facilidades, a solução que apresentei na época foi feita em Java para Android. Agora, replico o trabalho com os mesmos objetivos e intuitos, porém aplicados a react-native.
 > Esse projeto foi criado utilizando o Expo Tools, para saber como
 instalar e iniciar o projeto em sua maquina clique [aqui](https://docs.expo.io/get-started/installation/)

## Como jogar
- Observe a posição das cartas abertas e tente memoriza-las.
- Observe e memorize os movimentos realizados.
- Após todas as cartas terem sido fechadas, tente se lembrar da posição em que estavam.
- Tente abrir todas as cartas, em sequencia numérica, com o menor numero de jogadas que conseguir.
- Caso o número de jogadas realizadas seja baixo o bastante você poderá registrar seu nome no placar de jogadores.
* ps¹: O botão 'refresh' gerará uma nova sequencia de cartas e voltará o jogo no inicio
* ps²: O placar de jogadores possui espaço para no máximo 5 jogadores

## Sobre essa versão beta_1.0.2
Versão lançada para testar o AdMob e o recurso multi-idiomas implementato. Também foi refatorado o diretorio que continha constantes úteis para o programa, foi substituido pelo diretório 'resources' e subdiretorios. Essa alteração dará mais flexibilidade ao programador e trará uma coompreensão mais clara da estrutura do código fonte
* Clique [aqui](https://expo.io/artifacts/cde056e7-2cb6-49ac-8f9e-1c3dd6ea50bf) para fazer o download do arquivo .apk dessa versão 
* Lembrando que ao clicar no botão 'refresh' além de reiniciar o jogo irá alterar a linguagem do mesmo para inglês, em versões futuras essa funcionalidade será movida para o menu inicial

## Para a próxima versão
- [ ] Adicionar menu inicial
- [ ] Adicionar menu para seleção de dificuldades
