Vue.use(VuePagination);

new Vue({
	el:"#pagination",
  data: {
  	table1Page:1,
    table2Page:1,
    code:'table1',
    records:100,
    perpage:10,
  },
  computed:{
  	PerPage: function() {
    return this.perpage?parseInt(this.perpage):25;
    },
    Records: function() {
    return this.records?parseInt(this.records):0;
    },
    totalPages: function() {
    return this.$refs.table.totalPages;
    }
  },
  methods: {
  	refresh: function() {
    	this.$refs.table.setPage(1);
    },
     prev: function() {
    	return this.$refs.table.prev();
    },
    next: function() {
    	return this.$refs.table.next();
    },
    prevChunk: function() {
    	return this.$refs.table.prevChunk();
    },
    nextChunk: function() {
    	return this.$refs.table.nextChunk();
    }
  },
  ready: function() {
  	this.$on('vue-pagination::table', function(page) {
    	this.table1Page = page;	
    });
  }
})

const myVue= new Vue({



});