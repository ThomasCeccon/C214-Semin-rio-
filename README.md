# Testes Unitários e Integração Contínua (CI/CD) em React

Este repositório foi desenvolvido para o seminário da disciplina C214 e explora a implementação de testes unitários em aplicações React utilizando a React Testing Library e Jest. Além disso, demonstramos como integrar testes em um pipeline de Integração Contínua (CI/CD) usando GitHub Actions. O foco do projeto, é simular um sistema para solicitação de orçamentos de serviços.

## Descrição do Projeto

Este projeto foi projetado para criar um layout que permite aos usuários solicitar orçamentos de serviços através de um formulário. O formulário contém os seguintes campos:
* Nome
* Email
* Telefone
* Serviço (tipo de serviço solicitado)
* Detalhes (descrição do serviço)
* Urgente (select com opções de baixa, média ou alta urgência)
  
Após o envio do formulário, os dados preenchidos são exibidos em uma tabela de solicitações de orçamento. A tabela apresenta todas as informações inseridas pelo usuário, permitindo um acompanhamento prático das solicitações.

##  Pré-requisitos

* Node.js (necessário para o npm)
 ```sh
     https://nodejs.org/pt
 ```
* **Visual Studio Code (VS Code)**, com a extensão Jest para facilitar a execução de testes.

## Configuração do Ambiente

### 1. Instalar Dependências
Para instalar o gerenciador de pacotes do Node e NPM em React:
 ```sh
     npm install 
 ```

### 2. Inicializar o Projeto React
Utilize o comando abaixo para abrir o projeto:
 ```sh
    npm start 
 ```
