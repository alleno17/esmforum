# Histórias de Usuário

# História 1: Busca de perguntas

Como usuário do ESM Forum, quero buscar perguntas por palavras-chave para encontrar conteúdos relacionados à minha dúvida com mais facilidade.

# Critérios de aceitação

- O usuário deve poder informar uma palavra-chave para realizar a busca.
- O sistema deve apresentar as perguntas relacionadas ao termo pesquisado.
- A busca deve considerar o título das perguntas.
- Caso nenhuma pergunta seja encontrada, o sistema deve informar que não existem resultados para a pesquisa.

# História 2: Sistema de votação

Como usuário do ESM Forum, quero votar em perguntas e respostas para destacar os conteúdos que considero mais úteis.

# Critérios de aceitação

- O usuário deve poder registrar um voto em uma pergunta ou resposta.
- O sistema deve atualizar a quantidade de votos após a votação.
- A quantidade de votos deve ficar visível para o usuário.
- O sistema deve impedir que uma mesma votação seja contabilizada repetidamente quando essa restrição for aplicável.


# História 3: Categorização por tags

Como usuário do ESM Forum, quero associar tags às perguntas para organizar os assuntos e facilitar a localização de conteúdos relacionados.

# Critérios de aceitação

- Uma pergunta deve poder possuir uma ou mais tags.
- As tags associadas devem ser exibidas junto à pergunta.
- O usuário deve poder identificar o assunto de uma pergunta por meio das tags.
- O sistema deve permitir localizar ou filtrar perguntas relacionadas a uma determinada tag.

# História 4: Editar pergunta

Como usuário, quero editar uma pergunta para corrigir ou atualizar seu conteúdo.

# Critérios de aceitação

- Deve ser possível selecionar uma pergunta existente para edição.
- Deve ser possível alterar o texto da pergunta.
- A alteração deve ser salva.
- O novo texto deve aparecer na listagem de perguntas.

# História 5: Excluir pergunta

Como usuário, quero excluir uma pergunta que não seja mais necessária.

# Critérios de aceitação

- Deve ser possível selecionar uma pergunta existente para exclusão.
- A pergunta deve ser removida do sistema.
- Após a exclusão, a pergunta não deve mais aparecer na listagem.

# Priorização

Entre as funcionalidades analisadas, a busca de perguntas será utilizada como funcionalidade principal nas próximas etapas do projeto.

Ela foi escolhida por melhorar a localização de conteúdos existentes no fórum e permitir uma implementação incremental sem adicionar complexidade desnecessária ao sistema.