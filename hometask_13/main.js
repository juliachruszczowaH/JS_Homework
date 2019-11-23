var button = document.getElementsByClassName('button_cell')[0];
    table = document.getElementsByTagName('tbody')[0];

button.addEventListener('click', addNewRow, false);

table.addEventListener('click', function (event) {
    var target = event.target;

    if (target.tagName = 'TD') {
        var txt = target.innerText.trim();

        if (txt) {
            target.innerText = '';
            var input = createInput(target);

            input.focus();
            input.value = txt;
        } else {
            createInput(target).focus();
        }
    }
    event.stopPropagation();
}, false);

function addNewRow() {
    var row = document.createElement('tr');
    row.innerHTML = "<tr><td></td><td></td><td></td></tr>";

    document.getElementsByTagName('tbody')[0].insertAdjacentElement('afterbegin', row);
}

function createInput(node) {
    var field = document.createElement('input');

    field.setAttribute('type', 'text');

    field.addEventListener('blur', function (e) {
        var text = field.value;

        if (text) {field.parentElement.innerText = text};
        field.remove();
        e.stopImmediatePropagation();
    }, false);

    field.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) this.blur();
    }, false);

    return node.appendChild(field);
}