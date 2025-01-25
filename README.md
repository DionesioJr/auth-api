# Documentação da API de Usuários

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

1. Gerenciamento de Contas
2. Gerenciamento de Usuários
3. Perfis
4. Idiomas
5. Notificações
6. Time Zones
7. Autenticação
8. Módulos e Permissões

---

### **1. Gerenciamento de Contas**

|     | Verbo HTTP | Endpoint URL               | Descrição                                            |
| --- | ---------- | -------------------------- | ---------------------------------------------------- |
| ❌  | GET        | /accounts                  | Lista todas as contas registradas no sistema.        |
| ❌  | GET        | /accounts/:id              | Detalha uma conta específica.                        |
| ❌  | POST       | /accounts                  | Cria uma nova conta.                                 |
| ❌  | PUT        | /accounts/:id              | Atualizar informações de uma conta.                  |
| ❌  | DELETE     | /accounts/:id              | Remove uma conta.                                    |
| ❌  | GET        | /accounts/:accountId/users | Lista de usuários associados a uma conta específica. |

---

### **2. Gerenciamento de Usuários**

|     | Verbo HTTP | Endpoint URL | Descrição                            |
| --- | ---------- | ------------ | ------------------------------------ |
| ❌  | GET        | /users       | Lista todos os usuários.             |
| ❌  | GET        | /users/:id   | Detalha um usuário específico.       |
| ❌  | POST       | /users       | Cria um novo usuário.                |
| ❌  | PUT        | /users/:id   | Atualizar informações de um usuário. |
| ❌  | DELETE     | /users/:id   | Remove um usuário.                   |

#### **Idiomas de Usuários**

|     | Verbo HTTP | Endpoint URL                         | Descrição                                  |
| --- | ---------- | ------------------------------------ | ------------------------------------------ |
| ❌  | GET        | /users/:userId/languages             | Lista de idiomas preferidos de um usuário. |
| ❌  | POST       | /users/:userId/languages             | Associa um idioma a um usuário.            |
| ❌  | DELETE     | /users/:userId/languages/:languageId | Remove um idioma associado a um usuário.   |

#### **Fusos Horários de Usuários**

|     | Verbo HTTP | Endpoint URL                         | Descrição                                        |
| --- | ---------- | ------------------------------------ | ------------------------------------------------ |
| ❌  | GET        | /users/:userId/timezones             | Lista de fusos horários associados a um usuário. |
| ❌  | POST       | /users/:userId/timezones             | Associa um fuso horário a um usuário.            |
| ❌  | DELETE     | /users/:userId/timezones/:timeZoneId | Remove um fuso horário associado a um usuário.   |

---

### **3. Gerenciamento de Perfis**

|     | Verbo HTTP | Endpoint URL  | Descrição                           |
| --- | ---------- | ------------- | ----------------------------------- |
| ❌  | GET        | /profiles     | Lista todos os perfis.              |
| ❌  | GET        | /profiles/:id | Detalha um perfil específico.       |
| ❌  | POST       | /profiles     | Cria um novo perfil.                |
| ❌  | PUT        | /profiles/:id | Atualizar informações de um perfil. |
| ❌  | DELETE     | /profiles/:id | Remove um perfil.                   |

#### **Associação de Perfis a Usuários**

|     | Verbo HTTP | Endpoint URL                       | Descrição                                      |
| --- | ---------- | ---------------------------------- | ---------------------------------------------- |
| ❌  | GET        | /users/:userId/profiles            | Lista perfis associados a um usuário.          |
| ❌  | POST       | /users/:userId/profiles            | Associa um perfil a um usuário.                |
| ❌  | DELETE     | /users/:userId/profiles/:profileId | Remove a associação de um perfil a um usuário. |

---

### **4. Gerenciamento de Idiomas**

