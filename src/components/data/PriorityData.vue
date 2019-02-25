<template>
  <div>
    <canvas :id="canvasName" height="250px"/>
  </div>
</template>
<script>
import chart from "chart.js";
import axios from "axios";
export default {
  name: "prioritydata",
  data() {
    return {
      canvasName: "prioritydata",
      labels: [],
      data: [],
      color: []
    };
  },
  mounted() {
    axios.get(this.$store.getters["routes/getPriorityData"]).then(result => {
      result.data.bugs.forEach(bug => {
        if (bug.priority === null) bug.priority = "Not Set";
        this.labels.push("Priority:" + bug.priority);
        this.data.push(bug.bugscount);
        this.color.push("#" + ((Math.random() * 0xffffff) << 0).toString(16));
        this.createPie();
      });
    });
  },
  methods: {
    createPie() {
      new chart(document.getElementById(this.canvasName), {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [{ data: this.data, backgroundColor: this.color }]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
