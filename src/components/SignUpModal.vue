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
                    value=""
                    placeholder="First Name"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Last Name">
                <b-input 
                    value=""
                    placeholder="Last Name"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Username">
                <b-input value="" placeholder="Username"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password"
                    value=""
                    placeholder="Password"
                    password-reveal>
                </b-input>
            </b-field>
            <b-field label="Re-type Password">
                <b-input type="password"
                    value=""
                    placeholder="Re-type Password"
                    password-reveal>
                </b-input>
            </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" >Sign Up</button>
        <button class="button is-success" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name:'Login',
  methods:{
    close(){
      this.$emit('toggle', false);
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
