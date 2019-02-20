<template>
    <article class="media" @dblclick="toSingleBugPage">
        <figure class="media-left">
            <div> <strong>Severity</strong> </div>
            <p class="image is-64x64">
            <img :src="getImage(data.severity)">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <strong>Program:</strong> {{data.programid}} <br>
                <strong>Date Reported:</strong> {{getDate(new Date(data.datereported))}} <br>
                <strong>Reported By:</strong> {{(getEmployee(data.reportedby))}} <br>
                <strong>Severity: </strong>{{SeverityData[data.severity]}} <strong> · </strong>
                <strong>Report Type:</strong>{{ReportData[data.reporttype]}} <strong> · </strong> 
                <strong>Reproducible: </strong> {{data.reproducible.data[0]===1? "Yes" : "No"}}<br>
                <strong>Problem Summary</strong><br>
                {{data.problemsummary}}<br>
                <strong>Problem Description</strong><br>
                {{data.problemdescription}}<br>
                <strong>Suggested Fix</strong><br>{{data.suggestedfix}}
            
            </div>
        </div>
    </article>
</template>

<script>
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
            ]
        }
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
        toSingleBugPage(){
            this.$router.push({name:'SingleBug',params:{data:this.data,employeeList:this.employeeList}});
        }
    }
}
</script>
