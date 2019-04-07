var stadistics =
{
  "numberOfDemocrats": "0",
  "avgVotesDemocrats": "0",
  "numberOfRepublicans": "0",
  "avgVotesRepublicans": "0",
  "numberOfIndependents": "0",
  "avgVotesIndependents": "0",
  "republicans": [],
  "democrats": [],
  "independents": [],
};
getGlanceData();
fillSenateTable();
fillLeastLoyal();
fillMostLoyal();

function fillSenateTable() {
  let table = document.getElementById("senateTbody");
  var trRep = document.createElement("tr");
  var tdRep = document.createElement("td");
  var tdRep1 = document.createElement("td");
  var tdRep2 = document.createElement("td");
  tdRep.innerHTML = "Republicans";
  tdRep1.innerHTML = stadistics.numberOfRepublicans;
  tdRep2.innerHTML = stadistics.avgVotesRepublicans.toFixed(2);
  trRep.append(tdRep, tdRep1, tdRep2);
  table.append(trRep);
  var trDem = document.createElement("tr");
  var tdDem = document.createElement("td");
  var tdDem1 = document.createElement("td");
  var tdDem2 = document.createElement("td");
  tdDem.innerHTML = "Democrats";
  tdDem1.innerHTML = stadistics.numberOfDemocrats;
  tdDem2.innerHTML = stadistics.avgVotesDemocrats.toFixed(2);
  trDem.append(tdDem, tdDem1, tdDem2);
  table.append(trDem);
  var trInd = document.createElement("tr");
  var tdInd = document.createElement("td");
  var tdInd1 = document.createElement("td");
  var tdInd2 = document.createElement("td");
  tdInd.innerHTML = "Independents";
  tdInd1.innerHTML = stadistics.numberOfIndependents;
  tdInd2.innerHTML = stadistics.avgVotesIndependents.toFixed(2);
  trInd.append(tdInd, tdInd1, tdInd2);
  table.append(trInd);
}

function fillLeastLoyal() {
  let table = document.getElementById("houseLeastLoyal");
  let template = "";
  let values = theNLowestLoyal(stadistics.republicans.concat(stadistics.democrats, stadistics.independents), 10);
  for (let i = 0; i < values.length; i++) {
    if (values[i].total_votes != 0) {
      template += `
    <tr>
      <td>
        <a href="${values[i].url}">${values[i].first_name}, ${values[i].middle_name || ""} ${values[i].last_name}</a>
      </td>
      <td>${values[i].total_votes}</td>
      <td>${(values[i].total_votes*(values[i].votes_with_party_pct/100)).toFixed(2)}</td>
      <td>${values[i].votes_with_party_pct}</td>
    </tr>
    `;
    }
  }
  table.innerHTML = template;
}

function fillMostLoyal() {
  let table = document.getElementById("houseMostLoyal");
  let template = "";
  let values = theNGreatestLoyal(stadistics.republicans.concat(stadistics.democrats, stadistics.independents), 10);
  for (let i = 0; i < values.length; i++) {
    if(values[i].total_votes!=0){
    template += `
    <tr>
      <td>
        <a href="${values[i].url}">${values[i].first_name}, ${values[i].middle_name || ""} ${values[i].last_name}</a>
      </td>
      <td>${values[i].total_votes}</td>
      <td>${(values[i].total_votes*(values[i].votes_with_party_pct/100)).toFixed(2)}</td>
      <td>${values[i].votes_with_party_pct}</td>
    </tr>
    `;
  }
}
  table.innerHTML = template;
}