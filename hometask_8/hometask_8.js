function Animal(name) {
    this._name = name;
    this._foodAmount = 50;
    this._formatFoodAmount = function () {
        return (this._foodAmount + ' гр.');
    }


    this._feed = function () {
        return ('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
    };

    this.dailyNorm = function (amount) {
        if (!arguments.length) return this._formatFoodAmount();

        if (amount < 50) {
            throw new Error("Значение должно быть больше 50");
        }
        if (amount > 500) {
            throw new Error("Нельзя дать корма больше, чем 500 гр.");
        }

        this._foodAmount = amount;
    };
}

function Cat(name) {
    Animal.apply(this, arguments);

    var animalFeed = this._feed;
    this.feed = function () {
        console.log(animalFeed.apply(this) + '\nКот доволен ^_^');
        return this;

    }

    this.stroke = function () {
        console.log('Гладим кота.');
        return this;
    }

}

var barsik = new Cat('Barsik');

console.log(barsik.name);

console.log(barsik.dailyNorm());
console.log(barsik.feed());

console.log(barsik.dailyNorm(600));
console.log(barsik.feed());

console.log(barsik.dailyNorm(250));
console.log(barsik.feed());

barsik.stroke().feed().stroke().stroke().feed();
barsik = null;