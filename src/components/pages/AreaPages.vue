<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/area.png"/>
      <div class="container">
          <div class="notification">
            <a class="button"><v-icon name="plus-square"/> <label><strong>Add an Area</strong></label></a><br/><br/>
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
                            <a class="button"> <v-icon name="edit"/><label>Edit</label></a> 
                            <a class="button"><v-icon name="trash"/><label>Delete</label></a>
                        </th>                    
                    </tr>
                </tbody>

            </table>
            
          </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'BugReport',
    data(){
        return{
            data:['Top','Right','Left','Bottom']
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
