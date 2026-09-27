# Caso de Uso: Buscar Perguntas

# Identificação

- Nome: Buscar perguntas
- Ator principal: Usuário do ESM Forum
- Objetivo: Possibilitar que o usuário encontre perguntas cadastradas no fórum utilizando-se de uma palavra-chave.

# Pré-condições

- O sistema deve estar disponível.
- Devem existir perguntas cadastradas para que resultados possam ser encontrados.

# Fluxo principal

1. O usuário acessa o ESM Forum.
2. O usuário informa uma palavra-chave no campo de busca.
3. O usuário solicita a pesquisa.
4. O sistema recebe o termo informado.
5. O sistema procura perguntas relacionadas à palavra-chave.
6. O sistema apresenta as perguntas encontradas.
7. O usuário pode visualizar uma das perguntas apresentadas.

# Fluxo alternativo — Nenhum resultado encontrado

1. O usuário informa uma palavra-chave.
2. O sistema realiza a busca.
3. Nenhuma pergunta correspondente é encontrada.
4. O sistema informa que não foram encontrados resultados para a pesquisa.

# Pós-condições

- Os resultados correspondentes à pesquisa são apresentados ao usuário.
- Nenhuma informação existente no sistema é alterada pela operação de busca.

# Regras

- A busca deve considerar pelo menos o título das perguntas.
- O campo de busca deve aceitar texto informado pelo usuário.
- Uma pesquisa sem resultados deve ser tratada sem gerar erro na aplicação.