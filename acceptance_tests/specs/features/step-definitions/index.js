const expect = require('expect');
const {Given, When, Then} = require('@cucumber/cucumber');

const { httpClient }  = require('../../../utils/httpClient');
const {dataTableToJson} = require('../../../utils/parser');
const { request } = require('express');

Then('ao consumir o serviço {string} devo receber uma lista contendo os elementos:', async function (service, dataTable) {
  const expectedValue = dataTableToJson(dataTable);

  const result = await httpClient.get(service);
  const data = result.data;

  expect(data).toEqual(expectedValue)
});


Given('que consumo o serviço {string} devo receber uma lista como:', async function (service, dataTable) {
  const expectedValue = dataTableToJson(dataTable);

  const result = await httpClient.get(service);
  const data = result.data;

  expect(data).toEqual(expectedValue)
});


Given('que consumo o serviço {string} postando os seguintes dados:', async function (service, dataTable) {
  const registers = dataTableToJson(dataTable);
  const expectedStatus = new Array(registers.length).fill(200);

  const requests = registers.map(register => httpClient
    .post(service, register)
    .then(d => d.status)
    .catch(e =>  e.response.status)
  );

  const result = await Promise.all(requests);

  expect(result).toEqual(expectedStatus)
});

Then('consumo o serviço {string} para excluir os registros:', async function (service, dataTable) {
  const registers = dataTableToJson(dataTable);
  const expectedStatus = new Array(registers.length).fill(200);

  const requests = registers.map(register => httpClient
    .delete(`${service}/${register.category}`)
    .then(d => d.status)
    .catch(e =>  e.response.status)
  );

  const result = await Promise.all(requests);

  expect(result).toEqual(expectedStatus)
})
