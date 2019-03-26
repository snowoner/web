var myName = "Oscar";
console.log("My name is : " + myName);

var age = 28;

console.log("I'm " + age + " years old");

var ignasiAge = 32;

var ageDif;

ageDif = age - ignasiAge;

console.log("My age minus Ignasi age is :" + ageDif);

if (age > 21) {
  console.log("You are older than 21");
}
else if (age < 21) {
  console.log("You are not older than 21");
}
else {
  console.log("You have 21 years old..")
}

if (age > ignasiAge) {
  console.log("Ignasi is younger than you");
}
else if (age < ignasiAge) {
  console.log("Ignasi is older than you");
}
else {
  console.log("You have the same age as Ignasi");
}

var students = ["Alumne1", "Alumne2", "Alumne3", "Oscar", "Sergi", "Dani", "Patricia", "Samu", "Albert", "Raul", "Laura", "z"];

console.log(students[1]);
console.log(students[students.length - 1]);
for (var i = 0; i < students.length; ++i) {
  console.log(students[i]);
}


var ages = ["21", "22", "23", "28", "25", "26", "24", "27", "26", "50", "24", "23"];

console.log("Lets print even :");
var i = 0;
while (i < ages.length) {
  if (ages[i] % 2 !== 0) { console.log(ages[i]); }
  ++i;
}


function theLowest(arraylist) {
  var thelow = 100;
  for (var i = 0; i < arraylist.length; ++i) {
    if (!isNaN(arraylist[i])) {
      if (arraylist[i] <= thelow) {
        thelow = arraylist[i];
      }
    }
  }
  return thelow;
}

console.log("The lowest is : " + theLowest(ages));

function theBiggest(arraylist) {
  var thebig = 0;
  for (var i = 0; i < arraylist.length; ++i) {
    if (!isNaN(arraylist[i])) {
      if (arraylist[i] > thebig) {
        thebig = arraylist[i];
      }
    }
  }
  return thebig;
}

console.log("The biggest is : " + theBiggest(ages));

var array = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100]; 
var ind = 1;

function positionOfArray(array, index) {
  return array[index];
}
console.log("In the position " + ind + "we can found " + positionOfArray(array, ind));


// function repetidos(array) {
//   // array.sort(function (a, b) { return a - b }); //asc
//   var repes = [];
//   for (var i = 0; i < array.length; i++) {
//     valor = array[i];
//     for (var j = i + 1; j < array.length; j++) {
//       if (array[j] == valor) {
//         if (!(positionOfArray(repes, repes.length - 1) == valor)) {
//           repes.push(array[j]);
//         }
//       }
//     }

//   }
//   return repes;
// }

function repetidos2(array) {
  var repes = [];
  for (let i = 0; i < array.length; i++) {
    valor = array[i];
    for (let j = i+1; j < array.length; j++) {
      if (array[j] == valor) {
        var repe = false;
        for (let k = 0; k < repes.length; k++) {
          if (valor == repes[k]) { //  array[j] == valor
            repe = true;
          }
        }
        if (!repe) {
          repes.push(parseInt(array[j]));
        }
      }
    }
  }

  repes.sort(function (a, b) { return a - b }); //asc
  return repes;
}

function repetidos3(array){
  var repes=[];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if(array[i]==array[j]){
        if(!repes.includes(array[i])){
          repes.push(array[i]);
        }
      }
      
    }
    
  }
}

escribe(repetidos2(array));


// escribe(repetidos(array));


function escribe(algo) {
  document.getElementById("ye").innerHTML = algo;
}

// escribe(repetidos(array));


myColor = ["Red", "Green", "White", "Black"];

function juntar(array) {
  var text = array.join('');
  escribe(text);
}

// juntar(myColor);

function reverseNumber(numbers) {
  numbers = numbers + "";
  numbers = numbers.split("").reverse().join("");

  escribe(parseInt(numbers));
}

var number = 12345;
// reverseNumber(number);

// Exercise 2: Write a JavaScript function that returns a string in alphabetical order.
//  For example, if x = 'webmaster' then the output should be 'abeemrstw'.  
// Punctuation and numbers aren't passed in the string.

function ordenaletras(texto) {
  var ordenado;
  var re = /\W+/;
  var re2 = /\d+/;
  ordenado = texto.split("").sort().join("");
  ordenado = ordenado.replace(re, '');
  ordenado = ordenado.replace(re2, '');
  escribe(ordenado);
}
var texto = "webma23ster23";
// ordenaletras(texto);


// Exercise 3: Write a JavaScript function that converts the first letter of every word to uppercase. 
// For example, if x = "prince of persia" then the output should be "Prince Of Persia".

function toUpp(texto) {
  var arraypalabras;
  arraypalabras = texto.split(" ");
  console.log(arraypalabras);
  for (let i = 0; i < arraypalabras.length; i++) {
    arraypalabras[i] = arraypalabras[i].replace(/^[a-z]/, arraypalabras[i][0].toUpperCase());
    console.log(arraypalabras[i][0]);
  }
  return arraypalabras.join(" ");
}

var texto = "la niña del exorcista";
// escribe(toUpp(texto));



// Exercise 4: Write a JavaScript function that finds the longest word in a phrase.
// For example, if x = "Web Development Tutorial", then the output should be "Development".


function theLongest(text) {
  var longest;
  var arraypalabras;
  arraypalabras = text.split(" ");
  var size = arraypalabras[0].length;
  for (let i = 1; i < arraypalabras.length; i++) {
    if (arraypalabras[i].length >= size) {
      size = arraypalabras[i].length;
      longest = arraypalabras[i];
    }
  }
  return longest;
}

var array = "Web Development Tutorial";
// escribe(theLongest(array));

