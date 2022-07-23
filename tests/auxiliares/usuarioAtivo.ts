const usuarioAtivo = [
  {
    id: 2,
    nome: "Maria",
    sobrenome: "Oliveira",
    email: "mariaoliveira@yahoo.com.br",
    ativos: [
      {
        ativo: {
          id: 1,
          sigla: "GGBR4",
          nome: "GERDAU",
          quantidade: 300,
          valor: "21.77"
        },
        quantidade: 100,
        precoMedioDeCompra: "20.00"
      },
      {
        ativo: {
          id: 4,
          sigla: "MGLU3",
          nome: "MAGAZINE LUIZA",
          quantidade: 500,
          valor: "2.78"
        },
        quantidade: 100,
        precoMedioDeCompra: "22.00"
      },
      {
        ativo: {
          id: 5,
          sigla: "ITUB4",
          nome: "BANCO ITAU UNIBANCO",
          quantidade: 2000,
          valor: "20.79"
        },
        quantidade: 50,
        precoMedioDeCompra: "17.00"
      }
    ]
  },
  {
    id: 3,
    nome: "Renato",
    sobrenome: "Magalhães",
    email: "renatomagalhaes@outlook.com",
    ativos: [
      {
        ativo: {
          id: 6,
          sigla: "BBDC3",
          nome: "BRADESCO",
          quantidade: 90,
          valor: "13.75"
        },
        quantidade: 50,
        precoMedioDeCompra: "10.00"
      },
      {
        ativo: {
          id: 7,
          sigla: "VALE3",
          nome: "VALE",
          quantidade: 250,
          valor: "68.37"
        },
        quantidade: 5,
        precoMedioDeCompra: "100.00"
      },
      {
        ativo: {
          id: 8,
          sigla: "BEEF3",
          nome: "MINERVA",
          quantidade: 150,
          valor: "13.35"
        },
        quantidade: 100,
        precoMedioDeCompra: "8.50"
      }
    ]
  }
];

export default usuarioAtivo;
