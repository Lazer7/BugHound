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
                    placeholder="Password"
                    password-reveal>
                </b-input>
            </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="login">Login</button>
        <button class="button is-success" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name:'Login',
  data(){
    return{
      username:"",
      password:""
    }
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    login(){
      this.$store.dispatch('userInfo/setUser',{username:this.username,password:this.password});
      this.toUserPage();
      this.close();
    },
    toUserPage(){
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
</style>
