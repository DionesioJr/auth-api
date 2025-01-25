# Guia de Branching e Pull Requests

Este guia descreve o pipeline para criação de branches, padrões de nomenclatura e o processo para realizar pull requests em projetos colaborativos.

---

## Pipeline de Branching

### **1. Branch Principal**

- A branch principal do projeto é chamada `main`.
- Nenhuma alteração é feita diretamente na `main`. Todas as modificações devem passar pelo fluxo de branches e pull requests.

### **2. Branch de Desenvolvimento**

- Branch dedicada para integração contínua: `develop`.
- Todas as features, correções de bugs e melhorias devem ser integradas primeiramente na `develop` antes de serem mescladas na `main`.

### **3. Tipos de Branches**

| Tipo        | Padrão de Nomeação         | Descrição                                                                  |
| ----------- | -------------------------- | -------------------------------------------------------------------------- |
| **Feature** | `feature/nome-descritivo`  | Utilizado para implementar novas funcionalidades.                          |
| **Bugfix**  | `bugfix/descricao-bug`     | Utilizado para corrigir bugs encontrados no sistema.                       |
| **Hotfix**  | `hotfix/descricao-urgente` | Utilizado para correções urgentes que precisam ir diretamente para `main`. |
| **Chore**   | `chore/nome-tarefa`        | Utilizado para tarefas de manutenção ou configurações (ex.: CI/CD).        |
| **Release** | `release/versao`           | Utilizado para preparar versões antes de mesclar na branch `main`.         |

---

## Criação de Branches

1. Certifique-se de estar na branch correta antes de criar uma nova branch:

   ```bash
   git checkout develop
   ```

2. Crie uma nova branch baseada no tipo de trabalho:

   ```bash
   git checkout -b tipo/nome-descritivo
   ```

   Exemplos:

   - Para uma nova funcionalidade: `git checkout -b feature/autenticacao-jwt`
   - Para corrigir um bug: `git checkout -b bugfix/corrigir-token-expirado`

3. Realize suas alterações e faça commits regularmente seguindo o [Guia de Commits](./COMMIT.md).

---

## Regras para Pull Requests

1. **Base da Pull Request**

   - A base da PR deve ser a branch `develop`, exceto para `hotfix`, que deve ser direcionada para a branch `main`.

2. **Descrição Clara**

   - Descreva o objetivo da alteração de forma clara e concisa.

3. **Checklist para Envio da PR**

   - [ ] Código formatado corretamente.
   - [ ] Testes unitários e/ou de integração escritos e executados com sucesso.
   - [ ] Nenhum erro ou warning em ferramentas de lint.
   - [ ] Revisão inicial realizada pelo autor.

4. **Exemplo de Título de PR**

   - **Tipo:** `[Feature]`, `[Bugfix]`, `[Hotfix]`, `[Chore]`
   - **Descrição curta:** O que foi implementado.

   Exemplo:

   ```
   [Feature] Adiciona autenticação JWT ao projeto
   ```

5. **Aprovação**

   - Ao menos um revisor deve aprovar a PR antes de ela ser mesclada.

6. **Mesclagem**
   - Utilize "Squash and Merge" para mesclar commits em um único commit limpo na branch principal.

---

## Fluxo Geral

1. Inicie o trabalho criando uma nova branch a partir de `develop` ou `main` (no caso de hotfix).
2. Faça commits claros e consistentes.
3. Submeta uma PR com descrição e checklist preenchidos.
4. Aguarde a revisão e aprovação da PR.
5. Realize a mesclagem após aprovação.

---

Para dúvidas ou mais detalhes sobre o fluxo, entre em contato com os administradores do projeto.
