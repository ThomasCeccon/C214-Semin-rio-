[![CIDC - APPMantra](https://github.com/ThomasCeccon/C214-Semin-rio-/actions/workflows/cidc.yml/badge.svg)](https://github.com/ThomasCeccon/C214-Semin-rio-/actions/workflows/cidc.yml)

# *ORC API (Orçamento de serviços)*

## *Descrição do Projeto*

O **ORC API** é uma aplicação desenvolvida em **React** para gerenciamento de solicitações de orçamento de serviços. Foi projetado um layout que permite aos usuários solicitar orçamentos de serviços através de um formulário. O formulário contém os seguintes campos:
* Nome
* Email
* Telefone
* Serviço (tipo de serviço solicitado)
* Detalhes (descrição do serviço)
* Urgência (opções de baixa, média ou alta)
  
Após o envio do formulário, os dados preenchidos são exibidos em uma tabela de solicitações de orçamento. A tabela apresenta todas as informações inseridas pelo usuário, permitindo um acompanhamento prático das solicitações.

## *Pré-requisitos*

* [Node.js](https://nodejs.org/en)
* [npm (Node Package Manager)](https://www.npmjs.com/)

## *Criar um projeto em React*

### 1. Criar projeto React
Crie a estrutura inicial do projeto React:
 sh
     npx create-react-app orc api
 

## *Configuração do Ambiente*

### 1. Clonar o repositório
Clone o repositório em sua máquina local e navegue até o diretório do projeto:
```bash
     https://github.com/ThomasCeccon/C214-Semin-rio-.git
     cd C214-Semin-rio
```

### 2. Instalar Dependências
Instale as dependências necessárias com o comando:
 ```bash
     npm install 
 ```

### 3. Inicializar o Projeto React
Inicie o servidor de desenvolvimento para executar o projeto:
 ```bash
    npm start 
 ```

## *Relatório de Testes*
- O projeto utiliza *GitHub Actions* para automatizar o pipeline de integração contínua, gerando artefatos como:
  - Build do projeto.
  - Relatórios de testes.
 
## *Mais informações sobre React*
Para saber mais sobre o React e seus recursos, consulte a [documentação oficial React](https://create-react-app.dev/docs/getting-started)
