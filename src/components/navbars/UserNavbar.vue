<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <figure class="logo">
          <img src="../../assets/logoname.png"/>
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
            <a class="button is-outlined" @click="logout">
              <strong>Log Out</strong>
            </a>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
  name:'usernav',
  methods:{
    logout(){
      this.$store.dispatch('userInfo/resetUser');
      axios.defaults.headers.common['Authorization'] = undefined;
      this.$router.push('/');
      Swal.fire({
        background:"#2d2d2d",
        title:`<span style="color:#FFFFFF">Logged Out`,
        type:"success"
      })
    }
  }
}
</script>


<style scoped>
    .swal2-title{
      color:white !important;
    }
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
      color:white;
      background:#2d2d2d;
    }
</style>