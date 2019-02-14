<template>
  <div class="section has-text-left">
      <img width="25%" src="../../assets/programs.png"/>
      <div class="container">
          <div class="notification">
            <a class="button" @click="toggleSubmission()"><v-icon name="plus-square"/> <label><strong>Add</strong></label></a> 
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Release</th>
                    <th>Version</th>
                    <th>Tools</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,index) in data" :key="index">
                    <th>{{value.name}}</th>
                    <th>{{getDate(new Date(value.datestarted))}}</th>
                    <th>{{value.release}}</th>
                    <th>{{value.version}}</th>
                    <th>
                        <a class="button" @click="toggleSubmission(value)"> <v-icon name="edit"/><label>Edit</label></a> 
                        <a class="button" @click="toggleDelete(value)"><v-icon name="trash"/><label>Delete</label></a>
                    </th>                    
                </tr>
            </tbody>
        </table>
    </div>
      </div>
      <submission :data="editData" v-on:toggle="closeSubmission" v-if="modal"/>
      </div>
</template>

<script>
import axios from 'axios';
import 'vue-awesome/icons';
import submission from '../modals/ProgramSubmissionModal'
export default {
    name:"employee",
    components:{
        submission:submission
    },
    data(){
        return{
            data:[{name:"Lazer",date_started:new Date(), release:"bleh", version:"1.0.0"}],
            modal:false,
            editData:{}
        }
    },
    created(){        
        this.getValue();
    },
    methods:{
        getValue(){
            var self = this;
            axios.get(this.$store.getters['routes/getProgram']).then((result)=>{
                self.data = result.data.programs;
            })
        },
        toggleSubmission(value){
            console.log(value);
            this.editData = value;
            this.modal = true;
        },
        closeSubmission(value){
            this.getValue();
            this.modal = false;
            this.$forceUpdate();
        },
        getDate(date){
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            return monthNames[date.getMonth()]+' '+date.getDate()+','+date.getFullYear();

        },
        toggleDelete(value){
        this.$dialog.confirm({
            title: "Deleting Program",
            message:
            "Are you sure you want to <b>delete</b> this program? This action cannot be undone.",
            confirmText: "Delete program",
            type: "is-danger",
            hasIcon: true,
            onConfirm: () => {
            axios
                .delete(this.$store.getters["routes/programRoute"] + value.name)
                .then(() => {
                this.getValue();
                });
            }
        });
        }
    }
}
</script>

<style scoped>
    label{
       padding-left:5%;
    }
    .table{
        margin:auto;
        margin-top:2%;
    }
  .button{
      background:white;
    color:#2d2d2d;

  }
  .button:hover{
        background: #2d2d2d;
    color: white;
  }
</style>

