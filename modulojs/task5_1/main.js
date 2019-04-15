// const urls = [
//   "https://api.propublica.org/congress/v1/113/senate/members.json",
//   "https://api.propublica.org/congress/v1/113/house/members.json"
// ];
const senateUrl =
  "https://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl =
  "https://api.propublica.org/congress/v1/113/house/members.json";

// const openStatesUrl ="https://openstates.org/graphql";
const openSenateUrl = "https://api.myjson.com/bins/13v5c0";
const openHouseUrl = "https://api.myjson.com/bins/d9ab4";

const senateReg = /senate/;
const houseReg = /house/;
const homeReg = /home/;

const apiKeys = [
  "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH",
  "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH",
  "",
  "",
  "f33ada56-d77d-43bb-b314-f2abac4c492a"
];

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

  },
  methods: {
    // getText() {
    //   if (this.apiSelected == "All") {
    //     this.tableAMostrar.text =
    //       "Tabla de los senadores de ProPublica y Opnestates";
    //   } else if (this.apiSelected == "api1") {
    //     this.tableAMostrar.text = "Tabla de los senadores de ProPublica";
    //   } else {
    //     this.tableAMostrar.text = "Tabla de los senadores de OpenStates";
    //   }
    // },
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

    fetchJson(url, init) {
      if (apiKeys[init] == "") {
        return fetch(url).then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        });
      } else {
        return fetch(url, {
          method: "GET",
          headers: {
            "X-API-Key": apiKeys[init]
          }
        }).then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        });
      }
    },
    fetchJsonList(urls, init) {
      return Promise.all(urls.map((url, init) => this.fetchJson(url, init)));
    },
    hazMagia(urls, init) {
      this.fetchJsonList(urls, init).then(function([
        senateData,
        houseData,
        openSenateData,
        openHouseData
      ]) {
        if (senateReg.exec(document.URL)) {
          myVue.members = senateData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
        } else if (houseReg.exec(document.URL)) {
          myVue.members = houseData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
        } else if (homeReg.exec(document.URL)) {
        } else {
          myVue.members = senateData.results[0].members;
          myVue.fakemembers = myVue.members.slice();
          myVue.tableMembers = myVue.members.slice();
          myVue.metadata = openSenateData.results;
          myVue.muestrLegTabla();
        }
      });
    },

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
          if(!this.tableLegMembers.some(ele=>{
            return eleApi1.govtrack_id==ele.govtrack_id;
          })){
            //incluyo miembros de api1
            this.tableLegMembers.push(eleApi1); //info de api1
          }
        });
         this.metadata.forEach(eleApi2 => { //VOY a incluir miembros de api2
           if(!this.tableLegMembers.some(ele2=>{ //si no existe lo añado
             return eleApi2.govtrack_id==ele2.govtrack_id;
           })){
            this.tableLegMembers.push(eleApi2);// info de api2
           } 
           else{ // existe por lo que tengo que añadir info extra
              let elemArellenar = this.tableLegMembers.findIndex(elmnt=>{return elmnt.govtrack_id==eleApi2.govtrack_id;});
              for (const key in eleApi2) {
                if(!this.tableLegMembers[elemArellenar].hasOwnProperty(key)){
                  this.tableLegMembers[elemArellenar].key=eleApi2.key;
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
         this.tableLegMembers = this.mySort(this.tableLegMembers,"govtrack_id");
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
        let arrayJoin = [...this.members ,...this.metadata];
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
    republicans() {
      return this.members.filter(function(element) {
        return element.party == "R";
      });
    },
    avgRepublicans() {
      let sum = 0;
      for (let i = 0; i < this.republicans.length; i++) {
        sum += this.republicans[i].votes_with_party_pct;
      }
      return (sum / this.republicans.length).toFixed(2);
    },
    democrats() {
      return this.members.filter(function(element) {
        return element.party == "D";
      });
    },
    avgDemocrats() {
      let sum = 0;
      for (let i = 0; i < this.democrats.length; i++) {
        sum += this.democrats[i].votes_with_party_pct;
      }
      return (sum / this.democrats.length).toFixed(2);
    },
    independents() {
      return this.members.filter(function(element) {
        return element.party == "I";
      });
    },
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
    // legislatorsStates(){
    //   let arrayStates = [];
    // this.metadata.forEach(element => {
    //   if(!arrayStates.some(item => item.text==element.state)){
    //     let state={text:element.state, value:element.state};
    //     arrayStates.push(state);
    //   }
    // });
    // arrayStates = this.mySort(arrayStates,"text");
    // let state={text:"All",value:"All"};
    // arrayStates=[state,...arrayStates];
    // return arrayStates;
    // },
  }
});
