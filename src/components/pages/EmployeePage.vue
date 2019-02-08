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
                    <th>{{value.id}}</th>
                    <th>{{value.firstname}}</th>
                    <th>{{value.lastname}}</th>
                    <th>{{value.userlevel}}</th>
                    <th><a class="button" @click="toggleEdit(value)">Edit</a> <a class="button">Delete</a></th>                    
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
    created(){
        
        this.getValue();
    },
    methods:{
        getValue(){
            var self = this;
            axios.get(this.$store.getters['routes/getEmployees']).then((result)=>{
             console.log(result.data.employees);
             self.data = result.data.employees;
           })
        },
        toggleEdit(value){
            console.log(value);
            this.editData = value;
            this.editModal = true;
        },
        closeEdit(){
            this.getValue();
            this.editModal = false;
            this.$forceUpdate();
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

