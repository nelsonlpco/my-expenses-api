#language:pt

Funcionalidade: Api para gerenciamento de categorias
Eu como cliente consumidor do serviço de categorias deve conseguir fazer a gestão necessária
para utilização das mesmas como agregadoras de despesas.

Cenário: Deve ser possível cadastrar, listar e excluir categorias
  Dado que consumo o serviço "/category" postando os seguintes dados:
    | description |
    | Mercado     |
    | Comida      |
    | Transporte  |
  E ao consumir o serviço "/category" devo receber uma lista contendo os elementos:
    | description |
    | Comida      |
    | Mercado     |
    | Transporte  |
  Então consumo o serviço "/category" para excluir os registros:
    | category    |
    | Comida      |
    | Mercado     |
    | Transporte  |
