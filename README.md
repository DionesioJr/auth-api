# Auth API - Microservice

Esta API permite o gerenciamento de contas, usuários, perfis, idiomas, autenticação, permissões e módulos. É projetada para sistemas _multi-tenant_, oferecendo endpoints para configurar e gerenciar dados de forma segura e eficiente.

---

## Referências Adicionais

- [Guia de Commits](./docs/COMMIT.md): Regras e padrões para mensagens de commit.
- [Guia de Instalação para Desenvolvedores](./docs/INSTALL.md): Instruções detalhadas para configurar o ambiente de desenvolvimento.
- [Guia de pipeline de branchs](./docs/BRANCH_PIPELINE.md): Instruções detalhadas para criar e gerenciar branchs no ambiente de desenvolvimento.

## Estrutura da API

- **Base URL:** https://api.domain.com/v1/
- **Autenticação:** Todas as requisições exigem o cabeçalho `Authorization` com um token JWT válido.
- **Formato das Respostas:** JSON.

---

### **Autenticação**

|     | Método | Endpoint       | Descrição                                 | Permissões |
| --- | ------ | -------------- | ----------------------------------------- | ---------- |
| ✅  | POST   | /auth/signin   | Realiza login e retorna um token JWT.     | Todos      |
| ✅  | POST   | /auth/signout  | Encerra a sessão do usuário.              | Todos      |
| ✅  | POST   | /auth/signup   | Cria novo usuário e retorna um token JWT. | Todos      |
| ✅  | POST   | /auth/refresh  | Renova o token de autenticação.           | Todos      |
| ✅  | POST   | /auth/validate | Valida o token e a origem da requisição.  | Todos      |

---

### **Gerenciamento de Contas**

|     | Método | Endpoint                     | Descrição                                                       | Permissões                  |
| --- | ------ | ---------------------------- | --------------------------------------------------------------- | --------------------------- |
| ✅  | GET    | /accounts                    | Lista todas as contas.                                          | Owner, Admin                |
| ✅  | GET    | /account/:uuid               | Detalha uma conta específica.                                   | Owner, Admin, Member        |
| ✅  | POST   | /account                     | Cria uma nova conta.                                            | Owner                       |
| ✅  | PUT    | /account/:uuid               | Atualizar informações de uma conta.                             | Owner, Admin                |
| ✅  | DELETE | /account/:uuid               | Remove uma conta.                                               | Owner                       |
| ✅  | GET    | /account/:uuid/users         | Lista de usuários associados a uma conta específica.            | Owner, Admin, Member        |
| ✅  | GET    | /accounts/me/with-owner      | Retorna os dados da conta e do usuário responsável autenticado. | Usuário Autenticado         |
| ❌  | DELETE | /accounts/:uuid/user/:uuid   | Remover usuário da conta                                        | Admin, Account_User (Owner) |
| ❌  | GET    | /account/:uuid/users         | Listar usuários da conta                                        | Admin, Account_User         |
| ❌  | POST   | /account/:uuid/users         | Adicionar usuário a uma conta                                   | Admin, Account_User (Owner) |
| ❌  | GET    | /accounts/validate/:username | Valida se uma instância já foi cadastrada.                      | Todos                       |

---

### **Gerenciamento de Usuários**

|     | Método | Endpoint           | Descrição                                 | Permissões           |
| --- | ------ | ------------------ | ----------------------------------------- | -------------------- |
| ✅  | GET    | /users             | Lista todos os usuários.                  | Owner, Admin         |
| ✅  | GET    | /user/:uuid        | Detalha um usuário específico.            | Owner, Admin, Member |
| ✅  | GET    | /user/email/:email | Detalha um usuário específico, por email. | Owner, Admin         |
| ✅  | POST   | /user              | Cria um novo usuário.                     | Owner, Admin         |
| ✅  | PUT    | /user/:uuid        | Atualizar informações de um usuário.      | Owner, Admin         |
| ✅  | DELETE | /user/:uuid        | Remove um usuário.                        | Owner                |
