<template>
  <div class="section has-text-left">
    <img width="30%" src="../../assets/companybug.png"/>
    <div class="container">
    <div class="box" v-for="(bug,index) in buglist" :key=index>
      <bugbox :data="bug" :employeeList="employees"/>
    </div>
    </div>
  </div>
</template>
<script>
import bugbox from '../media/BugBox';
import axios from 'axios';
  export default {
    name: "companybuglist",
    components:{
      bugbox:bugbox
    },
    data(){
      return{
        buglist:[],
        employees:[]
      }
    },
    mounted(){
      var self = this;
      axios.get(this.$store.getters['routes/getBugs']).then(result=>{
        self.buglist = result.data.bugs;
      })
      axios.get(this.$store.getters['routes/getEmployees']).then(result=>{
        self.employees = result.data.employees;
      })
    }
  }
</script>

<style scoped>
.company{
  margin: 5% 5% 5% 0%;
}
</style>
