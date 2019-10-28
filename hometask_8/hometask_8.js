function Animal(name) {
    this.name = name;
    var foodAmount = 50;

    var self = this;
    function formatFoodAmount () {
        return (foodAmount + ' гр.');
    }

    this.feed = function () {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    };

    this.dailyNorm = function (amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 50) {
            throw new Error("Значение должно быть больше 50");
        }
        if (amount > 500) {
            throw new Error("Нельзя дать корма больше, чем 500 гр.");
        }

        foodAmount = amount;
    };
}

function Cat(name) {
    Animal.apply(this, arguments);

    var animalFeed = this.feed;
    this.feed = function () {
        animalFeed();
        console.log('Кот доволен ^_^');
        return this;
    };

    this.stroke = function () {
        console.log('Гладим кота.');
        return this;
    };

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