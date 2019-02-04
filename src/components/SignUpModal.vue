<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">                        
            Sign Up
        </p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
            <b-field label="First Name">
                <b-input 
                    v-model="firstname"
                    placeholder="First Name"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Last Name">
                <b-input 
                    v-model="lastname"
                    placeholder="Last Name"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Username">
                <b-input value="" placeholder="Username"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password"
                    v-model="password"
                    placeholder="Password"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Re-type Password">
                <b-input type="password"
                    v-model="password2"
                    placeholder="Re-type Password"
                    password-reveal>
                </b-input>
            </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="signUp">Sign Up</button>
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
      password:"",
      password2:"",
      firstname:"",
      lastname:""
    }
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    signUp(){
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
    background: #7957D5;
  }
</style>
