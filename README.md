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

## Link da aplicação: https://cadlab-blond.vercel.app/login
## Link do Swagger: https://cadlab-api-c7dbcre5czgvbzcj.brazilsouth-01.azurewebsites.net/api-docs/

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

- **Next.js + TypeScript**
- **Express.js**
- **JWT (jsonwebtoken)**
- **Swagger (swagger-ui-express + swagger-jsdoc)**
- **Docker**
- **PostgreSQL**

---

### WorkFlow Github para CI/CD

name: Build and Deploy Container App to Azure Web App - Cadlab-API
on:
  push:
    branches: [main]
  workflow_dispatch:
env:
  IMAGE_NAME: cadlab-api
  TAG: latest
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login no Azure Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ secrets.REGISTRY_LOGIN_SERVER }}
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: Build e Push da imagem para o ACR (com cache remoto)
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ secrets.REGISTRY_LOGIN_SERVER }}/${{ env.IMAGE_NAME }}:${{ env.TAG }}
          cache-from: type=registry,ref=${{ secrets.REGISTRY_LOGIN_SERVER }}/${{ env.IMAGE_NAME }}:buildcache
          cache-to: type=registry,ref=${{ secrets.REGISTRY_LOGIN_SERVER }}/${{ env.IMAGE_NAME }}:buildcache,mode=max
  deploy:
    runs-on: ubuntu-latest
    needs: build
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Login no Azure
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Set environment variables in Azure Web App
        run: >
          az webapp config appsettings set
          --resource-group ${{ secrets.RESOURCE_GROUP }}
          --name ${{ secrets.WEBAPP_NAME }}
          --settings
          PORT=${{ secrets.PORT }}
          DB_TYPE=${{ secrets.DB_TYPE }}
          DB_HOST=${{ secrets.DB_HOST }}
          DB_PORT=${{ secrets.DB_PORT }}
          DB_USER=${{ secrets.DB_USER }}
          DB_PASSWORD="${{ secrets.DB_PASSWORD }}"
          DB_NAME=${{ secrets.DB_NAME }}
          FRONTEND_URL=${{ secrets.FRONTEND_URL }}
          JWT_SECRET="${{ secrets.JWT_SECRET }}"
---

## 🧑‍🤝‍🧑 Equipe

| Nome          | Função                 |
| ------------- | ---------------------- |
| Alisson Lee   | CI/CD e Apresentação   |
| Davi Silva    | Documentação e Backend |
| Nathan Yan    | Backend e Docker/API   |
| William Alves | Swagger e Front        |



