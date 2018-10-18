/*
    Class Pattern
    - Stack traces will show "Dog" instead of an anonymous object
*/
var staticVariable = 0;
function Dog(breed, bark = "bark"){
    staticVariable++;
    this.breed = breed;
    this.bark = bark;
    console.log('breed :', breed);
}
Dog.prototype.doBark = function(){
    console.log(this.bark);
}
Dog.prototype.howl = function(){
    console.log(staticVariable);
}
// module.exports = Dog;


var minrow = new Dog("poodle", "arf");
minrow.doBark();
minrow.howl();

/*
    Inheritance
*/
function HuntingDog(nose){
    Dog.apply(this, Array.prototype.slice.call(arguments));
}
HuntingDog.prototype = new Dog();

var flash = new HuntingDog("bassette hound");
flash.doBark();
flash.howl();

// ES6 Implmenetation
class Animal {

    constructor(name = 'anonymous', legs = 4, noise = 'nothing') {

        this.type = 'animal';
        this.name = name;
        this.legs = legs;
        this.noise = noise;

    }

    speak() {
        console.log(`${this.name} says "${this.noise}"`);
    }

    walk() {
        console.log(`${this.name} walks on ${this.legs} legs`);
    }

}

var boar = new Animal();
boar.speak();