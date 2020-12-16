#language:pt

Funcionalidade: Api para gerenciamento de categorias
Eu como cliente consumidor do serviço de categorias deve conseguir fazer a gestão necessária
para utilização das mesmas como agregadoras de despesas.

Cenário: Deve ser possível cadastrar e listar novas categorias
  Dado que consumo o servico "/category" postando os seguintes dados:
    | description |
    | Mercado     |
    | Comida      |
    | Transporte  |
  Então ao consumir o serviço "/category" devo receber uma lista contendo os elementos:
    | description |
    | Comida      |
    | Mercado     |
    | Transporte  |
