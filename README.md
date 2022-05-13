# jera-imdb

## Disponivel também em https://jera-imdb.vercel.app/

# Para rodar o código, execute:

- crie um arquivo .env na raiz do projeto com as seguintes variaveis:

vou deixar as variaveis do .env aqui para que facilite o teste (mas sei que não é uma boa prática)

```
VITE_API_KEY=ab319f50a3792c49e23a3336df9f0d80
VITE_API_URL=https://jera-challenge-json-server.herokuapp.com/

```

- passo 2:

```
yarn install
yarn run dev

```
ou se prefirir com npm
```
npm install
npm run dev

```

# Ferramentas

- Vue.js 3
- Vite
- Typescript
- Vue Test Utils
- Cypress
- Husky
- Axios
- Json Server
- Pinia
- Pipeline Github Actions

## Backend
- não foi o Foco, para teste criei um ambiente no Heroku com o Json Server para salvar a carga inicial.

## Cypress
- Criei um arquivo cypress.json para configurar o Cypress
- Criei um Teste inicial para testar o fluxo de login, coisa simples.
```
yarn test:e2e

```

## Vue Test Utils
- Criei um arquivo jest.config.js para configurar o Jest
- Criei alguns testes de componentes
  ```
  yarn test:unit
  ```
## Husky
- Foi instalado o Husky para testes ao commit
## Pipeline
- Criei um arquivo .github/workflows/main.yml para configurar o Pipeline
- Executa todos os testes de componente ao qualquer commit na branch main


## Pinia
- Foi utilizado o Pinia ao invés do Vuex porque é o recomendado para aplicações mais novas utilizando Vue 3.

## Typescript
- Foi utilizado o Typescript para o código para ajudar no desenvolvimento evitando que erros apareçam no momento de compilação.
