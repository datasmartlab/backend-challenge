<p align="center">
  <img src="https://github.com/datasmartlab/backend-challenge/blob/main/.github/assets/logo.png" height="150" width="150" alt="Datasmart" />
</p>

<h3 align="center">Datasmart</h3>

<p align="center">Desafio para os candidatos à vaga de desenvolvedor Backend na Datasmart.</p>

<p align="center">:pushpin: Local de trabalho: Avaré - SP</p>

<br>

<div align="center">
  <a href="#memo-apresentação">Apresentação</a>   |   <a href="#clipboard-instruções">Instruções</a>   |   <a href="#wrench-especificações-técnicas">Especificações técnicas</a>   |   <a href="#gear-especificações-funcionais">Especificações funcionais</a>   |   <a href="#heavy_check_mark-o-que-será-avaliado">O que será avaliado?</a>   |   <a href="#question-dúvidas">Dúvidas</a>
</div>

<br>

## :memo: Apresentação

O desafio é desenvolver uma API com rotas para criação de usuário, autenticação e um CRUD de produtos, seguindo todas as especificações abaixo.

Esse desafio é um teste de nivelamento e para avaliarmos o quão bom você é :)

O desafio é público e todos os interessados que fizerem pull request receberão um feedback da nossa equipe.

Esperamos que todas as pessoas que queiram trabalhar conosco tentem realizá-lo.

A Datasmart trabalha sempre com feedbacks construtivos e, portanto, daremos sempre uma atenção especial para todos que submeterem o teste. Vale a pena tentar! :)

## :clipboard: Instruções

1. Faça um fork desse projeto;

2. Crie uma branch para o seu desafio no padrão: `git checkout -b backend-challenge/seu-nome-sobrenome`;

3. Realize o desafio seguindo a seção de especificações;

4. Crie um README com uma descrição e instruções para compilar e rodar o projeto;

5. Adicione seu desafio para transferência `git add .`;

6. Faça commit do seu desafio `git commit -m 'Challenge'`;

7. Faça o push da branch: `git push origin backend-challenge/seu-nome-sobrenome`;

8. Abra um pull request com o nome `Challenge: Seu Nome Sobrenome`;

9. Envie um email para `marcos@datasmart.com.br` com o título: `Desenvolvedor Backend - Seu Nome Sobrenome`. Adicione seu telefone, LinkedIn, seu perfil do GitHub e em anexo seu currículo.

## :wrench: Especificações técnicas

- Utilizar Node.js;

- Usar framework Express.js;

- Utilizar Sequelize para ORM;

- Usar autenticação JWT;

- Utilizar Yup para validar a entrada de dados;

- Usar bcryptjs para criptografar a senha;

- Utilizar banco de dados MySQL;

- Usar o Insomnia para exportar as rotas.

## :gear: Especificações funcionais

- A API deve conter as migrations, modelos (models), controles (controllers) e rotas (routes).

- Deve ter uma criação de usuário com os campos nome, email e senha.

- Deve ser criado uma autenticação de usuário com os campos email e senha.

- Deve ser criado um CRUD de produtos com os campos nome, descrição e preço do produto.

- O usuário somente poderá acessar as rotas de CRUD de produtos (get, post, put, delete) se estiver previamente autenticado.

- Criptografar a senha do usuário ao ser salva no banco de dados.

- Ao ocorrer um erro de validação na entrada de dados, retornar uma mensagem de erro.

- Usar o Insomnia para exportar as rotas em arquivo json e adicione junto com o projeto.

## :heavy_check_mark: O que será avaliado?

- Conhecimento do Node.js, framework Express e suas bibliotecas utilizadas;

- Boas práticas com o código (lint, indentação, padrões, etc);

- Organização e estrutura do projeto;

- Código Javascript;

- Uso de migrations, rotas, modelos e controles;

- Uso do Git;

- Performance e segurança;

- Documentação.

## :question: Dúvidas

Em caso de dúvidas, crie uma issue ou envie um e-mail para `marcos@datasmart.com.br`.

Boa sorte!

---

Desenvolvido com 💖 por Datasmart
