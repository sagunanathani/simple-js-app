//see a familiar pop-up
//alert("Hello Simple JS App");

let myName = "sagu k";
document.write(myName);

myName = "sagu kathiriya";
document.write(myName);

let favoriteFood = "pizza";
document.writeln(favoriteFood);

let names = "sagu";
let age = 27;
document.writeln("My name is " + names + " and I'm " + age + " years old!");
console.log("My name is " + myName + " and I'm " + age + " years old!");

let name = 'John';
let welcomeMessage1 = "Hello, I'm";
let welcomeMessage2 = 'and I say to you: "Hello!"';
console.log(welcomeMessage1 + ' ' + name + ' ' + welcomeMessage2);
console.log(`${welcomeMessage1} ${name} ${welcomeMessage2}`);

let car = {
  color: 'red',
  mileage: 10
};
console.log(car.color);
car.mileage= 12;
console.log(car.mileage);
delete car.mileage;

let currentUserName = 'sam';
let userAges = {
  anne: 27,
  sam: 112,
  megan: 97
};
userAges[currentUserName] = 'sagu';
console.log(userAges[currentUserName]);