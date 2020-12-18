#language:pt

Funcionalidade: Api para gerenciamento de categorias
Eu como cliente consumidor do serviço de categorias deve conseguir fazer a gestão necessária
para utilização das mesmas como agregadoras de despesas.

Contexto: Remoção de categorias para o cenário
  Dado que consumo o serviço "/category" para excluir os registros:
    | category    |
    | Comida      |
    | Mercado     |
    | Transporte  |


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

Cenário: Não deve ser possível cadastrar categorias de mesma descrição
  Dado que consumo o serviço "/category" postando os seguintes dados:
    | description |
    | Mercado     |
  Então ao consumir o serviço "/category" postando "Mercado" devo receber como status da requisição o código 409
