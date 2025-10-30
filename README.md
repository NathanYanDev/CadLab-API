# 🧪 CAD LAB

## 📘 Descrição do Projeto

O **Sistema de Gerenciamento de Laboratórios** tem como objetivo facilitar o **cadastro, controle e agendamento de uso de laboratórios** dentro de uma instituição.  
A aplicação permite gerenciar **laboratórios**, **usuários** e **reservas**, garantindo que o uso dos espaços seja feito de forma organizada, respeitando a **capacidade** e **disponibilidade** de cada ambiente.

O sistema é composto por:
- **Frontend Web** (React ou similar): interface para interação dos usuários.
- **Backend API (TypeScript)**: responsável pela lógica de negócios, autenticação e persistência de dados.

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
- **TypeORM**
- **JWT (jsonwebtoken)**
- **Swagger (swagger-ui-express + swagger-jsdoc)**
- **Docker**
- **PostgreSQL**

### Infraestrutura
- **GitHub Actions** – Continuous Deployment (CD)
- **Render / Railway / Vercel / AWS (a definir)** – Hospedagem da API
- **Frontend publicado** (por exemplo, no Vercel) consumindo a API na nuvem

---

## 🧑‍🤝‍🧑 Equipe

| Nome          | Função                 |
| ------------- | ---------------------- |
| Alisson Lee   | CI/CD e Apresentação   |
| Davi Silva    | Documentação e Backend |
| Nathan Yan    | Backend e Docker/API   |
| William Alves | Swagger e Front        |



