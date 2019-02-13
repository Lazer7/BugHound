<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/area.png"/>
      <div class="container">
          <div class="notification">
            <a class="button" @click="toggleSubmission()"><v-icon name="plus-square"/> <label><strong>Add an Area</strong></label></a><br/><br/>
            <table class="table">
                <thead>
                    <tr>
                        <th>Area Name</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value,index) in data" :key="index">
                        <th class="has-text-left">{{value}}</th>
                        <th>
                            <a class="button" @click="toggleSubmission(value)"> <v-icon name="edit"/><label>Edit</label></a> 
                            <a class="button"><v-icon name="trash"/><label>Delete</label></a>
                        </th>                    
                    </tr>
                </tbody>

            </table>
          </div>
    </div>
    <submission v-if="modal" v-on:toggle="closeSubmission" :data="editData"/>
  </div>
</template>
<script>
import submission from '../modals/AreaSubmission';
import axios from 'axios';
export default {
    name:'BugReport',
    components:{
        submission:submission
    },
    data(){
        return{
            data:['Top','Right','Left','Bottom'],
            editData:{},
            modal:false,
        }
    },
    created(){        
        this.getValue();
    },
    methods:{
        getValue(){
            var self = this;
            axios.get(this.$store.getters['routes/getArea']).then((result)=>{
                console.log(result.data);
                self.data = result.data.areas;
            })
        },
        toggleSubmission(value){
            this.editData = value;
            this.modal = true;
        },
        closeSubmission(value){
            this.getValue();
            this.modal = false;
            this.$forceUpdate();
        }
    }
}
</script>

<style scoped>
    hr{
    background: #2d2d2d;
    }
    a{
        margin:auto !important;
    }
  .button{
        background:white;
        color:#2d2d2d;
  }
  .button:hover{
        background: #2d2d2d;
        color: white;
  }
    label{
        padding-left:5%;
    }
    .table{
        margin:auto;
        margin-top:2%;
    }
</style>
