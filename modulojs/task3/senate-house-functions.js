function getGlanceData() {
  var sumVotesDemocrats = 0;
  var sumVotesRepublicans = 0;
  var sumVotesIndependents = 0;
  for (let i = 0; i < data.results[0].members.length; i++) {
    const element = data.results[0].members[i];
    let temp = {};
    temp.first_name = element.first_name;
    temp.middle_name = element.middle_name;
    temp.last_name = element.last_name;
    temp.url = element.url;
    temp.state = element.state;
    temp.total_votes = element.total_votes;
    temp.missed_votes = element.missed_votes;
    temp.missed_votes_pct = element.missed_votes_pct;
    temp.votes_with_party_pct = element.votes_with_party_pct;
    if (element.party == "R") {
      sumVotesRepublicans += element.votes_with_party_pct;
      stadistics.republicans.push(temp);
    } else if (element.party == "D") {
      sumVotesDemocrats += element.votes_with_party_pct;
      stadistics.democrats.push(temp);
    } else {
      sumVotesIndependents += element.votes_with_party_pct;
      stadistics.independents.push(temp);
    }
  }
  stadistics.numberOfDemocrats = stadistics.democrats.length;
  stadistics.numberOfRepublicans = stadistics.republicans.length;
  stadistics.numberOfIndependents = stadistics.independents.length
    ? stadistics.independents.length
    : 0;
  stadistics.avgVotesRepublicans =
    sumVotesRepublicans / stadistics.numberOfRepublicans;
  stadistics.avgVotesDemocrats =
    sumVotesDemocrats / stadistics.numberOfDemocrats;
  stadistics.avgVotesIndependents =
    stadistics.numberOfIndependents != 0
      ? sumVotesIndependents / stadistics.numberOfIndependents
      : 0;
}

function mySort(array, string) {
  array.sort(function(a, b) {
    if (a[string] > b[string]) {
      return 1;
    }
    if (a[string] < b[string]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return array;
}

function lastPushLow(array, arrayTarget, value, string) {
  let finish = false;

  while (!finish) {
    //busco repes
    if (array.length < 1) {
      finish = true;
    } else {
      if (array[array.length - 1][string] == value) {
        arrayTarget.push(array[array.length - 1]);
      }
      if (array[array.length - 1][string] < value) {
        finish = true;
      }
      array.splice(array.length - 1);
    }
  }
  return arrayTarget;
}

function lastPushGre(array, arrayTarget, value, string) {
  let finish = false;
  while (!finish) {
    //busco repes
    if (array.length < 1) {
      finish = true;
    } else {
      if (array[array.length - 1][string] == value) {
        arrayTarget.push(array[array.length - 1]);
      }
      if (array[array.length - 1][string] > value) {
        finish = true;
      }
      array.splice(array.length - 1);
    }
  }
  return arrayTarget;
}

function theNLowest(somearray, number) {
  let pct = (somearray.length * number) / 100; //cuantos quiero
  somearray = mySort(somearray, "missed_votes_pct");
  let aux = somearray.splice(somearray.length - pct); //corto
  aux = lastPushLow(
    somearray,
    aux,
    aux[0].missed_votes_pct,
    "missed_votes_pct"
  );
  aux = mySort(aux, "missed_votes_pct").reverse();
  return aux;
}

function theNGreatest(somearray, number) {
  let pct = (somearray.length * number) / 100; //cuantos quiero
  somearray = mySort(somearray, "missed_votes_pct").reverse();
  let aux = somearray.splice(somearray.length - pct); //corto
  aux = lastPushGre(
    somearray,
    aux,
    aux[0].missed_votes_pct,
    "missed_votes_pct"
  );
  aux = mySort(aux, "missed_votes_pct");
  return aux;
}

function theNLowestLoyal(somearray, number) {
  let pct = (somearray.length * number) / 100; //cuantos quiero
  somearray = mySort(somearray, "votes_with_party_pct").reverse();
  let aux = somearray.splice(somearray.length - pct); //corto
  aux = lastPushLow(
    somearray,
    aux,
    aux[0].votes_with_party_pct,
    "votes_with_party_pct"
  );
  aux = mySort(aux, "votes_with_party_pct");
  return aux;
}

function theNGreatestLoyal(somearray, number) {
  let pct = (somearray.length * number) / 100; //cuantos quiero
  somearray = mySort(somearray, "votes_with_party_pct");
  let aux = somearray.splice(somearray.length - pct); //corto
  aux = lastPushLow(
    somearray,
    aux,
    aux[0].votes_with_party_pct,
    "votes_with_party_pct"
  );
  aux = mySort(aux, "votes_with_party_pct").reverse();
  return aux;
}
