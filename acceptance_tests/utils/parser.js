function dataTableToJson(dataTable) {
  const columns = dataTable.rawTable[0];
  const rows = dataTable.rawTable;
  const result = [];

  const totalColumns = columns.length;
  const totalRows = rows.length;

  for(let row  = 1; row < totalRows; row++){
    let newRow = {};

    for(let column = 0; column < totalColumns; column ++) {
      newRow[columns[column]] = rows[row][column];
    }

    result.push(newRow);
  }

  return result;
}

module.exports = {
  dataTableToJson,
}
