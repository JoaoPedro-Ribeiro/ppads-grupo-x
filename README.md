<p align="center">
  <a href="https://www.mackenzie.br/" target="blank"><img src="./mackenzie-logo.png" width="200" alt="Mackenzie Logo" /></a>
</p>

<div align="center" >

<p>Esse é o projeto final da matéria Prática Profissional em Análise e Desenvolvimento de Sistemas da Universidade Presbiteriana Mackenzie.</p>

<p><strong>GRUPO X - ALUNOS:</strong></p>

<p>João Pedro Mantovani Dantas de Souza
<br>João Pedro Ribeiro
<br>Jonatas Souza de Moraes
<br>Kaique Mota Carvalho
<br>Rebeca Vieira Barbosa
</p>

</div>

## Instalação

Para instalar o projeto, seja o front (web) ou backend (server) siga a seguinte ordem de comandos:

1- Primeiro na pasta raíz (ppads-grupo-x)

```bash
$ yarn install
```

2- Depois vá até a pasta do projeto que deseja rodar
<br>Backend:

```bash
$ cd /packages/server
```

<br>Frontend:

```bash
$ cd /packages/web
```

<br> 3- Indepedente do projeto que escolher o comando para instalar é o mesmo

```bash
$ yarn install
```

## Rodando o projeto

Ambos os projetos rodam com o seguinte comando

```bash
$ yarn start
```

Para que o projeto de backend rode localmente é necessario configurar o .env de maneira correta.
Temos os seguintes campos:

```
AWS_REGION = 'SUA REGIAO'
AWS_ACCESS_KEY_ID = SUA KEY
AWS_SECRET_ACCESS_KEY = SUA KEY
JWT_SECRET = SUA KEY
JWT_EXPIRATION_TIME = 3600
JWT_EXPIRATION_TIME_EXTENDED = 604800
```

Por motivos de segurança não vamos deixar nossas keys aqui, mas nosso projeto utiliza o DynamoDB e S3 Bucket, serviços da AWS, sendo assim é necessario que você crie em sua conta AWS as keys de acesso. Também é necessario criar as tabelas 'books, users, categories' no dynamo e um S3 bucket chamado 'books-cover' (caso queira alterar os nomes também é necessario alterar no codigo). Ademais, é necessario gerar sua JWT_SECRET também.

!! SEM ESSAS CONFIGURAÇÕES PREVIAS O PROJETO ATÉ CONSEGUE SER EXECUTADO, PORÉM QUANDO UMA ROTA FOR CHAMADA ELA RETORNARÁ ERROS DE CONEXÃO !!

### Rotas

Caso queira ver todas as rotas e os campos a serem enviados temos em nosso projeto uma pasta chamada collections, onde está a collection e environments do postman. Basta importa-los no postman e utilizar!

OBS: Vale lembrar que a maioria das rotas utiliza o bearer token, então é necessário chamar a rota de login antes de executar as demais.

## Linkedin dos Devs

- [João Pedro Mantovani Dantas de Souza](https://www.linkedin.com/in/jpmantovani/)
- [João Pedro Ribeiro](https://www.linkedin.com/in/joao-pr/)
- [Jonatas Souza de Moraes](https://www.linkedin.com/in/jonatas-souza-de-moraes-69a539b2/)
- [Kaique Mota Carvalho](https://br.linkedin.com/in/kaique-mota)

## Licenças

Nest usa a [licença MIT](LICENSE).
