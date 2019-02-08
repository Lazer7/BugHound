<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">                        
            Edit User
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
            <b-field label="User Level">
                <b-select placeholder="User Level" v-model="userlevel">
                    <option
                        v-for="level in dataLevel"
                        :value="level"
                        :key="level">
                        {{ level }}
                    </option>
                </b-select>
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
        <button class="button is-success" @click="edit">Edit</button>
        <button class="button is-success" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
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
  mounted(){
      this.firstname=this.data.firstname;
      this.lastname=this.data.lastname;
      this.userlevel = this.data.userlevel;
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
        lasname:this.lastname,
        userlevel:this.userLevel,
        username:this.username,
        password:this.password
      }
      axios.put(this.$store.getters['routes/editEmployee'],user).then((result)=>{
        self.toEmployee();
        self.vm.$forceUpdate();
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
    background: #7957D5;
  }
</style>
