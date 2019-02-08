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
                <b-input v-model="username" value="" placeholder="Username"></b-input>
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
            <b-field label="User Level">
                <b-select placeholder="Level" v-model="userlevel">
                    <option
                    placeholder="Select a name"
                        v-for="level in data"
                        :value="level"
                        :key="level">
                        {{ level }}
                    </option>
                </b-select>
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
import axios from 'axios';
export default {
  name:'Login',
  data(){
    return{
      username:"",
      password:"",
      password2:"",
      firstname:"",
      lastname:"",
      userlevel:0,
      data: ['1','2','3','4','5']
    }
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    signUp(){
      var self = this;
      var user ={
        username:this.username,
        password:this.password,
        firstname:this.firstname,
        lastname:this.lastname,
        userlevel:this.userlevel
      }
      axios.post(this.$store.getters['routes/addEmployee'],user).then((result)=>{
          self.$store.dispatch('userInfo/setUser',{username:this.username,password:this.password});
          self.toUserPage();
          self.close();
      })
      
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
