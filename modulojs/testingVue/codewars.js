function longest(s1, s2) {
  let s3 = new Set(s1.split(""));
  let s4 = new Set(s2.split(""));
  s3.forEach(letter => {
    if (!s4.has(letter)) {
      s4.add(letter);
    }
  });
  return [...s4].sort().join("");
}
let a = "xyaabbbccccdefww";
let b = "xxxxyyyyabklmopq";

function highAndLow(numbers) {
  let aux = numbers.split(" ").map(Number);
  return Math.max(...aux) + " " + Math.min(...aux);
}
// console.log(highAndLow("1 2 3 4 5"));

// console.log("solution::>>");
// console.log(longest(a, b));

function friend(friends) {
  return friends.filter(friend => {
    return friend.length == 4;
  });
}
// console.log(friend(["Ryan", "Kieran", "Mark"]));

function order(words) {
  let orderedWords = [];
  if(words.length>0){
    let wars=words.split(" ");
    let x=1;
    for (let i = 0; i < wars.length; i++) {
      wars.forEach(el=>{
        if(el.includes(x)){orderedWords.push(el)};
      });
      x++;
    }
  }
  return orderedWords.join(" ");
}
// console.log(order("is2 Thi1s T4est 3a"));

var number = function(busStops){
  let passagers=0;
  busStops.forEach(el=>{
    passagers+=el[0]-el[1];
  })
  return passagers>0?passagers:0;
}

// console.log(number([[10,0],[3,5],[5,8]]));

