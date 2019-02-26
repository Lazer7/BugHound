<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">                        
            Login
        </p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
            <b-field label="Username">
                <b-input v-model="username" placeholder="Username"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password"
                    v-model="password"
                    placeholder="Password">
                </b-input>
            </b-field>
            <div v-if="error" class="danger">{{warning}}</div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="login" :disabled="isEmpty">Login</button>
        <button class="button" @click="close">Cancel</button> 
      </footer>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'Login',
  data(){
    return{
      username:"",
      password:"",
      warning:"",
      error:false
    }
  },
  computed:{
    isEmpty(){
      if(this.username==="") return true;
      if(this.password==="") return true;
      return false;
    }
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    login(){
      var self= this;
      var user ={
        username:this.username,
        password:this.password
      };
      axios.post(this.$store.getters['routes/login'] ,user)
      .then((result)=>{
          self.$store.dispatch('userInfo/setUser',result.data.user);
          self.$store.dispatch('userInfo/setBearerToken', result.data.token);
          axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
          self.toUserPage();
          self.close();
      })
      .catch((err) => {
        self.error=true;
        self.warning="Incorrect Username/Password";
      });
    },
    toUserPage(){
      this.$store.dispatch('userInfo/setCurrentPage',0);
      this.$router.push('/Main');
    }
  }
}
</script>
<style scoped>
  .image{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:20%;
  }
  .button{
    background: #2d2d2d;
    color: white;
  }
  .button:hover{
    background:white;
    color:#2d2d2d;
  }
  .danger{
    color:red;
  }
</style>
