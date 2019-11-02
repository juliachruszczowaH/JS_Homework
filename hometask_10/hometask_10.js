//Домашнее задание:

/* Задание 1:
   Переписать задачу с использованием перебирающего метода массивов:
function filterNumbersArr(numbers) {
 var newArr = [];

 for (var i = 0; i < numbers.length; i++) {
   var el = numbers[i];

   if (el > 0) {
     newArr[newArr.length] = el;
   }
 }

 return newArr;
}
console.log(filterNumbersArr([-1, 0, 2, 34, -2]));
*/

function filterNumbersArr(numbers) {
    return numbers.filter(function (el) {
        return el > 0
    })
}

console.log(filterNumbersArr([-1, 0, 2, 34, -2]));


//  Задание 2:
//    Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.
function findFirstPositive(numbers) {
    return numbers.find(function (el) {
        return el > 0
    });
}

console.log(findFirstPositive([-1, 0, -2, 34, 2]));
console.log(findFirstPositive([-1, 10, -2, 34, 2]));
console.log(findFirstPositive([-1, 0, -2, -34, 0, 12]));


//  Задание 3:
//    Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
//    Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).
//
//    Функция должна работать следущим образом:
console.log(isPalindrome('шалаШ')); // true
console.log(isPalindrome('привет')); // false


function isPalindrome(word) {
    return word.toLowerCase() === word.toLowerCase().split('').reverse().join('');
}

//  Задание 4:
//    Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
//    Регистр в словах учитываться не должен.
//
//    Функция должна работать следущим образом:
console.log(areAnagrams('кот', 'отк')); // true
console.log(areAnagrams('кот', 'атк')); // false
console.log(areAnagrams('кот', 'отко')); // false

function areAnagrams(a, b) {
    return a.toLowerCase().split('').sort().join('') === b.toLowerCase().split('').sort().join('');
}

//  Задание 5:
//    Написать функцию, которая будет разбивать массив на под-массивы определенной длины.
//
//    Функция должна работать следущим образом:
console.log(divideArr([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]

function divideArr(arr, p) {
    var temp = [];
    do {
        temp.push(arr.splice(0, p));
    } while (arr.length > p);
    temp.push(arr);
    return temp;
}