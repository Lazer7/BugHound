<template>
  <div>
    <IOdometer class="iOdometer" :value="num"/>
  </div>
</template>
<script>
import chart from "chart.js";
import axios from "axios";
import IOdometer from "vue-odometer";
import "odometer/themes/odometer-theme-car.css";

export default {
  name: "unassigneddata",
  components: {
    IOdometer
  },
  data() {
    return {
      num: 0
    };
  },
  mounted() {
    var self = this;
    axios.get(this.$store.getters["routes/getUnassignedData"]).then(result => {
      self.change(result.data.bugs.length);
    });
  },
  methods: {
    change(value) {
      IOdometer.props.theme.default = "car";
      this.num = value;
    }
  }
};
</script>
<style scoped>
.iOdometer {
  font-size: 50px;
  margin: auto;
}
</style>
 