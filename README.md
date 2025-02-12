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

|     | Método | Endpoint              | Descrição                                                                        | Permissões |
| --- | ------ | --------------------- | -------------------------------------------------------------------------------- | ---------- |
| ✅  | POST   | /auth/signin          | Realiza login e retorna um token JWT.                                            | Todos      |
| ✅  | POST   | /auth/signout         | Encerra a sessão do usuário.                                                     | Todos      |
| ✅  | POST   | /auth/signup          | Cria novo usuário e retorna um token JWT.                                        | Todos      |
| ✅  | POST   | /auth/refresh         | Renova o token de autenticação.                                                  | Todos      |
| ✅  | POST   | /auth/validate        | Valida o token e a origem da requisição.                                         | Todos      |
| ❌  | POST   | /auth/select-instance | Valida o token e a origem da requisição gerando um novo com a instância passada. | Todos      |

---

### **Gerenciamento de Contas**

|     | Método | Endpoint                              | Descrição                                            | Permissões           |
| --- | ------ | ------------------------------------- | ---------------------------------------------------- | -------------------- |
| ✅  | GET    | /accounts                             | Lista todas as contas.                               | Owner, Admin         |
| ✅  | GET    | /accounts/:id                         | Detalha uma conta específica.                        | Owner, Admin, Member |
| ✅  | POST   | /accounts                             | Cria uma nova conta.                                 | Owner                |
| ✅  | PUT    | /accounts/:id                         | Atualizar informações de uma conta.                  | Owner, Admin         |
| ✅  | DELETE | /accounts/:id                         | Remove uma conta.                                    | Owner                |
| ✅  | GET    | /accounts/:accountId/users            | Lista de usuários associados a uma conta específica. | Owner, Admin, Member |
| ❌  | GET    | /accounts/validate-instance/:instance | Valida se uma instância já foi cadastrada.           | Todos                |

---

### **Gerenciamento de Usuários**

|     | Método | Endpoint            | Descrição                                 | Permissões           |
| --- | ------ | ------------------- | ----------------------------------------- | -------------------- |
| ✅  | GET    | /users              | Lista todos os usuários.                  | Owner, Admin         |
| ✅  | GET    | /users/:id          | Detalha um usuário específico.            | Owner, Admin, Member |
| ✅  | GET    | /users/email/:email | Detalha um usuário específico, por email. | Owner, Admin         |
| ✅  | POST   | /users              | Cria um novo usuário.                     | Owner, Admin         |
| ✅  | PUT    | /users/:id          | Atualizar informações de um usuário.      | Owner, Admin         |
| ✅  | DELETE | /users/:id          | Remove um usuário.                        | Owner                |

---

### **Vinculação Usuários ↔ Contas**

|     | Método | Endpoint                               | Descrição                     | Permissões                  |
| --- | ------ | -------------------------------------- | ----------------------------- | --------------------------- |
| ❌  | POST   | /accounts/{account_id}/users           | Adicionar usuário a uma conta | Admin, Account_User (Owner) |
| ❌  | GET    | /accounts/{account_id}/users           | Listar usuários da conta      | Admin, Account_User         |
| ❌  | DELETE | /accounts/{account_id}/users/{user_id} | Remover usuário da conta      | Admin, Account_User (Owner) |
