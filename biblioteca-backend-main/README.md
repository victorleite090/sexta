# Aula Programação Web - Cedup 2024/01

## Projeto Backend

Este é um projeto backend para estudos e passagem de conhecimento em aula. O projeto é composto por CRUDs para gerenciar uma Biblioteca.

## Tecnologias

O projeto foi construído utilizando Node.js, com duas bibliotecas importantes:

- Zod (Para validação e transformação de dados);
- Prisma ORM (oferecendo suporte de controle e comunicação com o banco de dados).

## Como rodar a aplicação

Para rodar a aplicação, é necessário ter o Node.js v20+ e seguir os seguintes passos:

- Realize o download do projeto;
- Instale as dependências com `npm install`;
- Crie o arquivo `.env` e informe as variáveis de ambiente conforme exemplo em `.env.example`;
- Caso não utilize `postgres`, verifique a forma de conexão junto á documentação do Prisma ORM;
- Execute o comando `npx prisma migrate dev` para criar seu banco de dados;
- Execute o projeto com `npm run dev`.

## Desafio

Imagine que após a implementação de Estantes e Livros, os usuários desejam também gerenciar Bibliotecas. Para isso, desenvolva o modelo de banco de dados e o CRUD para a nova entidade `Library`.

O relacionamento entre as entidades deve acontecer da seguinte forma:

- Library x Shelf (1,N)

Ou seja, a biblioteca pode conter muitas estantes e a estante deve estar em uma biblioteca.

As propriedades da biblioteca serão:

- id
- name (máximo 60 caracteres)
- cnpj (validar formato da informação)
- logo (logomarca que deve ser armazenada em formato Blob)

Deve ser desenvolvido os seguintes endpoints:

- Criar uma biblioteca
- Listar uma biblioteca pelo ID
- Listar todas as bibliotecas
- Atualizar uma biblioteca
- Deletar uma biblioteca

Além disso, também deve ser alterado a listagem de Shelfs para que ao:

- criar um novo Shelf, deve informar a qual biblioteca pertence;
- atualizar um Shelf, deve ser possível alterar a biblioteca pertencente;
- listar todos os Shelfs, deve ser obrigatoriamente especificado nos filtros sua respectiva biblioteca (query params).

### BOA SORTE!
