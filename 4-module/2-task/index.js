function makeDiagonalRed(table) {
  let cells_number = table.rows.length;
  for (let i = 0; i < cells_number; i += 1) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
