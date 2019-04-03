
function getGlanceData(){
  var sumVotesDemocrats=0;
  var sumVotesRepublicans=0;
  var sumVotesIndependents=0;
  for (let i = 0; i < data.results[0].members.length; i++) {
    const element = data.results[0].members[i];
    let temp ={}
    if(element.party=="R"){
      sumVotesRepublicans+=element.votes_with_party_pct;
      temp.first_name=element.first_name;
      temp.middle_name=element.middle_name;
      temp.last_name=element.last_name;
      temp.url=element.url;
      temp.state=element.state;
      temp.total_votes=element.total_votes;
      temp.missed_votes=element.missed_votes;
      temp.missed_votes_pct=element.missed_votes_pct;
      temp.votes_with_party_pct=element.votes_with_party_pct;
      
      stadistics.republicans.push(temp);
    }
    else if (element.party=="D"){
      sumVotesDemocrats+=element.votes_with_party_pct;
      temp.first_name=element.first_name;
      temp.middle_name=element.middle_name;
      temp.last_name=element.last_name;
      temp.url=element.url;
      temp.state=element.state;
      temp.total_votes=element.total_votes;
      temp.missed_votes=element.missed_votes;
      temp.missed_votes_pct=element.missed_votes_pct;
      temp.votes_with_party_pct=element.votes_with_party_pct;
      stadistics.democrats.push(temp);
    }
    else {
      sumVotesIndependents+=element.votes_with_party_pct;
      temp.first_name=element.first_name;
      temp.middle_name=element.middle_name;
      temp.last_name=element.last_name;
      temp.url=element.url;
      temp.state=element.state;
      temp.total_votes=element.total_votes;
      temp.missed_votes=element.missed_votes;
      temp.missed_votes_pct=element.missed_votes_pct;
      temp.votes_with_party_pct=element.votes_with_party_pct;
      stadistics.independents.push(temp);
    }
  }
  stadistics.numberOfDemocrats=stadistics.democrats.length;
  stadistics.numberOfRepublicans=stadistics.republicans.length;
  stadistics.numberOfIndependents=stadistics.independents.length?stadistics.independents.length:0;
  stadistics.avgVotesRepublicans=sumVotesRepublicans/stadistics.numberOfRepublicans;
  stadistics.avgVotesDemocrats=sumVotesDemocrats/stadistics.numberOfDemocrats;
  stadistics.avgVotesIndependents=stadistics.numberOfIndependents!=0?sumVotesIndependents/stadistics.numberOfIndependents:0;
}
 

function theNLowest(somearray,number){
  let a=somearray.length*number/100; //cuantos quiero
  somearray.sort(function (a , b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let aux=somearray.splice(somearray.length-a); //corto
  let value=aux[0].missed_votes_pct; //que busco en lo que queda
  while(somearray.includes(value)){ //busco repes
    aux.push(somearray[somearray.length-1]);
    somearray.splice(somearray.length-1);
  }
  aux.sort(function (a , b) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return aux;

}

function theNGreatest(somearray,number){
  let a=somearray.length*number/100; //cuantos quiero
  somearray.sort(function (a , b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let aux=somearray.splice(somearray.length-a); //corto
  let value=aux[0].missed_votes_pct; //que busco en lo que queda
  while(somearray.includes(value)){ //busco repes
    aux.push(somearray[somearray.length-1]);
    somearray.splice(somearray.length-1);
  }
  aux.sort(function (a , b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return aux;

}
function theNLowestLoyal(somearray,number){
  let a=somearray.length*number/100; //cuantos quiero
  somearray.sort(function (a , b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let aux=somearray.splice(somearray.length-a); //corto
  let value=aux[0].votes_with_party_pct; //que busco en lo que queda
  while(somearray.includes(value)){ //busco repes
    console.log("EEEENTROOOO");
    aux.push(somearray[somearray.length-1]);
    somearray.splice(somearray.length-1);
  }
  aux.sort(function (a , b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return aux;

}

function theNGreatestLoyal(somearray,number){
  let a=somearray.length*number/100; //cuantos quiero
  somearray.sort(function (a , b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let aux=somearray.splice(somearray.length-a); //corto
  let value=aux[0].votes_with_party_pct; //que busco en lo que queda
  while(somearray.includes(value)){ //busco repes
    aux.push(somearray[somearray.length-1]);
    somearray.splice(somearray.length-1);
  }
  aux.sort(function (a , b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return aux;

}