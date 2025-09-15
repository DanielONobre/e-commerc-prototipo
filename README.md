# DevShop - Protótipo de E-commerce Full Stack

Este é um protótipo de uma aplicação de e-commerce completa (`Full Stack`), construído do zero com o stack MERN (MongoDB, Express, React, Node.js). O projeto inclui funcionalidades essenciais tanto para clientes quanto para administradores, como catálogo de produtos, carrinho de compras persistente, autenticação de utilizadores e um painel de gestão de produtos.

## ✨ Funcionalidades

- **Catálogo de Produtos:** Visualização dos produtos disponíveis na loja.
- **Carrinho de Compras:**
  - Adicionar, remover, aumentar e diminuir a quantidade de itens.
  - O carrinho é persistente e mantém os itens mesmo que o utilizador atualize a página (usando `localStorage`).
- **Sistema de Autenticação:**
  - Registo e Login de utilizadores com senhas criptografadas (`bcryptjs`).
  - Autenticação baseada em JSON Web Tokens (JWT).
- **Checkout Protegido:** Apenas utilizadores logados podem aceder à página de finalização de compra.
- **Painel de Administração:**
  - Rota protegida, acessível apenas por utilizadores com permissão de `admin`.
  - Gestão completa de produtos (CRUD - Criar, Ler, Atualizar, Apagar).

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

### Back-end
* **Node.js**: Ambiente de execução JavaScript.
* **Express.js**: Framework para a construção da API RESTful.
* **MongoDB**: Banco de dados NoSQL para armazenar os dados.
* **Mongoose**: Biblioteca para modelagem dos dados do MongoDB.
* **JSON Web Token (JWT)**: Para criar tokens de acesso seguros para autenticação.
* **bcryptjs**: Para criptografar as senhas dos utilizadores.
* **dotenv**: Para gerir as variáveis de ambiente.
* **CORS**: Para permitir a comunicação entre o front-end e o back-end.

### Front-end
* **React**: Biblioteca para a construção da interface de utilizador.
* **Vite**: Ferramenta de build e servidor de desenvolvimento de alta performance.
* **React Router**: Para a gestão de rotas e navegação entre páginas.
* **Context API**: Para a gestão de estados globais (carrinho e autenticação).
* **Tailwind CSS**: Framework de CSS para uma estilização rápida e moderna.
* **Axios**: Para fazer os pedidos HTTP para a API do back-end.

## 🚀 Instalação e Execução

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/DanielONobre/e-commerc-prototipo.git](https://github.com/DanielONobre/e-commerc-prototipo.git)
    cd e-commerc-prototipo
    ```

2.  **Configure o Back-end:**
    * Navegue para a pasta do back-end e instale as dependências:
        ```bash
        cd backend
        npm install
        ```
    * Crie um ficheiro `.env` na raiz da pasta `backend` e adicione as suas variáveis de ambiente:
        ```env
        MONGO_URI=SUA_STRING_DE_CONEXAO_DO_MONGODB_ATLAS
        JWT_SECRET=UM_SEGREDO_FORTE_E_ALEATORIO
        ```
    * Inicie o servidor do back-end:
        ```bash
        npm run dev
        ```
        O servidor estará a rodar em `http://localhost:5000`.

3.  **Configure o Front-end:**
    * Abra um **novo terminal**.
    * Navegue para a pasta do front-end e instale as dependências:
        ```bash
        cd frontend
        npm install
        ```
    * Inicie o servidor do front-end:
        ```bash
        npm run dev
        ```
        A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

**Importante:** Para que a aplicação funcione, os dois servidores (back-end e front-end) precisam de estar a rodar simultaneamente.

## 📝 Licença

Este projeto está licenciado sob a Licença GPLv3. Veja o ficheiro [LICENSE](LICENSE) para mais detalhes.