# FCHost Frontend

<div align="center">
  <img src="public/assets/images/logos/logoIcon.svg" alt="FCHost Logo" width="120" height="120">
  <h3>Plataforma de Hosting e Gerenciamento de Máquinas Virtuais</h3>
</div>

---

## 🚀 O que é a aplicação

**FCHost Frontend** é uma aplicação web moderna desenvolvida em **Vue.js 3** com **TypeScript** que oferece uma interface intuitiva para simulação de contratação de máquinas virtuais.

### Características principais:

- **Frontend Moderno**: Desenvolvido com Vue 3 Composition API e TypeScript
- **UI Responsiva**: Interface construída com Vuetify 3 para uma experiência consistente
- **Autenticação Segura**: Sistema de login baseado em API Key
- **Gerenciamento de Recursos**: Controle sobre máquinas virtuais alugadas
- **Sistema de Pagamentos**: Integração com gateway de pagamento para adição de saldo
- **Monitoramento em Tempo Real**: Acompanhamento de uso e custos das máquinas

### Stack Tecnológica:

- **Framework**: Vue.js 3 + TypeScript
- **UI Library**: Vuetify 3
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Form Validation**: Vee-Validate + Yup
- **Styling**: SCSS + Vuetify Design System

---

## ⚡ Quais são as funcionalidades

### 🔐 **Sistema de Autenticação**

- **Login**: Autenticação via API Key
- **Criação de Conta**: Registro de novos usuários com nome e email
- **Sessão Persistente**: Manutenção do estado de autenticação

### 🖥️ **Gerenciamento de Máquinas Virtuais**

- **Catálogo de Máquinas**: Visualização de máquinas disponíveis para aluguel
- **Especificações Técnicas**: Detalhes de vCPU, RAM, armazenamento e preço por hora
- **Aluguel de Máquinas**: Processo simplificado para contratar recursos
- **Painel de Controle**: Gerenciamento das máquinas alugadas
- **Controle de Status**: Ligar/desligar máquinas conforme necessidade

### 💰 **Sistema Financeiro**

- **Adição de Saldo**: Processamento de pagamentos via cartão de crédito
- **Controle de Custos**: Monitoramento de gastos por máquina
- **Histórico de Transações**: Registro completo de movimentações financeiras
- **Faturamento**: Sistema de faturas com diferentes status (Pendente, Aprovado, Rejeitado, Processado)

### 📊 **Monitoramento e Relatórios**

- **Métricas de Uso**: Acompanhamento de horas de utilização por máquina
- **Custos em Tempo Real**: Cálculo automático de gastos baseado no uso
- **Filtros Avançados**: Busca e filtros por data, status e descrição
- **Exportação de Dados**: Visualização organizada em tabelas responsivas

### 🎨 **Interface do Usuário**

- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Tema Escuro/Claro**: Suporte a múltiplos temas visuais
- **Componentes Reutilizáveis**: Arquitetura modular e escalável
- **Internacionalização**: Suporte a múltiplos idiomas (i18n)

---

## 🛠️ Como executar a aplicação

### **Pré-requisitos**

- **Node.js**: Versão 18.0.0 ou superior
- **Yarn**: Gerenciador de pacotes (recomendado) ou npm
- **Git**: Para clonar o repositório

### **1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd fchost-frontend
```

### **2. Instale as dependências**

```bash
# Usando Yarn (recomendado)
yarn install

# Ou usando npm
npm install
```

### **3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=FCHost
```

### **4. Execute a aplicação em modo de desenvolvimento**

```bash
# Usando Yarn
yarn dev

# Ou usando npm
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### **5. Build para produção**

```bash
# Usando Yarn
yarn build

# Ou usando npm
npm run build
```

### **6. Preview da build de produção**

```bash
# Usando Yarn
yarn preview

# Ou usando npm
npm run preview
```

A aplicação de preview estará disponível em: `http://localhost:5050`

---

## 📁 Estrutura do Projeto

```
fchost-frontend/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes Vue reutilizáveis
│   ├── composables/        # Composables Vue (hooks)
│   ├── layouts/            # Layouts da aplicação
│   ├── pages/              # Páginas/rotas da aplicação
│   ├── plugins/            # Plugins Vue
│   ├── router/             # Configuração de rotas
│   ├── services/           # Serviços e APIs
│   ├── stores/             # Gerenciamento de estado (Pinia)
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Utilitários e helpers
│   └── main.ts             # Ponto de entrada da aplicação
├── package.json            # Dependências e scripts
├── vite.config.ts          # Configuração do Vite
└── tsconfig.json           # Configuração do TypeScript
```

---

## 🚀 Scripts Disponíveis

| Comando          | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `yarn dev`       | Inicia o servidor de desenvolvimento       |
| `yarn build`     | Gera build de produção                     |
| `yarn preview`   | Preview da build de produção               |
| `yarn typecheck` | Verificação de tipos TypeScript            |
| `yarn lint`      | Executa o linter com correções automáticas |

---

## 🔧 Configurações Adicionais

### **TypeScript**

- Configuração estrita para melhor qualidade de código
- Path mapping configurado para imports limpos (`@/`)

### **Vuetify**

- Tema customizável (claro/escuro)
- Componentes Material Design otimizados
- Sistema de grid responsivo

### **ESLint + Prettier**

- Configuração para Vue 3 + TypeScript
- Formatação automática de código
- Regras de qualidade configuradas

---

## 📱 Funcionalidades por Página

| Página                 | Funcionalidade             |
| ---------------------- | -------------------------- |
| `/`                    | Autenticação e login       |
| `/account/create`      | Criação de nova conta      |
| `/machines`            | Lista de máquinas alugadas |
| `/machines/rent`       | Aluguel de novas máquinas  |
| `/invoices`            | Histórico de faturas       |
| `/transactions`        | Histórico de transações    |
| `/account/balance/add` | Adição de saldo            |

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
