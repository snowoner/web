function getItemHtml(rhyme) {
  return "<li class='list-group-item' style='width: 12em'><span class='badge'>" + 
    rhyme.score + "</span>" + rhyme.word + "</li>";
}

function getListHtml(data) {
  return data.map(getItemHtml).join("");
}

function renderList(data) {
  var html = getListHtml(data);
  document.getElementById("rhymes").innerHTML = html;
}

function renderWord(word) {
  document.getElementById("word").innerHTML = word;
}

function getHeadersHtml(data) {
  return "<tr><th></th>" + data.destination_addresses.map(function(dest) {
    return "<th>" + dest + "</th>";
  }).join("") + "</tr>";
}

function renderHeaders(data) {
  var html = getHeadersHtml(data);
  document.getElementById("table-headers").innerHTML = html;
}

function getColumnsHtml(row) {
  return row.elements.map(function(element) {
    return "<td>" + element.distance.text + "</td>";
  }).join("")
}

function getRowsHtml(data) {
  return data.rows.map(function(row, i) {
    return "<tr><th>" + data.origin_addresses[i] + "</th>" +
      getColumnsHtml(row) + "</tr>";
    }).join("");
}

function renderRows(data) {
  var html = getRowsHtml(data);
  document.getElementById("table-rows").innerHTML = html;
}
function renderTable(data) {
  renderHeaders(data);
  renderRows(data);
}

renderTable({"destination_addresses":["San Francisco, CA, USA","Victoria, BC, Canada"],"origin_addresses":["Vancouver, BC, Canada","Seattle, WA, USA"],
"rows":[{"elements":[{"distance":{"text":"1,528 km","value":1528361},"duration":{"text":"14 hours 47 mins","value":53236},"status":"OK"},{"distance":
{"text":"114 km","value":114166},"duration":{"text":"3 hours 10 mins","value":11415},"status":"OK"}]},{"elements":[{"distance":{"text":"1,300 km",
"value":1299975},"duration":{"text":"12 hours 21 mins","value":44447},"status":"OK"},{"distance":{"text":"172 km","value":171688},"duration":
{"text":"4 hours 37 mins","value":16602},"status":"OK"}]}],"status":"OK"});

renderWord("force");

renderList([{"word":"source","freq":25,"score":300,"flags":"bc","syllables":"1"},
 {"word":"horse","freq":24,"score":300,"flags":"bc","syllables":"1"},
 {"word":"course","freq":26,"score":300,"flags":"bc","syllables":"1"},
 {"word":"forth","freq":24,"score":264,"flags":"bc","syllables":"1"},
 {"word":"north","freq":24,"score":264,"flags":"bc","syllables":"1"},
 {"word":"walls","freq":24,"score":264,"flags":"bc","syllables":"1"},
 {"word":"thoughts","freq":24,"score":228,"flags":"bc","syllables":"1"},
 {"word":"loss","freq":25,"score":228,"flags":"bc","syllables":"1"},
 {"word":"cross","freq":24,"score":228,"flags":"bc","syllables":"1"},
 {"word":"across","freq":25,"score":228,"flags":"bc","syllables":"2"},
 {"word":"reports","freq":24,"score":228,"flags":"bc","syllables":"2"},
 {"word":"off","freq":26,"score":192,"flags":"bc","syllables":"1"},
 {"word":"forms","freq":25,"score":192,"flags":"bc","syllables":"1"},
 {"word":"laws","freq":25,"score":192,"flags":"bc","syllables":"1"},
 {"word":"because","freq":27,"score":192,"flags":"bc","syllables":"2"},
 {"word":"towards","freq":25,"score":192,"flags":"bc","syllables":"2"},
 {"word":"records","freq":24,"score":192,"flags":"bc","syllables":"2"},
 {"word":"books","freq":25,"score":84,"flags":"bc","syllables":"1"},
 {"word":"notes","freq":24,"score":84,"flags":"bc","syllables":"1"},
 {"word":"close","freq":25,"score":84,"flags":"bc","syllables":"1"}]);