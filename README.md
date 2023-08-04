# PlayAward task

![Node.js version: 18.17.0](https://img.shields.io/static/v1?label=node-version&message=18.17.0&color=brightgreen)

## How to run project

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```
With Docker type next command in terminal:
```bash
docker-compose build && docker-compose up
```

Without Docker run next steps:
```bash
npm install
```

```bash
npm start
```

## Table of Contents

- [Commands](#commands)
- [Linting](#linting)


## Commands

Running project locally:

```bash
npm run start:dev
```

Running project with Docker:

```bash
docker-compose build && docker-compose up
```


## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.
