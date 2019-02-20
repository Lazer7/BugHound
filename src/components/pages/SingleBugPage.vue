<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/report.png"/>
    <div class="container notification">
    <article class="media">
        <figure class="media-left">
            <div> <strong>Severity</strong> </div>
            <p class="image is-64x64">
            <img :src="getImage(data.severity)">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p><strong>Program:</strong> {{data.programid}} <p>
                <p><strong>Date Reported:</strong> {{getDate(new Date(data.datereported))}} </p>
                <p><strong>Reported By:</strong> {{(getEmployee(data.reportedby))}} </p>
                <p><strong>Severity: </strong>{{SeverityData[data.severity-1]}} </p>
                <p><strong>Report Type:</strong>{{ReportData[data.reporttype-1]}} </p>
                <p><strong>Reproducible: </strong> {{data.reproducible.data[0]===1? "Yes" : "No"}}</p>
                <p><strong>Problem Summary</strong><br>
                {{data.problemsummary}}</p>
                <p><strong>Problem Description</strong>
                {{data.problemdescription}}</p>
                <p><strong>Suggested Fix</strong></p>{{data.suggestedfix}}
            </div>
        </div>
    </article>
        <article class="media">
        <figure class="media-left">
            <div> <strong>Misc.</strong> </div>
            <p class="image is-64x64">
            <img src="../../assets/function.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p v-if="data.area"><strong>Functional Area: </strong> {{data.area}}</p>
                <p v-if="data.assignedto"><strong>Assigned To: </strong> {{(getEmployee(data.assignedto))}}</p>
                <p v-if="data.comments"><strong>Comments: </strong> {{data.comments}}</p>
                <p v-if="data.status"><strong>Status: </strong>{{StatusData[data.status-1]}} </p>
                <p v-if="data.priority"><strong>Priority: </strong>{{data.priority}} </p>
                <p v-if="data.resolution"> <strong>Resolution: </strong> {{ResolutionData[data.resolution-1]}}</p>
                <p v-if="data.resolutionversion"><strong>Resolution Version: </strong>{{data.resolutionversion}}</p>
                <p v-if="data.resolvedby"><strong>Resolved By: </strong>{{getEmployee(data.resolvedby)}}</p>
                <p v-if="data.dateresolved"><strong>Resolved By Date: </strong>{{getDate(new Date(data.dateresolved))}}</p>
                <p v-if="data.resolutiontestedby"><strong>Tested By: </strong>{{getEmployee(data.resolutiontestedby)}} </p>
                <p v-if="data.resolutiontesteddate"><strong>Tested Date: </strong>{{getDate(new Date(data.resolutiontesteddate))}} </p>
                <p v-if="data.deferred"><strong>Treated as deferred: </strong>{{data.deferred?"Yes":"No"}}</p>
            </div>
        </div>
    </article>
    <div class="has-text-right">
        <a class="button" @click="toggleEdit()"> <v-icon name="edit"/><label>Edit</label></a> 
        <a class="button" @click="toggleDelete()"><v-icon name="trash"/><label>Delete</label></a>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"BugBox",
    props:['data','employeeList'],
    data(){
        return {
            ReportData:[
                "Coding Error",
                "Design Issue",
                "Suggestion",
                "Documentation",
                "Hardware",
                "Query"
                ],
            SeverityData:[
                "Fatal",
                "Serious",
                "Minor"
            ],
            StatusData:["Open","Close"],
            PriorityData:[1,2,3,4,5],
            ResolutionData:[
              "Pending",
              "Fixed",
              "Irreproducible",
              "Deferred",
              "At designed",
              "Can't be fixed",
              "Withdrwawn by reporter",
              "Needs more information",
              "Disagree with suggestion",
              "Duplicate"
            ],
            ResolutionVersionData:['1.0','2.0','3.0'],
        }
    },
    mounted(){
        var self = this;
    },
    methods:{
        getImage(id){
            if(id===1) return require('../../assets/danger.png');
            else if(id===2) return require('../../assets/warning.png');
            else return require('../../assets/minor.png');
        },
        getEmployee(id){
            var employee =this.employeeList.find(employee=>{return employee.id ===id});
            return employee!==undefined? employee.firstname +" "+ employee.lastname: "";
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
        toggleEdit(){
            console.log(this.data);
            this.$store.dispatch('userInfo/setCurrentPage',3);
            this.$router.push({name:"BugSubmission",params:{data:this.data}});
        },
        toggleDelete(){
            this.$dialog.confirm({
                title: "Deleting Bug",
                message:
                "Are you sure you want to <b>delete</b> this wonderful bug? This action cannot be undone.",
                confirmText: "Delete Bug",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                axios
                    .delete(this.$store.getters["routes/bugRoute"] + this.data.bugid)
                    .then(() => {
                    this.$store.dispatch('userInfo/setCurrentPage',0);
                    this.$router.push('/Main/DashBoard');
                    })
                }
            });
        }

    }
}
</script>
