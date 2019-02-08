<template>
    <aside class="menu has-text-left">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li><a :class="tab[0]" @click=" toDashBoard(0)">Dashboard</a></li>
            <li><a :class="tab[1]" @click=" toUserBugPage(1)">Your Bug List</a></li>
            <li><a :class="tab[2]" @click=" toCompanyBugPage(2)">View All Bugs</a></li>
        </ul>
        <p class="menu-label">
            Programs
        </p>
        <ul class="menu-list">
            <li><a :class="tab[3]" @click=" toAddProgramPage(3)">Add New Program</a></li>
            <li><a :class="tab[4]" @click=" toJoinProgramPage(4)">Join Program</a></li>
        </ul>
        <p class="menu-label">
            Administration
        </p>
        <ul class="menu-list">
            <li><a :class="tab[5]" @click=" toEmployeePage(5)">View Employee Information</a></li>
        </ul>
    </aside>
</template>
<script>
export default {
    name:"contextmenu",
    data(){
        return{
            tab:['is-active','','','','','','']
        }
    },
    mounted(){
        this.$router.push('Main/Dashboard');
    },
    methods:{
        switchTab(value){
            this.tab=[];
            this.tab[value]='is-active';
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
        }
    }
}
</script>
<style scoped>
    .menu-label{
        font-size: 15px;
        color: white;
    }
    a{
        color:white !important;
    }
    .menu{
        padding-top:5%;
        padding-left:5%;
        padding-right:5%;
        background: #333333;
        color: #FFFFFF;
        height:900px;
    }
</style>
