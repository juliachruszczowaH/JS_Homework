var body = document.getElementsByTagName('body')[0].appendChild(document.createElement('div')),
  button,
  items,
  tableContainer;
generateForm();

/* function to generate inputfield */
function generateInputBlock(node, lbl) {
  var field = document.createElement('div'),
    fieldLabel = document.createElement('label'),
    input = document.createElement('input'),
    errLabel = document.createElement('span');
  input.className = `${lbl}-inputfield`;
  input.setAttribute('type', 'text');
  errLabel.className = `${lbl}-err hidden`;
  fieldLabel.innerText = `${lbl.toUpperCase()}  :`;
  errLabel.innerText = '*Integer number from 1 to 10 is expected. Please, provide correct value. ';
  node.appendChild(field);
  field.appendChild(fieldLabel);
  field.appendChild(input);
  field.appendChild(errLabel);
  input.addEventListener(
    'keyup',
    function(e) {
      e.target.setAttribute('data-verified', verifyInput(e.target.value));
      e.target.nextElementSibling.classList.add('hidden');
    },
    false
  );
}

/* function to generate input block */

function generateForm() {
  body.className = 'main-container';
  var form = body.appendChild(document.createElement('div'));
  form.className='form-container';
  form.innerText = 'Insert values to create chess board (X*Y)';
  generateInputBlock(form, 'x');
  generateInputBlock(form, 'y');
  button = form.appendChild(document.createElement('button'));
  items = form.getElementsByTagName('input');
  button.innerText = 'Create';
  tableContainer = body.appendChild(document.createElement('div'));
  disableButton();
  form.addEventListener(
    'keyup',
    function(e) {
      var flag = 0;
      for (var i = 0; i < items.length; ++i) {
        items[i].value.trim() ? ++flag : --flag;
      }
      flag == 2 ? enableButton() : disableButton();
      flag = 0;
    },
    false
  );
  button.addEventListener(
    'click',
    function(e) {
      for (var i = 0; i < items.length; ++i) {
        if (items[i].dataset.verified == 'false') {
          items[i].nextElementSibling.classList.remove('hidden');
          clearInput(items[i]);
          disableButton();
          e.stopImmediatePropagation();
        }
      }
    },
    false
  );
  button.addEventListener(
    'click',
    function() {
      tableContainer.innerHTML = '';
      drawChessTable(items[0].value, items[1].value);
      clearInput(items[0]);
      clearInput(items[1]);
      disableButton();
      var tab = document.getElementsByTagName('table')[0];
      tab.addEventListener(
        'click',
        function(event) {
          var target = event.target;
          if ((target.tagName = 'TD')) {
            revertCellsColor();
          }
        },
        false
      );
    },
    false
  );
}

/* function to create table */
var drawChessTable = function(x, y) {
  tableContainer.className = 'table-container';
  tableContainer.innerText = 'Click any cell to revert colors';
  var table = tableContainer.appendChild(document.createElement('table')),
    tbody = table.appendChild(document.createElement('tbody'));
  for (var j = 1; j <= y; j++) {
    var row = tbody.appendChild(document.createElement('tr'));
    for (var i = 1; i <= x; i++) {
      var cell = row.appendChild(document.createElement('td'));
      if (i % 2 == j % 2) {
        cell.className = 'dark';
      } else {
        cell.className = 'light';
      }
    }
  }

  return tbody;
};

/* furnction to revert colors of cells */
function revertCellsColor() {
  var cells = document.getElementsByTagName('table')[0].getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.toggle('dark');
    cells[i].classList.toggle('light');
  }
}

function verifyInput(txt) {
  var val = +txt;
  return val > 0 && val < 11 && (val ^ 0) === val;
}

function disableButton() {
  button.setAttribute('disabled', 'true');
}

function enableButton() {
  button.removeAttribute('disabled');
}

function clearInput(input) {
  input.value = '';
}
