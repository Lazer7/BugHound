<template>  
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                <figure class="logo">
                    <img src="../assets/logoname.png"/>
                </figure>
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <a class="button is-outlined">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-outlined" @click="toggleLogin(true)">
                    Log in
                </a>
                </div>
            </div>
            <login v-if="login" v-on:toggle="toggleLogin"/>
        </div>
    </nav>
</template>

<script>
import login from './LoginModal'
export default {
  name:'NavBar',
  components:{
    login:login
  },
  data(){
    return {
      login:false
    };
  },
  methods:{
    toggleLogin(value){
      this.login=value;
    }
  }
}
</script>

<style scoped>
    .navbar{
        background:#7957D5;
    }
    .logo{
        padding-top: 5%;
    }
    .button{
        color: #7957D5;
        background: white;
    }
</style>
