const PI = 3.14;
let radius = 3;

let area = 0;

console.log(area);

radius = 20;

area = PI * radius * radius;
console.log(area);

const one = 1;
const two = 2;

let result = one + two;
console.log(result);

result = one + Number(two);
console.log(result);

//scope
let global = "I'm a global variable";

function exampleFunction() {
  let block = "I'm a local variable";
  console.log(global); // Accessible
  console.log(block); // Accessible
}