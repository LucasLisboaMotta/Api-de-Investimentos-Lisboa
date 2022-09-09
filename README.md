# API de Investimentos Lisboa 

Bem vindos a API de Investimentos Lisboa

Este projeto foi feito em 10 dias,  e utilizado como principal ferramenta de desenvolvimento o Visual Studio Code.

Meu objetivo era criar uma API dinâmica,  que apenas pelas rotas da API seja possível manipular todos os dados da aplicação.

O que eu mais gostei no projeto foi ter tido a oportunidade de construir uma API do zero, decidindo o que era necessário e o que era dispensável durante o desenvolvimento. 
<details>
  <summary><strong>Tecnologias utilizadas</strong></summary><br />

TypeScript - O código foi inteiramente feito em TypeScript, o motivo de eu ter escolhido essa linguagem foi 
para garantir a tipagem do código, e facilitar a continuação do código no futuro caso seja necessário 

Sequelize - Para me conectar ao meu banco de dados,  eu escolhi o Sequelize, pela facilidade que ele me traz ao não ter que me preocupar com a linguagem do banco, apenas a linguagem do servidor da API.

Jest - Para realizar os testes, e garantir a integridade do meu código, eu utilizei o Jest, e me foquei totalmente nos testes de integração.

JWT -  Uma biblioteca responsável por assinaturas digitais, e no meu projeto ela foi especialmente util pois eu estava utilizando dois tipos de tokens simultaneamente

ESLint - Dentre as ferramentas disponíveis, achei interessante  exaltar o ESLint, pois ele garante a estetística do código, facilitando a leitura dos futuros desenvolvedores.
</details>

<details>
  <summary><strong>Como executar</strong></summary><br />

```
git clone git@github.com:LucasLisboaMotta/Api-de-Investimentos-Lisboa.git
```
Para executar o projeto, é necessário ter instalado em sua máquina o node 16, e um banco de dados (por padrão estou utilizando o MySQL, porem caso possua algum outro compatível com o ORM Sequelize, basta trocar o dialeto nas variáveis de ambiente).

#### npm install
Apos clonar o repositório, basta você utilizar o comando npm install
para instalar todas as dependências. 

#### .env.example
Apos isso altere o nome do arquivo .env.example para .env, apos isso altere as variáveis de ambiente necessárias.

#### npm run db:reset
Para iniciar a aplicação, você precisa popular o banco de dados, e basta utilizar o comando npm run db:reset (só faça isso apos ter configurado as variáveis de ambiente)

#### npm start
Feito isso, o projeto já esta pronto para ser iniciado com o comando npm start


#### npm run dev
Caso queira fazer alguma alteração do projeto, você pode iniciar a aplicação em modo de desenvolvimento com o comando npm run dev,  pois com ele o servidor ira reiniciar apos cada alteração.


#### npm test
Caso queira conferir a integridade do código, você pode utilizar o comando npm test, e inicializara todos os testes de integração (atenção, os testes fazem requisições com o banco de dados, então é necessário o banco estar conectado para o teste funcionar corretamente. Caso você tenha feito alguma alteração no banco, e não queira perde-la durante o teste, basta alterar o nome do banco (DB_NAME) nas variáveis de ambiente, e retornar para o nome anterior apos os testes)

#### npm run lint
Para ajudar a verificar a legibilidade do código, você pode utilizar o comando npm run lint 
</details>


<details>
  <summary><strong>API Online e rotas</strong></summary><br />
<a href="https://apideinvestimentoslisboa.herokuapp.com/">https://apideinvestimentoslisboa.herokuapp.com/</a>

No link acima você consegue a lista de todas as rotas disponíveis na API, porem aqui vou citar apenas as mais importantes.

#### POST `/conta`
Rota para cadastro do usuário
Ela espera receber um objeto na requisição contendo nome, sobrenome, e-mail e senha
```
{
  nome: 'lucas',
  sobrenome: 'macedo',
  email: 'lucasmacesgmail.com',
  senha: '12345678', 
}
```
o seu retorno é um objeto com um token, responsável pela autenticação necessitaria para acessar as demais rotas.

#### POST `/login/usuario`
Rota para efetuar o login do usuário
Ela espera receber um objeto na requisição contendo e-mail e senha
```
{
  email: 'joaosilva@gmail.com',
  senha: '12345678',
}
```
o seu retorno é um objeto com um token, responsável pela autenticação necessitaria para acessar as demais rotas.

#### POST `/investimentos/comprar`
Rota para fazer compras de ativos
Ela espera receber uma autenticação por token, e um objeto com codAtivo e qtdeAtivo
```
{
  codAtivo: 9,
  qtdeAtivo: 20,
}
```
o seu retorno é um objeto com codAtivo, qtdeAtivo e valor
```
{
  codAtivo: 9,
  qtdeAtivo: 20,
  valor: '8.38'
}
```

#### POST `/conta/deposito`
Rota para depositar valores na conta do usuário
Ela espera receber uma autenticação por token, e um objeto com valor 
```
{
  valor: '1500,00',
}
```
O seu retorno é um objeto com o saldo
```
{
  saldo: '2500,00',
}
```
</details>

Muito obrigado por ter me acompanhado até aqui. 
Para entrar em contato, pode me procurar no meu e-mail: lucaslisboamotta@gmal.com
ou no meu <a href="https://www.linkedin.com/in/lucas-lisboa-motta/">LinkedIn</a>










