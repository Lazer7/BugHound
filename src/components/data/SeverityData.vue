<template>
  <div>
    <canvas :id="canvasName" height="250px"/>
  </div>
</template>
<script>
import chart from "chart.js";
import axios from "axios";
export default {
  name: "severitydata",
  props: ["user"],
  data() {
    return {
      canvasName: "severitydata",
      labels: [],
      data: [],
      color: [],
      severityData: [
        "Fatal" ,
        "Serious" ,
        "Minor" 
      ]
    };
  },
  mounted() {
    axios.get(this.$store.getters["routes/getSeverityData"] + this.user.id).then(result => {
      result.data.bugs.forEach(bug => {
        this.labels.push(this.severityData[bug.severity-1]);
        this.data.push(bug.bugscount);
        this.color.push("#" + ((Math.random() * 0xffffff) << 0).toString(16));
        this.createPie();
      });
    });
  },
  methods: {
    createPie() {
      new chart(document.getElementById(this.canvasName), {
        type: "doughnut",
        data: {
          labels: this.labels,
          datasets: [{ data: this.data, backgroundColor: this.color }]
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
