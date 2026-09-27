# Design Simples e YAGNI

# Introdução

O princípio YAGNI (You Aren't Gonna Need It) recomenda que funcionalidades e estruturas sejam implementadas apenas quando realmente forem necessárias.

A aplicação desse princípio ajuda a evitar complexidade desnecessária, reduzindo o tempo de desenvolvimento e facilitando a manutenção do sistema.

# Análise do ESM Forum

O ESM Forum possui uma estrutura um tanto simples, adequada ao objetivo principal da aplicação: permitir que usuários publiquem perguntas e respostas.

Durante a análise, foi possível observar que o sistema prioriza funcionalidades essenciais e evita a implementação antecipada de recursos que ainda não são necessários.

# Exemplos de aplicação do YAGNI

# 1. Estrutura simples das perguntas

As perguntas possuem apenas as informações necessárias para o funcionamento atual do fórum. Não são adicionados diversos atributos ou configurações que ainda não possuem usos práticos.

Isso mantém o modelo simples e deixa sua manutenção mais fácil.

# 2. Funcionalidades implementadas conforme a necessidade

Ainda é possível adicionar recursos como sistema de votação, busca de perguntas, categorização por tags, perfil de usuário e notificações ao decorrer do projeto.

Implementar todos esses recursos antecipadamente aumentaria a complexidade do sistema sem necessidade atual.

# 3. Separação gradual de responsabilidades

A arquitetura pode ser melhorada conforme novas funcionalidades forem adicionadas. Não é necessário criar antecipadamente diversas camadas, serviços e abstrações que o sistema atual ainda não utiliza.

Essa abordagem permite que a estrutura evolua de acordo com necessidades reais.

# Benefícios

A utilização do princípio YAGNI no projeto proporciona:

- Código mais simples;
- Menor complexidade;
- Facilidade de manutenção;
- Menor quantidade de código desnecessário;
- Desenvolvimento mais rápido;
- Facilidade para realizar futuras alterações.

# Conclusão

O ESM Forum pode evoluir gradualmente conforme novas necessidades forem identificadas. O princípio YAGNI ajuda a garantir que cada nova funcionalidade seja implementada quando houver uma necessidade concreta, evitando complexidade antecipada e mantendo o sistema simples.