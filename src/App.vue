<template>
  <div id="app">
    <navbar v-if="!this.$store.getters['userInfo/LoggedIn']"/>
    <usernav v-if="this.$store.getters['userInfo/LoggedIn']"/>
    <router-view/>
  </div>
</template>

<script>
  import navbar from './components/Navbar.vue';
  import usernav from './components/UserNavbar.vue';
  export default {
    name: 'App',
    components:{
      navbar:navbar,
      usernav:usernav
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
