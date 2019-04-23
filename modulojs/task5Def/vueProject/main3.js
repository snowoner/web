"use strict";
// JSON.parse(localStorage.getItem("datos"));

// JSON.stringify(localStorage.setItem("datos"));

Vue.component("timer", {
    props: ['title'],
    template: `
    <div class="timer bg-info">
        <h3>{{this.title}}</h3>
        <h2>{{ contador }}</h2>
        <button v-if="!working" @click="start">Go</button>
        <button v-if="working" @click="stop">Stop</button>
        <button v-if="contador!=0" @click="reset">Reset</button>
    </div>
  `,
  data() {
      return {
    contador: 0,
    interval: null,
    working: false
      };
  },
  methods: {
    start() {
      this.working = true;
      this.interval = setInterval(()=> {
        this.contador++;
      }, 100);
    },
    stop() {
      this.working = false;
      clearInterval(this.interval);
    },
    reset() {
      this.contador = 0;
    }
  }
});

const myVue = new Vue({
  el: "#app",
  data: {
   timers:0,
  },
  methods: {
    addTimer(){
        this.timers++;
    },
    subTimer(){
        this.timers--;
    },
  }
});



