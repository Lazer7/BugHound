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
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" @click="gohomepage">
                    Home
                </a>
                <a class="navbar-item">
                    Documentation
                </a>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <a class="button is-outlined" @click="toggleSignin(true)">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-outlined" @click="toggleLogin(true)">
                    Log in
                </a>
                </div>
            </div>
            <login v-if="login" v-on:toggle="toggleLogin"/>
            <signup v-if="signup" v-on:toggle="toggleSignin"/>
        </div>
    </nav>
</template>

<script>
import login from './LoginModal';
import signup from './SignUpModal';
export default {
  name:'NavBar',
  components:{
    login:login,
    signup:signup
  },
  data(){
    return {
      login:false,
      signup:false
    };
  },
  methods:{
    toggleLogin(value){
      this.login=value;
    },
    toggleSignin(value){
      this.signup=value;
    },


    gohomepage(){
        this.$router.push('/');
        console.log('clicked');
    },
    
  }
}
</script>

<style scoped>
    .navbar{
        background:#2d2d2d;
    }
    .navbar-item{
        color:white;
    }
    .navbar-link{
        color:white;
    }
    .logo{
        padding-top: 5%;
    }
    .button{
        color: #2d2d2d;
        background: white;
    }
    .button:hover{
        color: white;
        background: #2d2d2d;
    }
</style>
