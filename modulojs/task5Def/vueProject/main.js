//The URL's that i use in my code
const senateUrl =
  "https://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl =
  "https://api.propublica.org/congress/v1/113/house/members.json";
const openSenateUrl = "https://api.myjson.com/bins/13v5c0";
const openHouseUrl = "https://api.myjson.com/bins/d9ab4";

//RegularExpresions
const senateReg = /senate/;
const houseReg = /house/;
const homeReg = /home/;

//APIkeys to Fetch
const apiKeys = [
  "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH",
  "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH",
  "",
  "",
  "f33ada56-d77d-43bb-b314-f2abac4c492a"
];

//Variables used in the Map
var map;
let myArray = [];

//component for table in house And senate
Vue.component("membered", {
  props: ["member"],
  template: `
  <tr>
    <td> <a :href=member.url>{{member.first_name}} {{member.middle_name || ""}} {{member.last_name}}</a></td>
    <td>{{member.party}}</td>
    <td>{{member.state}}</td>
    <td class="notshow">{{member.seniority}}</td>
    <td>{{member.votes_with_party_pct}}</td>
  </tr>`
});

//Vue
const myVue = new Vue({
  el: "#app",
  data: {
    members: [],
    tableMembers: [],
    tableLegMembers: [
      {
        first_name: "Loading",
        last_name: "Loading",
        middle_name: "Loading",
        party: "Loading",
        state: "Loading",
        govtrack_id: "Loading"
      }
    ],
    loaded:false,
    fakemembers: [],
    checkedNames: [],
    selected: "All",
    tablaVacia: false,
    metadata: [],
    apiSelected: "All",
    selectApi: [
      { text: "All", value: "All" },
      { text: "ProPublica", value: "api1" },
      { text: "OpenStates", value: "api2" }
    ],
    pagina:0,
    paginaRate:5,
  },
  methods: {
   
    resetPagination(){
      this.pagina = 0;
    },

    next(){
      this.pagina>=Math.floor(this.members.length/this.paginaRate)?Math.floor(this.members.length/this.paginaRate):this.pagina+=1;
    },

    previous(){
      this.pagina<=0?0:this.pagina-=1;
    },

    first(){
      this.pagina=0;
    },

    last(){
      this.pagina = this.pageOf;
    },
    

    /**
     * Incluye los elementos de un array en un arrayTarget segun la
     * propiedad string y el valor que le passas
     *
     * @param {*} array Origen
     * @param {*} arrayTarget Destino
     * @param {*} value Valor limite
     * @param {*} string  propiedad del objeto
     */
    lastPushLow(array, arrayTarget, value, string) {
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
    },

    /**
     * Incluye los elementos de un array en un arrayTarget segun la
     * propiedad string y el valor que le passas
     *
     * @param {*} array Origen
     * @param {*} arrayTarget Destino
     * @param {*} value Valor limite
     * @param {*} string  propiedad del objeto
     * @return
     */
    lastPushGre(array, arrayTarget, value, string) {
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
    },

    /**
     * Ordena un array segun la propiedad string
     * @param {*} array array a ordenar
     * @param {*} string propiedad
     */
    mySort(array, string) {
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
    },
    /**
     * Hace un Fetch de los datos de una URL y los transforma JSON
     * @param {*} url Url
     * @param {*} init indice para apikeys
     */
    async fetchJson(url, init) {
      let datos = "datos" + init;
      if (!localStorage[datos]) {
        if (apiKeys[init] == "") {
          const response = await fetch(url);
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        } else {
          const response_1 = await fetch(url, {
            method: "GET",
            headers: {
              "X-API-Key": apiKeys[init]
            }
          });
          if (response_1.ok) {
            return response_1.json();
          }
          throw new Error(response_1.statusText);
        }
      } else {
        return JSON.parse(localStorage[datos]);
      }
    },
    /**
     * Hace un promise all de las URLS
     * @param {*} urls
     * @param {*} init indice para apikeys
     */
    fetchJsonList(urls, init) {
      return Promise.all(urls.map((url, init) => this.fetchJson(url, init)));
    },
    /**
     * Carga de datos en mis variables
     * @param {*} urls
     * @param {*} init
     */
    hazMagia(urls, init) {
      this.fetchJsonList(urls, init).then(async function([
        senateData,
        houseData,
        openSenateData,
        openHouseData
      ]) {
        if (!localStorage.datos0) {
          localStorage.setItem("datos0", JSON.stringify(senateData));
          localStorage.setItem("datos1", JSON.stringify(houseData));
          localStorage.setItem("datos2", JSON.stringify(openSenateData));
          localStorage.setItem("datos3", JSON.stringify(openHouseData));
        }
        if (senateReg.exec(document.URL)) {
          myVue.members = senateData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
          if (document.URL.includes("senate-page")) {
            myVue.metadata = openSenateData.results;
            myArray = await myVue.getStates();
            creamap();
          }
        } else if (houseReg.exec(document.URL)) {
          myVue.members = houseData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
          if (document.URL.includes("house-page")) {
            myVue.metadata = openSenateData.results;
            myArray = await myVue.getStates();
            creamap();
          }        
        } else if (homeReg.exec(document.URL)) {
        } else {
          myVue.members = senateData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
          myVue.metadata = openSenateData.results;
          myVue.muestrLegTabla();
        }
        myVue.loaded=true;
      });
    },
    /**
     * Este metodo filtra la tabla TableMembers y actualiza tablaVacia
     *  @borrows tableMembers tablaVacia
     */
    muestraTabla() {
      this.tablaVacia = false;
      this.tableMembers = this.members.slice();
      this.tableMembers = this.tableMembers.filter(element => {
        let checkParty =
          this.checkedNames.includes(element.party) ||
          this.checkedNames.length < 1;
        let checkState =
          element.state == this.selected || this.selected == "All";
        return checkParty && checkState;
      });
      if (this.tableMembers.length == 0) {
        this.tablaVacia = true;
      }
    },

    //devuelve los senadores de Members
    getSenators(state) {
      let number = 0;
      this.members.forEach(element => {
        if (element.state == state) {
          number++;
        }
      });
      return number;
    },

    //this returns an array of the states from openstatesapi()
    getStates() {
      let arrayStates = [];
      this.metadata.forEach(element => {
        if (!arrayStates.some(item => item.id == "US." + element.state)) {
          let state = {
            id: "US." + element.state,
            value: this.getSenators(element.state),
            state: element.state_name
          };
          arrayStates.push(state);
        }
      });
      arrayStates = this.mySort(arrayStates, "id");
      return arrayStates;
    },

    //devuelve la informacion de los estados para el mapa
    getStatesInfo(state) {
      let someReturn = [];
      for (let i = 0; i < this.members.length; i++) {
        const element = this.members[i];
        if ("US." + element.state == state) {
          let aux2 = {};
          aux2.id = `${state}.${
            element.district > 9 ? "0" : "00"
          }${element.district || Math.floor(Math.random() * 9) + 1}`;
          aux2.senator = `${element.first_name}, ${element.middle_name || ""}${
            element.last_name
          }`;
          aux2.party = element.party;
          someReturn.push(aux2);
        }
      }
      return someReturn;
    },

    //muestra tabla para legislators
    muestrLegTabla() {
      this.tablaVacia = false;
      if (this.apiSelected == "api1") {
        this.tableLegMembers = this.mySort(this.members.slice(), "govtrack_id");
        this.tableLegMembers = this.tableLegMembers.filter(element => {
          let checkParty =
            this.checkedNames.includes(element.party) ||
            this.checkedNames.length < 1;
          let checkState =
            element.state == this.selected || this.selected == "All";
          return checkParty && checkState;
        });
      } else if (this.apiSelected == "api2") {
        this.tableLegMembers = this.mySort(
          this.metadata.slice(),
          "govtrack_id"
        );
        this.tableLegMembers = this.tableLegMembers.filter(element => {
          let checkParty =
            this.checkedNames.includes(element.party) ||
            this.checkedNames.length < 1;
          let checkState =
            element.state == this.selected || this.selected == "All";
          return checkParty && checkState;
        });
      } else if (this.apiSelected == "All") {
        this.tableLegMembers = [];
        this.members.forEach(eleApi1 => {
          if (
            !this.tableLegMembers.some(ele => {
              return eleApi1.govtrack_id == ele.govtrack_id;
            })
          ) {
            //incluyo miembros de api1
            this.tableLegMembers.push(eleApi1); //info de api1
          }
        });
        this.metadata.forEach(eleApi2 => {
          //VOY a incluir miembros de api2
          if (
            !this.tableLegMembers.some(ele2 => {
              //si no existe lo añado
              return eleApi2.govtrack_id == ele2.govtrack_id;
            })
          ) {
            this.tableLegMembers.push(eleApi2); // info de api2
          } else {
            // existe por lo que tengo que añadir info extra
            let elemArellenar = this.tableLegMembers.findIndex(elmnt => {
              return elmnt.govtrack_id == eleApi2.govtrack_id;
            });
            for (const key in eleApi2) {
              if (!this.tableLegMembers[elemArellenar].hasOwnProperty(key)) {
                this.tableLegMembers[elemArellenar].key = eleApi2.key;
              }
            }
          }
        });
        this.tableLegMembers = this.tableLegMembers.filter(element => {
          let checkParty =
            this.checkedNames.includes(element.party) ||
            this.checkedNames.length < 1;
          let checkState =
            element.state == this.selected || this.selected == "All";
          return checkParty && checkState;
        });
        this.tableLegMembers = this.mySort(this.tableLegMembers, "govtrack_id");
      }
      if (this.tableLegMembers.length == 0) {
        this.tablaVacia = true;
      }
    }
  },

  mounted() {
    this.hazMagia(
      [senateUrl, houseUrl, openSenateUrl, openHouseUrl],
      [apiKeys[0]]
    );
  },
  computed: {
    pageOf(){
      return this.members.length%this.paginaRate==0?Math.floor(this.members.length/this.paginaRate)-1:Math.floor(this.members.length/this.paginaRate);
    },

    showPagina(){
      this.fakemembers=this.members.slice();
      return this.fakemembers.splice(this.pagina*this.paginaRate,this.paginaRate);
    },

    //fill the select filter
    fillSelect() {
      let arrayStates = [];
      if (this.apiSelected == "api1") {
        this.members.forEach(element => {
          if (!arrayStates.some(item => item.text == element.state)) {
            let state = { text: element.state, value: element.state };
            arrayStates.push(state);
          }
        });
        arrayStates = this.mySort(arrayStates, "text");
      } else if (this.apiSelected == "api2") {
        this.metadata.forEach(element => {
          if (!arrayStates.some(item => item.text == element.state)) {
            let state = { text: element.state, value: element.state };
            arrayStates.push(state);
          }
        });
        arrayStates = this.mySort(arrayStates, "text");
      } else {
        let arrayJoin = [...this.members, ...this.metadata];
        arrayJoin.forEach(element => {
          if (!arrayStates.some(item => item.text == element.state)) {
            let state = { text: element.state, value: element.state };
            arrayStates.push(state);
          }
        });
        arrayStates = this.mySort(arrayStates, "text");
      }
      let state = { text: "All", value: "All" };
      arrayStates = [state, ...arrayStates];
      return arrayStates;
    },
    
    // fillSelect2(){ //muy bonito pero...
    //   return [...new Set(this.members.map(members => { 
    //     return members.state
    //   }))].sort().map(state => {
    //     return {text: state, value:state}
    //   })
    // },

    //this is republicans array members
    republicans() {
      return this.members.filter(function(element) {
        return element.party == "R";
      });
    },
    //this is average votes of republicans
    avgRepublicans() {
      let sum = 0;
      for (let i = 0; i < this.republicans.length; i++) {
        sum += this.republicans[i].votes_with_party_pct;
      }
      return (sum / this.republicans.length).toFixed(2);
    },
    //this is democrats array members
    democrats() {
      return this.members.filter(function(element) {
        return element.party == "D";
      });
    },
    //this is average votes of democrats
    avgDemocrats() {
      let sum = 0;
      for (let i = 0; i < this.democrats.length; i++) {
        sum += this.democrats[i].votes_with_party_pct;
      }
      return (sum / this.democrats.length).toFixed(2);
    },
    //this is independents array members
    independents() {
      return this.members.filter(function(element) {
        return element.party == "I";
      });
    },
    //this is average votes of independents
    avgIndependents() {
      let sum = 0;
      for (let i = 0; i < this.independents.length; i++) {
        sum += this.independents[i].votes_with_party_pct;
      }
      if (this.independents.length > 0) {
        return (sum / this.independents.length).toFixed(2);
      } else {
        return sum.toFixed(2);
      }
    },
    //this function returns the 10% greatest engaged members
    theNGreatest() {
      let somearray = this.fakemembers.slice();
      let pct = (somearray.length * 10) / 100; //cuantos quiero
      somearray = this.mySort(somearray, "missed_votes_pct").reverse();
      let aux = somearray.splice(somearray.length - pct); //corto
      aux = this.lastPushGre(
        somearray,
        aux,
        aux[0].missed_votes_pct,
        "missed_votes_pct"
      );
      aux = this.mySort(aux, "missed_votes_pct");

      return aux;
    },
    //this functions returns the 10% greatest loyalty members
    theNGreatestLoyal() {
      let somearray = this.fakemembers.slice();
      let pct = (somearray.length * 10) / 100; //cuantos quiero
      somearray = this.mySort(somearray, "votes_with_party_pct");
      let aux = somearray.splice(somearray.length - pct); //corto
      aux = this.lastPushLow(
        somearray,
        aux,
        aux[0].votes_with_party_pct,
        "votes_with_party_pct"
      );
      aux = this.mySort(aux, "votes_with_party_pct").reverse();

      return aux;
    },
    //this function returns the 10% least loyalty members
    theNLowestLoyal() {
      let somearray = this.fakemembers.slice();
      let pct = (somearray.length * 10) / 100; //cuantos quiero
      somearray = this.mySort(somearray, "votes_with_party_pct").reverse();
      let aux = somearray.splice(somearray.length - pct); //corto
      aux = this.lastPushLow(
        somearray,
        aux,
        aux[0].votes_with_party_pct,
        "votes_with_party_pct"
      );
      aux = this.mySort(aux, "votes_with_party_pct");

      return aux;
    },
    //this function returns the 10% least engaged members
    theNLowest() {
      let somearray = this.fakemembers.slice();
      let pct = (somearray.length * 10) / 100; //cuantos quiero
      somearray = this.mySort(somearray, "missed_votes_pct");
      let aux = somearray.splice(somearray.length - pct); //corto
      aux = this.lastPushLow(
        somearray,
        aux,
        aux[0].missed_votes_pct,
        "missed_votes_pct"
      );
      aux = this.mySort(aux, "missed_votes_pct").reverse();
      return aux;
    }
  }
});

