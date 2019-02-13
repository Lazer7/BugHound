<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">                        
            <strong>Edit User</strong>
        </p>
      </header>
      <section class="modal-card-body">
       <div class="has-text-left">
            <b-field label="First Name">
                <b-input 
                    v-model="firstname"
                    placeholder="First Name"
                    maxlength="32"/>
            </b-field>
            <b-field label="Last Name">
                <b-input 
                    v-model="lastname"
                    placeholder="Last Name"
                    maxlength="32"/>
            </b-field>
            <b-field label="Username">
                <b-input v-model="username" 
                      value="" 
                      placeholder="Username"
                      maxlength="32"/>
            </b-field>
            <b-field label="Password">
                <b-input type="password"
                    v-model="password"
                    placeholder="Password"/>
            </b-field>

            <b-field label="Re-type Password" :type="mismatchPasswords" :message="mismatchMessage">
                <b-input type="password"
                    v-model="password2"
                    placeholder="Re-type Password"/>
            </b-field>

            <b-field label="User Level">
                <b-select placeholder="Level" v-model="userlevel">
                    <option
                        v-for="level in dataLevel"
                        :value="level"
                        :key="level">
                        {{ level }}
                    </option>
                </b-select>
            </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="edit" :disabled="validate">Edit</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'Login',
  props:['data'],
  data(){
    return{
      username:"",
      password:"",
      password2:"",
      firstname:"",
      lastname:"",
      userlevel:0,
      dataLevel: ['1','2','3','4','5']
    }
  },
  computed:{
    validate(){
      if(this.username==="") return true;
      if(this.password==="") return true;
      if(this.password2==="") return true;
      if(this.password2 !== this.password) return true;
      if(this.firstname==="")return true;
      if(this.lastname==="")return true;
      if(this.userlevel===undefined)return true;
      return false;
    },
    mismatchPasswords(){
      if(this.password2 !== this.password) return 'password is-danger';
      else return 'password'
    },
    mismatchMessage(){
      if(this.password2 !== this.password) return 'Passwords do not match';
      else{ return ""}
    }
  },
  mounted(){
      this.firstname=this.data.firstname;
      this.lastname=this.data.lastname;
      this.userlevel = this.data.userlevel;
      this.username = this.data.username;
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    edit(){
      var self = this;
      var user ={
        id: this.data.id,
        firstname:this.firstname,
        lastname:this.lastname,
        userlevel:this.userlevel,
        username:this.username,
        password:this.password
      }
      axios.put(this.$store.getters['routes/employeeRoute'],user).then((result)=>{
        self.toEmployee();
        self.$forceUpdate();
        self.close();
      })

    },
    toEmployee(){
      this.$router.push('/Main/Employee');
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
    color:#FFFFFF;
  }
  .button:hover{
    background: #ffffff;
    color: #2d2d2d;
  }
</style>
