const vm1 = new Vue({
  el: "#app",
  data: {
    members: [],
    fakemembers: []
  },
  methods: {
    fetchData: function() {
      const myRequest = new Request(
        "https://api.propublica.org/congress/v1/113/senate/members.json",
        {
          method: "GET",
          headers: {
            "X-API-Key": "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH"
          }
        }
      );
      fetch(myRequest)
        .then(function(response) {
          if (response.ok) {
            // add a new promise to the chain
            return response.json();
          }
          // signal a server error to the chain
          throw new Error(response.statusText);
        })
        .then(jsondata => {
          this.members = jsondata.results[0].members;
          this.fakemembers = this.members.slice();
        })
        .catch(error => {
          console.log("Request failed: " + error.message);
        });
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
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
      return (sum / this.independents.length).toFixed(2) || 0; //if not independents..
    },
    leastEngaged() {
      
      let somearray= this.fakemembers;
      let pct = (somearray.length * 10) / 100; //cuantos quiero
      console.log("somearray");
      console.log(somearray);
      //esto se va fuera
      somearray.sort(function(a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {
          return 1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      let aux = somearray.splice(somearray.length - pct); //corto
      let value = aux[0].missed_votes_pct; //que busco en lo que queda
      let finish = false;
      while (!finish) {
        //busco repes
        if (somearray.length < 1) {
          finish = true;
        } else {
          if (somearray[somearray.length - 1].missed_votes_pct == value) {
            aux.push(somearray[somearray.length - 1]);
          }
          if (somearray[somearray.length - 1].missed_votes_pct < value) {
            finish = true;
          }
          somearray.splice(somearray.length - 1);
        }
      }
      aux.sort(function(a, b) {
        if (a.missed_votes_pct < b.missed_votes_pct) {
          return 1;
        }
        if (a.missed_votes_pct > b.missed_votes_pct) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      this.fakemembers= this.members.slice();
      return aux;
    }
  }
});
