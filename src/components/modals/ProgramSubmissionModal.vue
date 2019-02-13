<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">                        
            <strong>{{type}} Program</strong>
        </p>
      </header>
      <section class="modal-card-body">
       <div class="has-text-left">
            <b-field label="Project Name">
                <b-input 
                    v-model="name"
                    placeholder="Project name"
                    maxlength="32"/>
            </b-field>
            <b-field label="Date Created">
                <b-datepicker
                    v-model="date_started"
                    placeholder="Click to select..."/>
            </b-field>
            <b-field label="Release">
                <b-input v-model="release" 
                      value="" 
                      placeholder="Release"
                      maxlength="32"/>
            </b-field>
            <b-field label="Version">
                <b-input
                    v-model="version"
                    placeholder="Version"
                    maxlength="32"/>
            </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="submit" :disabled="validate">Submit</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'ProgramSubmission',
  props:['data'],
  data(){
    return{
      type:"",
      name:"",
      date_started:undefined,
      release:"",
      version:""
    }
  },
  computed:{
    validate(){
      if(this.name==="" ) return true;
      if(this.date_started===undefined) return true;
      if(this.release==="" )  return true;
      if(this.version === "" ) return true;
      if(this.data !== undefined){
          if(this.name===this.data.name 
          && this.date_started===this.data.date_started
          && this.release===this.data.release
          && this.version === this.data.version) return true;
      }
      return false;
    }
  },
  mounted(){
      if(this.data===undefined){ this.type="Add"}
      else {
        this.type="Edit"
        this.name = this.data.name;
        this.date_started = this.data.date_started;
        this.release = this.data.release;
        this.version = this.data.version;
      }
  },
  methods:{
    close(){
      this.$emit('toggle', false);
    },
    submit(){
        var self = this;
        var body = {
            name: this.name,
            date_started: this.date_started,
            release: this.release,
            version:this.version
        };
        if(this.type=="Add"){
            axios.post(this.$store.getters['routes/programRoute'],body).then((result)=>{
                console.log(result);
                self.close();
            })
        } else {
            axios.put(this.$store.getters['routes/programRoute'],body).then((result)=>{
                console.log(result);
                self.close();
            })
        }
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
