// const urls = [
//   "https://api.propublica.org/congress/v1/113/senate/members.json",
//   "https://api.propublica.org/congress/v1/113/house/members.json"
// ];

const senateUrl ="https://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";

myVue = new Vue({
  el: '#app',
  data: {
    members: [],
    tableMembers: [],
    fakemembers: [],
    checkedNames: [], 
    selected : 'All',
    tablaVacia : false
 },

 methods: {

//   fetchJsons: (urls=> {
//     Promise.all(urls.map(url =>
//     fetch(url,  {
//       method: "GET",
//       headers: {
//         "X-API-Key": "qlZctqHbMq67VLHByeQUNH227bIi791mq4LMHwuH"
//       }
//     })
//     .then(function(response) {
//       if (response.ok) {
//         // add a new promise to the chain
//         return response.json();
//       }
//       // signal a server error to the chain
//       throw new Error(response.statusText);
//     })
//       .catch(error => console.log('There was a problem!', error))
//   ))//aqui va lo de .then(jsondata => {
//     // const senate = jsondata[0];
//     // const house = jsondata[1];
//     // console.log(senate);
//     // console.log(house);
//   // })
// })
// .then(function([senateData, houseData]) {
//   console.log(senateData);
//  this.members=senateData;
//  this.fakemembers=houseData;
// }),
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
    if(document.URL=="http://127.0.0.1:8000/task4/pruevas.html"){
      this.members=data[1].results[0].members;
      this.fakemembers=data[1].results[0].members
    }
    else if(document.URL=="http://127.0.0.1:8000/task4/pruevas.html"){
      this.members=data[1].results[0].members;
      this.fakemembers=data[1].results[0].members
    }
  })
},



    
},
 computed: {
  // initSenate: (datos=>{
  //   this.members=datos.results[0];
  // }),
  // initHouse: (datos =>{
  //   this.fakemembers=datos.results[0];  
  // }) 

},
 
 created() {
 // instance has been created
 
 },
 mounted() {
  this.fetchJsons(urls);
 // instance has been mounted
 },
 updated() {
 // instance has been updated
 },
 destroyed() {
 // instance had been destroyed
 }
 });
 