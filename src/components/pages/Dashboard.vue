<template>
  <div class="section has-text-left">
    <img width="30%" src="../../assets/dashboard.png">

    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child is-5 notification">
          <p class="title"># of Bugs per Program</p>
          <program/>
        </article>
        <article class="tile is-child is-5 notification">
          <p class="title">Big OOF</p>
          <img src="../../assets/bigoof.png"/>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child is-5 notification">
          <p class="title">Severity Data</p>
          <severity/>
        </article>
        <article class="tile is-child is-5 notification">
          <p class="title">Priority Data</p>
          <priority/>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import severity from '../data/SeverityData';
import program from '../data/ProgramData';
import priority from '../data//PriorityData';
export default {
  name:"Dashboard",
  components:{
    severity:severity,
    program:program,
    priority:priority
  }
}
</script>

<style scoped>
.notification {
  background: #e5e4e6;
  color: #333333;
  min-height: 550px;
}
.is-child {
  margin: auto !important;
}
</style>

