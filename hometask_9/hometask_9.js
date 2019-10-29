/*
TASK1
 */
function Animal(name) {
    this.name = name;
    this._foodAmount = 50;
}

Animal.prototype._formatFoodAmount = function () {
    return (this._foodAmount + ' гр.');
}
Animal.prototype.feed = function () {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
};

Animal.prototype.dailyNorm = function (amount) {
    if (!arguments.length) return this._formatFoodAmount();

    if (amount < 50) {
        throw new Error("Значение должно быть больше 50");
    }
    if (amount > 500) {
        throw new Error("Нельзя дать корма больше, чем 500 гр.");
    }

    this._foodAmount = amount;

}

function Cat(name) {
    Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function () {
    Animal.prototype.feed.apply(this, arguments);
    console.log('Кот доволен ^_^');
    return this;
}

Cat.prototype.stroke = function () {
    console.log('Гладим кота.');
    return this;
}


var barsik = new Cat('Barsik');

console.log(barsik.name);

console.log(barsik.dailyNorm());
barsik.feed();

barsik.dailyNorm(100);
barsik.feed();
barsik.stroke().feed().stroke().stroke().feed();
barsik.dailyNorm(350);
console.log(barsik.dailyNorm());
barsik.feed();

barsik.feed().stroke().feed().feed().stroke().stroke().feed();
barsik = null;

/*
TASK 2
Написать функцию глубокого клонирования объектов. Клонироваться должны значения всех типов данных (+ массивы
и функции), а также любого уровня вложенности. Метод isArray использовать можно.
 */
var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function () {
        alert('Hello');
    }
};

function deepClone(obj) {
    var temp;
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Array) {
        temp = [];

        for (var i = 0; i < obj.length; i++) {
            temp[i] = deepClone(obj[i]);
        }
        return temp;
    }

    if (obj instanceof Object) {
        temp = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) temp[key] = deepClone(obj[key]);
        }
        return temp;
    }

    return temp;
}

var clonedObj = deepClone(initialObj);

// clonedObj.object.object2.array2[1].name = 'Vasya';
// clonedObj.array.push(2);
// initialObj.test="hi";

console.log(initialObj);
console.log(clonedObj);

/*
TASK 3
Написать функцию глубокого сравнения объектов. Сравниваться должны значения всех типов, а также любого уровня
вложенности. Хорошо протестировать работу функции.
 */

function deepCompare(obj1, obj2) {
    if (typeof obj1 === typeof obj1) {
        if (typeof obj1 == "object" && obj1 != null && obj1 !== 'function') {
            for (var k in obj2) {
                if (!obj1.hasOwnProperty(k)) return false;
            }
            var temp = true;
            for (var key in obj1) {

                if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                    if (!deepCompare(obj1[key], obj2[key])) {
                        temp = false;
                    }
                } else {
                    temp = false;
                }
            }

            return temp;
        } else if (obj1 === 'function') {
            return obj1.toString() === obj2.toString();
        } else {
            return obj1 === obj2;
        }
    } else {
        return false;
    }
}


console.log(deepCompare(initialObj, clonedObj));