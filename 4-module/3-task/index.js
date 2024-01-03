function highlight(table) {
  for (let row of table.rows) {
    let status_cell = row.cells[3];
    if (status_cell.hasAttribute('data-available')) {
      let status = status_cell.dataset.available;
      if (status === 'true') {
        row.classList.add('available')
      } else {
        row.classList.add('unavailable')
      }
    } else {
      row.hidden = true;
    }

    let gender = row.cells[2].textContent;
    if (gender == 'm') {
      row.classList.add('male');
    } else if (gender == 'f') {
      row.classList.add('female')
    }

    let age = +row.cells[1].textContent;
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
}
}