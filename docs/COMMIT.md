# Guia de Commits para API REST com NestJS

Este guia apresenta padrões para mensagens de commits ao trabalhar em uma API REST usando **NestJS**. Os commits estão organizados por tipo de alteração e incluem ícones para facilitar a identificação do propósito de cada alteração.

- [Sobre o Projeto](./README.md): Informações gerais sobre o projeto.
- [Guia de Instalação para Desenvolvedores](./INSTALL.md): Instruções detalhadas para configurar o ambiente de desenvolvimento.

---

## **Recomendações Gerais**

1. Use mensagens de commit curtas e descritivas no estilo imperativo (ex.: "Adiciona endpoint" ao invés de "Adicionando endpoint").
2. Inclua um corpo explicativo no commit para alterações mais complexas.
3. Combine ícones com mensagens claras para facilitar a leitura do histórico do Git.
4. Sempre teste suas alterações antes de realizar o commit.

---

## **Tipos de Commits e Exemplos**

### **1. Inicialização do Projeto**

- **🎉 init:** Configuração inicial do projeto.

```bash
git commit -m ":tada: init: Configuração inicial do projeto NestJS"
```

---

### **2. Funcionalidades (Features)**

- **✨ feat:** Adiciona uma nova funcionalidade à API.

```bash
git commit -m ":sparkles: feat: Adicionado endpoint de autenticação"
```

---

### **3. Correção de Bugs**

- **🐛 fix:** Corrige um bug no sistema.

```bash
git commit -m ":bug: fix: Corrigido erro na validação do token JWT"
```

---

### **4. Melhoria de Código (Estilo e Formatação)**

- **🎨 style:** Melhora a formatação ou organização do código sem alterar a lógica.

```bash
git commit -m ":art: style: Melhorada a formatação do controller de usuários"
```

---

### **5. Refatoramento de Código**

- **♻️ refactor:** Melhorias na estrutura do código sem alterar seu comportamento.

```bash
git commit -m ":recycle: refactor: Refatorado o middleware de autenticação"
```

---

### **6. Testes**

- **✅ test:** Adiciona ou atualiza testes no projeto.

```bash
git commit -m ":white_check_mark: test: Adicionados testes para o serviço de usuários"
```

---

### **7. Documentação**

- **📚 docs:** Atualiza ou cria documentação no projeto.

```bash
git commit -m ":books: docs: Atualizada a documentação do endpoint de autenticação"
```

---

### **8. Atualização de Dependências**

- **⬆️ chore:** Atualiza pacotes ou dependências no projeto.

```bash
git commit -m ":arrow_up: chore: Atualizado o pacote @nestjs/jwt para a versão mais recente"
```

---

### **9. Configurações do Projeto**

- **🔧 config:** Adiciona ou atualiza arquivos de configuração.

```bash
git commit -m ":wrench: config: Configuração inicial do arquivo .env"
```

---

### **10. Performance**

- **⚡ perf:** Melhora o desempenho do sistema.

```bash
git commit -m ":zap: perf: Melhorada a performance do endpoint de listagem de usuários"
```

---

### **11. Correções de Segurança**

- **🔒 security:** Aplica correções ou melhorias relacionadas à segurança.

```bash
git commit -m ":lock: security: Corrigida vulnerabilidade de injeção de SQL"
```

---

### **12. Exclusão de Código ou Arquivos**

- **🔥 remove:** Remove códigos ou arquivos desnecessários.

```bash
git commit -m ":fire: chore: Removido código obsoleto do módulo de relatórios"
```

---

### **13. Estilização de Interface**

- **💄 feat:** Alterações de estilização visual.

```bash
git commit -m ":lipstick: feat: Estilização do Swagger com nova interface"
```

---

### **14. Trabalho em Progresso**

- **🚧 wip:** Indica que a funcionalidade está em desenvolvimento.

```bash
git commit -m ":construction: wip: Desenvolvimento do módulo de permissões"
```

---

### **15. Deploy**

- **🚀 deploy:** Marca uma versão pronta para deploy.

```bash
git commit -m ":rocket: chore: Deploy da versão inicial da API"
```

---

### **16. Reversão de Alterações**

- **⏪ revert:** Reverte um commit anterior.

```bash
git commit -m ":rewind: revert: Revertido commit que quebrou o serviço de autenticação"
```

---

Se seguir esse padrão, seu histórico de commits será organizado, claro e fácil de entender. Para dúvidas ou ajustes, consulte os guias relacionados ou entre em contato!