//fin de Vue

//this is the map
async function creamap() {
  // create map

  map = anychart.map(); //ok
  map.geoData(anychart.maps.united_states_of_america); //ok

  //get the map of every state
  let allStates = [];
  myArray.forEach((element, i) => {
    allStates[i] = anychart.map();
    allStates[i].geoData(
      anychart.maps[element.state.toLowerCase().replace(" ", "_")]
    );
  });

  // create data set
  var dataSet = myArray;
  let dataSeries = [];
  for (let i = 0; i < myArray.length; i++) {
    dataSeries[i] = myVue.getStatesInfo(myArray[i].id);
  }

  // create choropleth series
  series = map.choropleth(dataSet);
  let arraySeries = [];
  for (let i = 0; i < myArray.length; i++) {
    arraySeries[i] = allStates[i].choropleth(dataSeries[i]);
  }

  //create a object whit all states info
  let statesObject = {};
  for (let i = 0; i < myArray.length; i++) {
    statesObject[myArray[i].id] = allStates[i];
  }

  map.listen("pointMouseOver", function(evt) {
    series.unselect();
    cambia(evt.point.get("id"));
  });

  map.drillDownMap(statesObject);
  map.interactivity({ selectionMode: "drill-down" });

  // set geoIdField to 'id', this field contains in geo data meta properties
  series.geoIdField("id");
  map.background().fill("#c0c2b8d8");

  // set map color settings
  series.hovered().fill("#addd8e");
  series.selected().fill("gold");

  // enable labels
  labels = series.labels();
  labels.enabled(true);

  // format labels text
  labels.format(function() {
    // Gets point source region properties.
    var properties = this.regionProperties; //anychart funciona asi
    return properties["postal"];
  });

  // labels setting
  labels.fontColor("black");
  labels.fontSize("10px");

  //info and colors when drillIn
  for (let i = 0; i < myArray.length; i++) {
    allStates[i].background().fill("#c0c2b8d8");
    allStates[i].title("ESC to Back to Map");
    arraySeries[i].hovered().fill("#addd8e");
    arraySeries[i].tooltip().format(function(e) {
      return (
        "Senator: " +
        e.getData("senator") +
        "\n" +
        "Party: " +
        e.getData("party")
      );
    });
  }

  //info for the map
  series.tooltip().format(function(e) {
    return (
      "State: " +
      e.getData("state") +
      "\n" +
      "Nº Senators: " +
      e.getData("value")
    );
  });

  map.title(
    "Map Selector of United States (Click on State to see the countries, ESC to Back)"
  );

  //set map container id (div)
  map.container("maps");
  //initiate map drawing
  map.draw();
}

//this function change the Selected using map selector
function cambia(evt) {
  let re = /US./;
  let result = evt;
  result = result.replace(re, "");
  myVue.selected = result;
  myVue.muestraTabla();
}

//this function fill with color the selected state from filter to map
function changeMap() {
  series.unselect();
  let flipada = myVue.getStates();
  //get the selected
  let sel = myVue.selected;
  //get an array of ids from map
  let auxiliar = flipada.map(ele => {
    return ele.id;
  });
  //get the index of the selected
  let index = auxiliar.indexOf("US." + sel);
  //set the selected
  series.select(index);
}

//this conditional is used for add eventlistener to the map
if (document.URL.includes("senate-page")) {
  var ho = document
    .getElementById("stateSelector")
    .addEventListener("click", changeMap);
}

if (document.URL.includes("house-page")) {
  var ho = document
    .getElementById("stateSelector")
    .addEventListener("click", changeMap);
}
