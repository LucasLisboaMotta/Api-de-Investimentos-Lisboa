const docAPI = `
<body>
  <h1>API de Investimentos Lisboa</h1>
  <div>
    <h2>Sobre</h2>
    <p>Está é uma API criada com o intuito de simular uma pequena corretora de ações, que permite gerenciar dados de clientes, gerentes e ativos.</p>
    <p>Para saber mais acesse o <a href="https://github.com/LucasLisboaMotta/Api-de-Investimentos-Lisboa">repositório do projeto</a> no GitHub </p>
  </div>
  <div>
    <h2>Como Utilizar</h2>
    <p>Esta API utiliza validações pelo JWT. Portanto, ao fazer uma requisição é necessário estar logado em uma conta usuária ou uma conta gerente. </p>
    <p>
      Para testar a API você pode usar as contas de exemplo:
      <br>Usuário - email: joaosilva@gmail.com, senha: 12345678
      <br>Gerente - email: carlossouza@ig.com, senha: 90908080 
    </p>
  </div>
  <div>
    <h2>Rotas disponíveis</h2>
    <div>
      <h3>Login</h3>
          <h4>POST /login/gerente</h4>
            <p>É necessário passar um body com os campos 
              Email e 
              Senha<br><br>
              O retorno é um objeto com a chave token</p>
          <h4>POST /login/usuario</h4>
           <p>É necessário passar um body com os campos 
            Email e
            Senha<br><br>
            O retorno é um objeto com a chave token</p>
      </div>
      <div>
        <h3>Investimentos</h3>
        <h4>GET /investimentos</h4>
        <p>Rota para pegar o historico de investimentos do usuário<br><br>
          É necessária uma autenticação com token de usuário<br><br>
          O retorno é o histórico de investimentos em formato de array de objetos, cada objeto contendo as chaves ativo, quantidade, data, tipoDeTransacao e precoUnitario.</p>
        <h4>POST /investimentos/vender</h4> 
        <p>
          Rota para venda de ativos do usuário<br><br>
          É necessária uma autenticação com token de usuário, e um body contendo codAtivo e qtdeAtivo
        <br><br>
        O retorno é um objeto com as chaves codAtivo, qtdeAtivo e valor
        </p>
        <h4>POST /investimentos/comprar</h4>
        <p></p>Rota para compra de ativos do usuário<br><br> 
        É necessária uma autenticação com token de usuário, e um body contendo codAtivo e qtdeAtivo
        <br><br>
        O retorno é um objeto com as chaves codAtivo, qtdeAtivo e valor
        </p>
        </div>
        <div>
          <h3>Ativos</h3>
          <h4>GET /atvios</h4>
          <p>Rota para pegar todos os ativos da API<br><br>
            É necessária uma autenticação com token de usuário ou de gerentes
            <br><br>
            O retorno são todos os ativos da API em um formato de array de objetos, contendo as chaves  id, sigla, nome, quantidade e valor
          </p>
          <h4>GET /atvios/:id</h4>
          <p>
            É necessária uma autenticação com token de usuário ou de gerentes, e o id do ativo desejado na url da requisição
            <br><br>
            o retorno é um objetos contendo as chaves  id, sigla, nome, quantidade e valor
          </p>
          <h4>GET /ativos/meusativos</h4>
          <p>Rota para pegar todos os ativos do usuário<br><br>
            É necessária uma autenticação com token de usuário
            <br><br>
            O retorno são todos os ativos do usuário em um formato de array de objetos, contendo as chaves  ativo, quantidade e precoMedioDeCompra
          </p>
          <h4>GET /ativos/recomendados</h4>
          <p>Rota para pegar todos os ativos recomendados pelo gerente do usuário<br><br>
            É necessária uma autenticação com token de usuário ou de gerentes
            <br><br>
            O retorno são todos os ativos recomendados pelo gerente em um formato de array de objetos, contendo as chaves  id, sigla, nome, quantidade, valor e nota
          </p>
          <h4>GET /ativos/populares</h4>
          <p>Rota para pegar os ativos mais negociados<br><br>
            É necessária uma autenticação com token de usuário ou de gerentes
            <br><br>
            O retorno são os ativos mais negociados em um formato de array de objetos, contendo as chaves  id, sigla, nome, quantidade e valor
          </p>
          <h4>GET /ativos/favoritos</h4>
          <p>Rota para pegar os ativos favoritos do usuário<br><br>
            É necessária uma autenticação com token de usuário
            <br><br>
            O retorno são todos os ativos favoritados pelo usuário em um formato de array de objetos, contendo as chaves  id, sigla, nome, quantidade e valor
          </p>
          <h4>POST /ativos/favoritos/:id</h4>
          <p>Rota para favoritar/desfavoritar ativo do usúario<br><br>
            É necessária uma autenticação com token de usuário
            <br><br>
            A rota possui a função de alternar, favorita o ativo caso não esteja favoritado, e desfavorita caso ja tenha favoritado
          </p>
          <h4>POST /ativos</h4>
          <p>Rota para o gerente cadastrar um novo ativo<br><br>
            É necessária uma autenticação com token de gerente, e um body com as chaves sigla, nome, quantidade e valor.
            <br><br>
            O retorno é um objeto com as chaves id, sigla, nome, quantidade e valor.
          </p>
          <h4>PUT /ativos/:id</h4>
          <p>Rota para o gerente atualizar um ativo já existente<br><br>
            É necessária uma autenticação com token de gerente, o id do ativo na url da requisição e um body com as chaves sigla, nome, quantidade e valor.
            <br><br>
            O retorno é um objeto com as chaves id, sigla, nome, quantidade e valor.
          </p>
        </div>
        <div>
          <h3>Conta</h3>
          <h4>GET /conta</h4>
          <p>
            Rota para recuperar as informações do usuário
            <br><br>É necessária uma autenticação com token de usuário
            <br><br>O retorno é o id, nome, sobrenome, email e saldo
          </p>
          <h4>GET /conta/historico</h4>
          <p>
            Rota para recuperar o historico bancario do usuário
            <br><br>É necessária uma autenticação com token de usuário
            <br><br>O retorno é um array de objetos, com as chaves  id,      usuarioId, valor, data e tipo.
          </p>
          <h4>POST /conta</h4>
          Rota para cadastras novo usuario
          <br><br>É necessário passar um body com as chaves nome, sobrenome, email e senha
          <br><br>O retorno é um objeto com a chave token
          <h4>PUT /conta</h4>
          Rota para atualizar um usuario
          <br><br>É necessária uma autenticação com token de usuário e passar um body com as chaves nome, sobrenome e senha
          <br><br>O retorno é um objeto com a chave token
          <h4>POST /conta/deposito</h4>
          <p>
            Rota para depositar valores na conta do usuário
            <br><br>É necessária uma autenticação com token de usuário e passar um body com a chave valor
            <br><br>O retorno é um objeto com a chave saldo
            <h4>POST /conta/saque</h4>
            <p>
              Rota para sacar valores da conta do usuário
              <br><br>É necessária uma autenticação com token de usuário e passar um body com a chave valor
              <br><br>O retorno é um objeto com a chave saldo
          </p>
          <h4>DELETE /conta</h4>
          <p>Rota para apagar todos os dados do Usuário
            <br><br>É necessária uma autenticação com token de usuário
          </p>
        </div>
        <div>
          <h3>Gerente</h3>
          <h4>GET /gerente</h4>
          <p>
            Rota para pegar as informações do Gerente
            <br><br>É necessária uma autenticação com token de gerente
            <br><br>O retorno é um objeto com as chaves id, nome, sobrenome e email
          </p>
          <h4>POST /gerente</h4>
          Rota para cadastras novo gerente
          <br><br>É necessária uma autenticação com token de gerente e um body com as chaves nome, sobrenome, email e senha
          <br><br>O retorno é um objeto com a chave token
          <h4>PUT /gerente</h4>
          Rota para atualizar um gerente
          <br><br>É necessária uma autenticação com token de gerente e passar um body com as chaves nome, sobrenome e senha
          <br><br>O retorno é um objeto com a chave token
          <h4>DELETE /gerente</h4>
          <p>Rota para apagar todos os dados do gerente
            <br><br>É necessária uma autenticação com token de gerente
          </p>
          <h4>GET /gerente/conta</h4>
          <p>
            Rota para pegar todos os usuarios sob responsabilidade do gerente
            <br><br>É necessária uma autenticação com token de gerente
            <br><br>O retorno é um array de objetos, com as chaves id, nome, sobrenome, email e ativos
          </p>
          <h4>GET /gerente/conta/:id</h4>
          <p>
            Rota para pegar todos os usuarios sob responsabilidade do gerente
            <br><br>É necessária uma autenticação com token de gerente, e passar pela url o id da conta do usuario
            <br><br>O retorno é um objeto com as chaves id, nome, sobrenome, email e ativos
          </p>
          <h4>POST /gerente/conta/:id</h4>
          <p>Rota para colocar ou remover um usuario das responsabilidades de um gerente
            <br><br>É necessária uma autenticação com token de gerente, e passar pela url o id da conta do usuario
          </p>
        </div>
  </div>
</body>
`;
export default docAPI;
