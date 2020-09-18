<h1 align="center">
	Passa Ponto 🚀
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucas-eduardo/passPoint?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucas-eduardo/passPoint">

  <a href="https://www.linkedin.com/in/lucasdeveloperti/">
    <img alt="Made by Lucas Eduardo" src="https://img.shields.io/badge/made%20by-Lucas Eduardo-%2304D361">
  </a>

  <a href="https://github.com/lucas-eduardo/passPoint/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucas-eduardo/passPoint">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

   <a href="https://github.com/lucas-eduardo/passPoint/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/lucas-eduardo/passPoint?style=social">
  </a>
</p>

## :information_source: Projeto

Projeto para automatizar marcação de ponto através de um bot para o discord. O projeto foi arquitetado usando o padrao comportamental, o **Strategy**, permitindo assim colocar mais funcionalidades de forma totalmente desacoplada.

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js][nodejs]
- [TypeScript][typescript]

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js][nodejs] e [Yarn][yarn].
Além disto é bom ter um editor para trabalhar com o código como [VSCode][vscode]

**Lembre-se de configurar o .env, esse arquivo obrigatoriamente precisa ter o MONGO_URI, CLIENT_DISCORD e SECRET_KEY, as demais variaveis vai depender do fluxo que for criado e rodado.**

### 🧭 Rodando a aplicação em desenvolvimento

```bash
# Clone este repositório
$ git clone https://github.com/lucas-eduardo/passPoint

# Acesse a pasta do projeto no seu terminal/cmd
$ cd passPoint

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# A aplicação será iniciada e o bot estara online.
```

### 🧭 Gerando build e rodando a aplicação final

```bash
# Clone este repositório
$ git clone https://github.com/lucas-eduardo/passPoint

# Acesse a pasta do projeto no seu terminal/cmd
$ cd passPoint

# Instale as dependências
$ yarn install

# Execute o comando que ira gerar o build (sera gerado uma pasta chamada dist)
$ yarn build

# Execute a aplicação a partir do build final
$ yarn start

# A aplicação será iniciada e o bot estara online.
```

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[yarn]: https://yarnpkg.com/
[vscode]: https://code.visualstudio.com/
