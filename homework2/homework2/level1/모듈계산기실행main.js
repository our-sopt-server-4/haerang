// const sum = require("./sum");

// var result = sum(1, 3);
// console.log("Sum result:", result);

// const sumModule = require("./sum");
// var result = sumModule.sum(1, 3);
// console.log("Sum result:", result);

const calculator = require("./module계산기");

var add = calculator.add(2, 3);
var substract = calculator.substract(3, 2);
var mul = calculator.multiply(2, 3);
var divide = calculator.divide(10, 2);

console.log(`sum(2,3): ${add}`);
console.log(`substract(3,2): ${substract}`);
console.log(`multiply(2,3): ${mul}`);
console.log(`divide(10,2): ${divide}`);
