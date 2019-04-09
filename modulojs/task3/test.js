// var myArray = [];

// for (let i = 0; i < 10; i++) {
//   myArray.push(Math.floor(Math.random()*10));
// }

// console.log(myArray.length);
// console.log(myArray);
// let result=theNLowest(myArray,3);
// console.log("the lowest is: " + result +"lenght "+ result.length);
// for (let i = 0; i < result.length; i++) {
//   console.log(result[i]);
  
// }

// function theNLowest(somearray,number){
//   let a=somearray.length*number/100; //cuantos qui
//   console.log("the value of % is "+ a);
//   somearray.sort((a, b) => b - a);// ordeno para menores (a-b) para mayores
//   let aux=somearray.splice(somearray.length-a); //corto
//   let value=aux[0]; //que busco en lo que queda
//   while(somearray.includes(value)){ //busco repes
//     aux.push(somearray[somearray.length-1]);
//     somearray.splice(somearray.length-1);
//   }
//   return aux;
// }

let n=13424555;
function descendingOrder(n){
return parseInt(n.toString().split("").sort().reverse().join(""));
}

let a = descendingOrder(n);
console.log(a);