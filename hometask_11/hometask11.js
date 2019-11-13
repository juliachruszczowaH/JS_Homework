// Домашнее задание:
//     Задание 1:
// Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.

function transformArray(arr) {
    return arr.map(function (item) {
        var temp = {};
        temp.name = item;
        return temp;
    })
}

console.log(transformArray(['Vasya', 'Petya', 'Oleg']));
// Задание 2:
// Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
//     Для решения использовать перебирающий метод массивов.

function returnCurrentTime(arr) {
    return arr.reduce(function (res, item) {
        return res + ' : ' + item;
    }, 'Текущее время');
}

console.log(returnCurrentTime(['00', '13', '24']));

//     Задание 3:
// Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
// должно быть "топорным".

function getVowelsNumber(string) {
    var vowels = ['a', 'e', 'i', 'o', 'u', 'а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    var counter = 0;
    string.split('').forEach(function (item) {
        if (vowels.join('').indexOf(item.toLowerCase()) >= 0) ++counter;
    });
    return counter;

}

console.log(getVowelsNumber('А не должно быть "топорным"'));

//     Задание 4:
// Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
//     восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
// вопросительным знакам - убрав их - разрешается использовать регулярное выражение в методе split).
// Для каждого из предложений вывести текст предложения и рядом количество букв в нем (без учета пробелов, запятых
// и т.д. - именно букв).


function counterLetters(txt) {
    var arr = txt.split(/[.|!|\\?]/);
    arr.filter(function (el) {
        return el.length > 0;
    }).forEach(function (item) {
        var sent = item.trim();
        console.log(sent + ' -> ' + +sent.split(/[^A-Za-zА-Яа-я0-9_]/).join('').length);
    })
}

console.log(counterLetters('Написать функцию, которая будет принимать текст в качестве параметра! У текста должны быть пробелы, точки, запятые, восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и вопросительным знакам - убрав их - разрешается использовать регулярное выражение в методе split)'));

// Задание 5 *:
// Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать
// информацию вида:
//     "Максимальное число повторений у слова "привет" - 8"
// При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
//     Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное
// выражение в методе split.

//Способ 1
function counterRepeatedWord(txt) {

    var arr = txt.split(/[^A-Za-zА-Яа-я]/);
    var o = {};
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item !== '') {
            var count = 0;
            for (var j = 0; j < arr.length; j++) {
                if (item === arr[j]) ++count;
            }
            o[count] = item;
            temp.push(count)
        }
    }
    var max = bubbleSort(temp)[0];
    return (`"Максимальное число повторений у слова "${o[max]}" - ${max}`);
}

function bubbleSort(arr) {
    var length = arr.length;
    for (var i = 0; i < length - 1; i++) {
        for (var j = 0; j < (length - 1 - i); j++) {
            if (arr[j] < arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

console.log(counterRepeatedWord('aaa ggg bbb rrr aaa ddd bbb ggg bbb aaa sss bbb bbbb'));

//Способ 2
function counterRepeatedWord(txt) {

    var arr = txt.split(/[^A-Za-zА-Яа-я]/);
    var o = {};
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item !== '') {
            var count = 0;
            for (var j = 0; j < arr.length; j++) {
                if (item === arr[j]) ++count;
            }
            o[count] = item;
            temp.push(count)
        }
    }
    var max = Math.max.apply(null, temp);
    /*
    вот откуда взят код
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    */
    return (`"Максимальное число повторений у слова "${o[max]}" - ${max}`);
}

console.log(counterRepeatedWord('aaa ggg bbb rrr aaa ddd bbb ggg bbb aaa sss bbb bbbb'));
