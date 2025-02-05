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

## Áreas Funcionais

- ✅ Autenticação
- ✅ Gerenciamento de Tenants
- ✅ Gerenciamento de Contas
- ✅ Gerenciamento de Usuários

---

### **Autenticação**

|     | Verbo HTTP | Endpoint URL   | Descrição                                                  |
| --- | ---------- | -------------- | ---------------------------------------------------------- |
| ✅  | POST       | /auth/login    | Realiza login e retorna um token JWT.                      |
| ✅  | POST       | /auth/logout   | Encerra a sessão do usuário.                               |
| ✅  | POST       | /auth/refresh  | Renova o token de autenticação.                            |
| ✅  | POST       | /auth/validate | Valida o token e a origem da requisição (dispositivo, IP). |

---

### **Gerenciamento de Tenants**

|     | Verbo HTTP | Endpoint URL                           | Descrição                                           |
| --- | ---------- | -------------------------------------- | --------------------------------------------------- |
| ✅  | GET        | /tenants                               | Lista todos os tenants cadastrados no sistema.      |
| ✅  | GET        | /tenants/:id                           | Detalha um tenant específico.                       |
| ✅  | POST       | /tenants                               | Cria um novo tenant com as informações necessárias. |
| ✅  | PUT        | /tenants/:id                           | Atualiza informações de um tenant específico.       |
| ✅  | DELETE     | /tenants/:id                           | Remove um tenant do sistema.                        |
| ✅  | GET        | /tenants/:id/accounts                  | Lista as contas associadas a um tenant específico.  |
| ✅  | GET        | /tenants/validate-subdomain/:subdomain | Valida se um subdomínio já foi cadastrado.          |

---

### **Gerenciamento de Contas**

|     | Verbo HTTP | Endpoint URL               | Descrição                                            |
| --- | ---------- | -------------------------- | ---------------------------------------------------- |
| ✅  | GET        | /accounts                  | Lista todas as contas registradas no sistema.        |
| ✅  | GET        | /accounts/:id              | Detalha uma conta específica.                        |
| ✅  | POST       | /accounts                  | Cria uma nova conta.                                 |
| ✅  | PUT        | /accounts/:id              | Atualizar informações de uma conta.                  |
| ✅  | DELETE     | /accounts/:id              | Remove uma conta.                                    |
| ✅  | GET        | /accounts/:accountId/users | Lista de usuários associados a uma conta específica. |

---

### **Gerenciamento de Usuários**

|     | Verbo HTTP | Endpoint URL | Descrição                            |
| --- | ---------- | ------------ | ------------------------------------ |
| ✅  | GET        | /users       | Lista todos os usuários.             |
| ✅  | GET        | /users/:id   | Detalha um usuário específico.       |
| ✅  | POST       | /users       | Cria um novo usuário.                |
| ✅  | PUT        | /users/:id   | Atualizar informações de um usuário. |
| ✅  | DELETE     | /users/:id   | Remove um usuário.                   |
