<template>
    <aside class="menu has-text-left">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li><a :class="tab[0]" @click=" switchTab(0)">Dashboard</a></li>
            <li><a :class="tab[1]" @click=" switchTab(1)">Your Bug List</a></li>
            <li><a :class="tab[2]" @click=" switchTab(2)">View All Bugs</a></li>
        </ul>
        <p class="menu-label">
            Programs
        </p>
        <ul class="menu-list">
            <li><a :class="tab[3]" @click=" switchTab(3)">Add New Program</a></li>
            <li><a :class="tab[4]" @click=" switchTab(4)">Join Program</a></li>
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
    methods:{
        switchTab(value){
            this.tab=[];
            this.tab[value]='is-active';
        },
        toEmployeePage(value){
            this.$router.push('/Main/Employee');
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
