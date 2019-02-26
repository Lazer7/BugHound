<template>
  <div>
    <canvas :id="canvasName" height="250px"/>
  </div>
</template>
<script>
import chart from "chart.js";
import axios from "axios";
export default {
  name: "programdata",
  props: ["user"],
  data() {
    return {
      canvasName:"programdata",
      labels:[],
      data:[],
      color:[]
    };
  },
  mounted() {
      axios.get(this.$store.getters['routes/getProgramData'] + this.user.id).then(result=>{
        result.data.bugs.forEach(bug => {
            this.labels.push(bug.name);
            this.data.push(bug.bugscount);
            this.color.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
            this.createPie();
        });
      })
      
  },
  methods: {
    createPie() {
      new chart(document.getElementById(this.canvasName), {
        type: "pie",
        data: {
            labels: this.labels,
            datasets:[{data:this.data,backgroundColor:this.color}]
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
