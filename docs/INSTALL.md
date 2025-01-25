# Instalação e Configuração do NestJS com Prisma usando MySQL

Este guia fornece as etapas para configurar um projeto **NestJS** com **Prisma** utilizando o banco de dados **MySQL**, tanto em **Windows** quanto em **Linux**.

---

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- **Node.js** (v16 ou superior)
- **NPM** ou **Yarn**
- **Docker** (opcional para ambiente de desenvolvimento com container)
- **MySQL**

---

## Referências Adicionais

- [Sobre o Projeto](./README.md): Sobre o Projeto.
- [Guia de Commits](./COMMIT.md): Regras e padrões para mensagens de commit.

Se precisar de mais ajuda ou detalhes sobre a configuração, sinta-se à vontade para pedir!

## Configuração Inicial do Projeto

### 1. Criação do Projeto NestJS

1. Instale o **CLI do NestJS**:

```bash
npm install -g @nestjs/cli
```

2. Crie um novo projeto:

```bash
nest new my-nestjs-project
```

3. Entre na pasta do projeto:

```bash
cd my-nestjs-project
```

### 2. Instalação do Prisma

1. Instale as dependências do Prisma:

```bash
npm install prisma @prisma/client
```

2. Inicialize o Prisma:

```bash
npx prisma init
```

Isso criará a pasta `prisma/` com o arquivo `schema.prisma` e o arquivo `.env`.

3. Configure o arquivo `.env` para usar o MySQL:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
```

Substitua:

- `USER` pelo usuário do MySQL (ex.: `root`).
- `PASSWORD` pela senha do usuário.
- `DATABASE_NAME` pelo nome do banco de dados.

4. Crie o banco de dados (se necessário):

```bash
npx prisma db push
```

---

## Configuração de Scripts NPM

Adicione os seguintes scripts ao seu `package.json`:

```json
"scripts": {
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main",
  "build": "nest build",
  "test": "jest",
  "lint": "eslint . --ext .ts",
  "prisma:generate": "npx prisma generate",
  "prisma:db:push": "npx prisma db push",
  "prisma:migrate:dev": "npx prisma migrate dev",
  "prisma:migrate:prod": "npx prisma migrate deploy"
}
```

---

## Comandos para Desenvolvimento

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run start:dev
```

### 3. Gerar Arquivos Prisma (após alterações no schema)

```bash
npm run prisma:generate
```

### 4. Sincronizar Banco de Dados (Desenvolvimento)

```bash
npm run prisma:db:push
```

### 5. Executar Migrações

```bash
npm run prisma:migrate:dev
```

---

## Comandos para Testes

1. Execute os testes:

```bash
npm test
```

2. Verifique o linting do código:

```bash
npm run lint
```

---

## Comandos para Deploy

1. Compile o projeto:

```bash
npm run build
```

2. Execute as migrações no ambiente de produção:

```bash
npm run prisma:migrate:prod
```

3. Inicie o servidor em produção:

```bash
npm run start:prod
```

---

## Configuração Específica por Sistema Operacional

### **Windows**

1. Certifique-se de que o MySQL esteja instalado e configurado no `PATH`.
2. Use o MySQL Workbench para criar o banco de dados, se necessário.

### **Linux**

1. Instale o MySQL:

```bash
sudo apt update
sudo apt install mysql-server
```

2. Configure o MySQL para aceitar conexões locais:

```bash
sudo mysql_secure_installation
```

3. Crie o banco de dados:

```bash
mysql -u root -p
CREATE DATABASE my_database;
```
