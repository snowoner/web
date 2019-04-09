// const urls = [
//   "https://api.propublica.org/congress/v1/113/senate/members.json",
//   "https://api.propublica.org/congress/v1/113/house/members.json"
// ];
const senateUrl ="https://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";

const senateReg = /senate/;
const houseReg = /house/;

const myVue = new Vue({
  el: "#app",
  data: {
    members: [],
    tableMembers: [],
    fakemembers: [],
    checkedNames: [], 
    selected : 'All',
    tablaVacia : false
  },
  methods: {
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
    fetchJsons(urls) {
      Promise.all(urls.map(url =>
        fetch(url,  {
                method: "GET",
                headers: {
                  "X-API-Key": "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH"
                }
              })
          .then(response =>{ 
            if (response.ok) {
              return Promise.resolve(response);
            }else {
              return Promise.reject(new Error(response.statusText));
          }
          })                 
          .then(response=>{return response.json()})
          .catch(error => console.log('There was a problem!', error))
      ))
      .then(data => {        
        if(senateReg.exec(document.URL)){
          alert("We are fetching Senate Data");
          this.members = data[0].results[0].members;
          this.fakemembers = this.members.slice();
          this.tableMembers =this.members.slice();
        }
        else if(houseReg.exec(document.URL)){
          alert("We are fetching House Data");
          this.members = data[1].results[0].members;
          this.fakemembers = this.members.slice();
          this.tableMembers =this.members.slice();
        }
        else {
          alert("HOME SWEEt Home");
        }
      })
    },
    muestraTabla(){
      this.tablaVacia = false;
      this.tableMembers =this.members.slice();
      this.tableMembers = this.tableMembers.filter(element =>{
          let checkParty=this.checkedNames.includes(element.party) || this.checkedNames.length<1;
          let checkState=element.state==this.selected || this.selected=="All";
        return (checkParty && checkState);
      });
      if(this.tableMembers.length==0){this.tablaVacia=true;}
    }
  },
  mounted() {
    this.fetchJsons([senateUrl,houseUrl]);
  },
  computed: {
    fillSelect(){
      let all = [{text: 'All', value:'All'}];
      for (let i = 0; i < this.fillSelect2.length; i++) {
        all.push(this.fillSelect2[i]);
      }
    return all;
    },
    fillSelect2(){ //muy bonito pero...
      return [...new Set(this.members.map(members => {
        return members.state
      }))].sort().map(state => {
        return {text: state, value:state}
      })
    },
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
        if(this.independents.length>0){
          return (sum / this.independents.length).toFixed(2)
        }
        else{
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
    },    
  }
});
