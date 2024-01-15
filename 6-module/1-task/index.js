/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.createTable(rows);
  }
  createTable(rows) {
    this.elem.insertAdjacentHTML('beforeend', 
    '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>');

    let tbody = document.createElement('tbody');

    for (let row of rows) {
      let tr = document.createElement('tr');
      
      tr.insertAdjacentHTML('beforeend',
        `<td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>`
        )
      
      tbody.appendChild(tr);

    this.elem.appendChild(tbody)
    }

    this.elem.addEventListener('click', function(event) {
      let tr = event.target.closest('button');
      
      if (tr) {
        event.target.closest('tr').remove();
      }
    })

  }
  }
