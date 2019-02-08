<template>
    <div>
        <edit v-if="editModal" :data="editData" v-on:toggle="closeEdit"/>
        <table class="table">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Level</th>
                    <th>Tools</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value,index) in data" :key="index">
                    <th>{{value.employee.id}}</th>
                    <th>{{value.employee.firstname}}</th>
                    <th>{{value.employee.lastname}}</th>
                    <th>{{value.employee.userlevel}}</th>
                    <th><a class="button" @click="toggleEdit(value.employee)">Edit</a> <a class="button">Delete</a></th>                    
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import axios from 'axios';
import edit from '../EditModal';
export default {
    name:"employee",
    components:{
        edit:edit
    },
    data(){
        return{
            data:[{employee:{firstname:"Jimmy",lastname:"Chao",userlevel:5,id:100}}],
            editModal:false,
            editData:{}
        }
    },
    create(){
        var self = this;
        axios.get(this.$store.getters['routes/getEmployees']).then((result)=>{
            self.data = result.data;
        })
    },
    methods:{
        toggleEdit(value){
            console.log(value);
            this.editData = value;
            this.editModal = true;
        },
        closeEdit(){
            this.editModal = false;
        }
    }
}
</script>

<style scoped>
    .table{
        margin:auto;
        margin-top:2%;
    }
    .button{
        color: #7957D5;
        background: white;
    }
    .button:hover{
        color: white;
        background: #7957D5;
    }
</style>

