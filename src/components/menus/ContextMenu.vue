<template>
    <aside class="menu has-text-left">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li><a :class="getTab(0)" @click=" toDashBoard(0)">Dashboard</a></li>
        </ul>
        <p class="menu-label">
            Bug Handling
        </p>
        <ul class="menu-list">
         <li><a :class="getTab(1)" @click=" toUserBugPage(1)">Your Bug List</a></li>
            <li><a :class="getTab(2)" @click=" toCompanyBugPage(2)">View All Bugs</a></li>
            <li><a :class="getTab(3)" @click="toBugSubmissionPage(3)"> Submit New Bug </a></li>
        </ul>
        <p class="menu-label">
            Programs
        </p>
        <ul class="menu-list">
            <li><a :class="getTab(4)" @click=" toAddProgramPage(4)">Add New Program</a></li>
            <li><a :class="getTab(5)" @click=" toJoinProgramPage(5)">Join Program</a></li>
            <li><a :class="getTab(6)" @click=" toAreaPage(6)">Add Area</a></li>
        </ul>
        <p class="menu-label">
            Administration
        </p>
        <ul class="menu-list">
            <li><a :class="getTab(7)" @click=" toEmployeePage(7)">View Employee Information</a></li>
        </ul>
    </aside>
</template>
<script>
export default {
    name:"contextmenu",
    mounted(){
        this.$router.push('Main/Dashboard');
    },
    methods:{
        getTab(value){
            return this.$store.getters['userInfo/CurrentPage'][value];
        },
        switchTab(value){
            this.$store.dispatch('userInfo/setCurrentPage',value);
        },
        toEmployeePage(value){
            this.$router.push('/Main/Employee');
            this.switchTab(value);
        },
        toCompanyBugPage(value){
            this.$router.push('/Main/CompanyBugList');
            this.switchTab(value);
        },
        toUserBugPage(value){
            this.$router.push('/Main/UserBugList');
            this.switchTab(value);
        },
        toAddProgramPage(value){
            this.$router.push('/Main/Programs');
            this.switchTab(value);
        },
        toJoinProgramPage(value){
            this.$router.push('/Main/JoinProgram');
            this.switchTab(value);
        },
        toDashBoard(value){
            this.$router.push('/Main/DashBoard');
            this.switchTab(value);
        },
        toBugSubmissionPage(value){
            this.$router.push('/Main/BugSubmission');
            this.switchTab(value);
        },
        toAreaPage(value){
            this.$router.push('/Main/Area');
            this.switchTab(value);
        }
    }
}
</script>
<style scoped>
    .menu-label{
        font-size: 15px;
        color: white;
    }
    a:hover{
        color:#333333 !important;
    }
    a{
        color:white !important;
    }
    .menu{
        padding-top:30%;
        padding-left:5%;
        padding-right:5%;
        background: #333333;
        color: #FFFFFF;
        height:1200px;
    }
</style>