|     | Verbo HTTP | Endpoint URL   | Descrição                           |
| --- | ---------- | -------------- | ----------------------------------- |
| ❌  | GET        | /languages     | Lista todos os idiomas disponíveis. |
| ❌  | GET        | /languages/:id | Detalha um idioma específico.       |
| ❌  | POST       | /languages     | Cria um novo idioma.                |
| ❌  | PUT        | /languages/:id | Atualizar informações de um idioma. |
| ❌  | DELETE     | /languages/:id | Remove um idioma.                   |

---

### **5. Notificações por E-mail**

|     | Verbo HTTP | Endpoint URL                            | Descrição                                                |
| --- | ---------- | --------------------------------------- | -------------------------------------------------------- |
| ❌  | GET        | /users/:userId/notifications-emails     | Lista de notificações de e-mail associadas a um usuário. |
| ❌  | POST       | /users/:userId/notifications-emails     | Configura uma nova notificação de e-mail.                |
| ❌  | PUT        | /users/:userId/notifications-emails/:id | Atualize uma notificação de e-mail.                      |
| ❌  | DELETE     | /users/:userId/notifications-emails/:id | Remove uma notificação de e-mail.                        |

---

### **6. Gerenciamento de Fusos Horários (Time Zones)**

|     | Verbo HTTP | Endpoint URL   | Descrição                                 |
| --- | ---------- | -------------- | ----------------------------------------- |
| ❌  | GET        | /timezones     | Lista todos os fusos horários.            |
| ❌  | GET        | /timezones/:id | Detalha um fuso horário específico.       |
| ❌  | POST       | /timezones     | Cria um novo fuso horário.                |
| ❌  | PUT        | /timezones/:id | Atualizar informações de um fuso horário. |
| ❌  | DELETE     | /timezones/:id | Remove um fuso horário.                   |

---

### **7. Autenticação**

|     | Verbo HTTP | Endpoint URL   | Descrição                                                  |
| --- | ---------- | -------------- | ---------------------------------------------------------- |
| ❌  | POST       | /auth/login    | Realiza login e retorna um token JWT.                      |
| ❌  | POST       | /auth/logout   | Encerra a sessão do usuário.                               |
| ❌  | POST       | /auth/refresh  | Renova o token de autenticação.                            |
| ❌  | POST       | /auth/validate | Valida o token e a origem da requisição (dispositivo, IP). |

---

### **8. Módulos e Permissões**

#### **Módulos**

|     | Verbo HTTP | Endpoint URL | Descrição                           |
| --- | ---------- | ------------ | ----------------------------------- |
| ❌  | GET        | /modules     | Lista todos os módulos.             |
| ❌  | GET        | /modules/:id | Detalha um módulo específico.       |
| ❌  | POST       | /modules     | Cria um novo módulo.                |
| ❌  | PUT        | /modules/:id | Atualizar informações de um módulo. |
| ❌  | DELETE     | /modules/:id | Remove um módulo.                   |

#### **Permissões**

|     | Verbo HTTP | Endpoint URL     | Descrição                               |
| --- | ---------- | ---------------- | --------------------------------------- |
| ❌  | GET        | /permissions     | Lista todas as permissões.              |
| ❌  | GET        | /permissions/:id | Detalha uma permissão específica.       |
| ❌  | POST       | /permissions     | Cria uma nova permissão.                |
| ❌  | PUT        | /permissions/:id | Atualizar informações de uma permissão. |
| ❌  | DELETE     | /permissions/:id | Remove uma permissão.                   |

#### **Associação de Permissões a Perfis**

|     | Verbo HTTP | Endpoint URL                                   | Descrição                                   |
| --- | ---------- | ---------------------------------------------- | ------------------------------------------- |
| ❌  | GET        | /profiles/:profileId/permissions               | Lista as permissões associadas a um perfil. |
| ❌  | POST       | /profiles/:profileId/permissions               | Associa permissões a um perfil.             |
| ❌  | DELETE     | /profiles/:profileId/permissions/:permissionId | Remove a permissão de um perfil.            |
