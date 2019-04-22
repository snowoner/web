
let fakeObject= {id:"laquesea",value:"Florida"};

function crea() {

    var map = anychart.map();
    map.geoData(anychart.maps.united_states_of_america);

    flMap = anychart.map();
    flMap.geoData(anychart.maps[(fakeObject.value).toLowerCase()]);

    txMap = anychart.map();
    txMap.geoData(anychart.maps["texas"]);

    // set the data for the USA map
    dataSetUSA = [
{"id": "US.TX", "value": 26956958},
{"id": "US.FL", "value": 19552860}
    ];
  
    
    // Set the series for all maps
    usaSeries = map.choropleth(dataSetUSA);
    let obj = {
        "US.TX": txMap,   
        "US.FL": flMap
            };

    // enable the drilldown interactivity for the USA map 
    map.drillDownMap(obj);  
   

    // set the selectionMode    
    map.interactivity({selectionMode: "drill-down"});

    // draw the chart
    map.container("container");
    map.draw();
};

crea();

// async function creamap() {
//     // create map
  
//     map = anychart.map(); //ok
//     map.geoData(anychart.maps.united_states_of_america); //ok
  
  
//     console.log(myArray);
  
//     let allStates =[{}];
//     myArray.forEach((element,i) => {
  
//       allStates[i] = anychart.map();
//      allStates[i].geoData(anychart.maps["'"+(element.state).toLowerCase()+"'"]);
//     });
   
//       // create data set
//     var dataSet = myArray;
   
//     // create choropleth series
//     series = map.choropleth(dataSet);
//     let arraySeries=[];
     
//     for (let i = 0; i < myArray.length; i++) {
//       arraySeries[i]=allStates[i].choropleth();
//     }
  
//     let statesObject ={};
//     for (let i = 0; i < myArray.length; i++) {
//       statesObject[myArray[i].id] = allStates[i];
//     }
//     console.log(statesObject);
//     map.drillDownMap(statesObject);
//     map.interactivity({selectionMode: "drill-down"});
  
//     // set geoIdField to 'id', this field contains in geo data meta properties
//     // series.geoIdField("id");
//     // map.background().fill("#c0c2b8d8");
  
//     // // set map color settings
//     // series.hovered().fill("#addd8e");
  
//     // //if selected
//     // series.selected().fill("gold");
  
//     // set geo data, you can find this map in our geo maps collection
//     // https://cdn.anychart.com/#maps-collection
//     // map.geoData(anychart.maps["united_states_of_america"]);
  
    
  
//     // enable labels
  
//     // labels = series.labels();
//     // labels.enabled(true);
  
//     // format labels text
//     // labels.format(function() {
//     //   // Gets point source region properties.
//     //   var properties = this.regionProperties;
//     //   return properties["postal"];
//     // });
  
//     // labels setting
//     // labels.fontColor("black");
//     // labels.fontSize("10px");
  
//     // series.tooltip().format(function(e) {
//     //   return (
//     //     "State: " +
//     //     e.getData("state") +
//     //     "\n" +
//     //     "Nº Senators: " +
//     //     e.getData("value")
//     //   );
//     // });
  
//     // map.listen("pointClick", cambia);
  
//     //set map container id (div)
//     map.container("maps");
  
//     //initiate map drawing
//     map.draw();
  
//   }
  

  