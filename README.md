# 🧪 CAD LAB

## 📘 Descrição do Projeto

O **Sistema de Gerenciamento de Salas** tem como objetivo facilitar o **cadastro, controle e agendamento de uso de Salas** dentro de uma instituição.  
A aplicação permite gerenciar **Salas**, **usuários**, **reservas** e **disponibilidade das salas**, garantindo que o uso dos espaços seja feito de forma organizada, respeitando a **capacidade** e **disponibilidade** de cada ambiente.

O sistema é composto por:
- **Frontend Web** (NEXT.js): interface para interação dos usuários.
- **Backend API (TypeScript)**: responsável pela lógica de negócios, autenticação e persistência de dados.
- **GitHub Actions** – Continuous Deployment (CD)
- **Docker Compose** – Hospedagem da API
- **PostgreSQL** - Banco de dados

---

## 🎯 Funcionalidades Principais

### 👤 Usuários
- Cadastro e autenticação de usuários via **JWT**.  
- Perfis de acesso (ex: administrador, professor, técnico).

### 🧩 Laboratórios
- Cadastro, edição e exclusão de laboratórios.  
- Campos: nome, local, capacidade, recursos disponíveis e status (ativo/inativo).

### 📅 Agendamentos
- Criação de reservas para laboratórios com data e hora.  
- Verificação automática de **disponibilidade e capacidade**.  
- Listagem e cancelamento de reservas.  
- Visualização de calendário de uso.

### 🔐 Autenticação e Segurança
- Todas as rotas (exceto login e cadastro de usuário) exigem **token JWT**.  
- Tokens são validados em cada requisição.

---

## 🧠 Tecnologias Utilizadas

### Backend
- **Node.js + TypeScript**
- **Express.js**
- **JWT (jsonwebtoken)**
- **Swagger (swagger-ui-express + swagger-jsdoc)**
- **Docker**
- **PostgreSQL**

---

### WorkFlow Github para CI/CD

name: 🚀 CI/CD - API Laboratórios

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    name: 🧪 Build e Testes
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout do repositório
        uses: actions/checkout@v4

      - name: ⚙️ Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: 📦 Instalar dependências
        working-directory: ./backend
        run: npm ci

      - name: 🏗️ Compilar TypeScript
        working-directory: ./backend
        run: npm run build

      - name: ✅ Executar testes (se houver)
        working-directory: ./backend
        run: npm test || echo "⚠️ Nenhum teste definido"

      - name: 🐳 Build da imagem Docker
        run: docker build -t labmanager-api ./backend

  deploy:
    name: 🚀 Deploy em Produção
    needs: build-and-test
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout do repositório
        uses: actions/checkout@v4

      - name: ⚙️ Login no Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: 🐳 Build da imagem Docker
        run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/labmanager-api:latest ./backend

      - name: 📤 Push da imagem para o Docker Hub
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/labmanager-api:latest

      - name: 🌐 Notificar Deploy (Render, Railway, etc.)
        if: success()
        run: |
          curl -X POST ${{ secrets.DEPLOY_WEBHOOK_URL }} || echo "⚠️ Deploy manual necessário"

---

## 🧑‍🤝‍🧑 Equipe

| Nome          | Função                 |
| ------------- | ---------------------- |
| Alisson Lee   | CI/CD e Apresentação   |
| Davi Silva    | Documentação e Backend |
| Nathan Yan    | Backend e Docker/API   |
| William Alves | Swagger e Front        |



