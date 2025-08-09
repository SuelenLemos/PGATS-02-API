# API de Transferências

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```
npm install
   ```

## Executando a API

- Para rodar a API:
  ```
npm start
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará em `http://localhost:3000/api-docs`.

## Endpoints

### Registro de Usuário
- `POST /users/register`
  - Body: `{ "username": "string", "password": "string", "isFavored": true|false }`

### Login
- `POST /users/login`
  - Body: `{ "username": "string", "password": "string" }`

### Listar Usuários
- `GET /users`

### Transferência
- `POST /transfers`
  - Body: `{ "from": "string", "to": "string", "amount": number }`

## Regras de Negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências para não favorecidos só são permitidas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Testes
- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest.

## Documentação
- Acesse `/api-docs` para visualizar e testar os endpoints via Swagger.
