<template>
    <div class="Userpage">
        Welcome User {{this.$store.getters['userInfo/User'].username}}
    </div>
</template>
<script>
import login from '../LoginModal';
import 'vue-awesome/icons';

export default {
    name:'Userpage',
}
</script>

<style scoped>
  .homepage{
    height: 1080px;
  }
  .footer{
    background: #7957D5;
    color: white;
  }
  .image{
    width: 30%;
  }
  .columns{
    margin-top: 2%;
    margin-right:5%;
    margin-left:5%;
  }
  .banner{
    width:100%;
  }
  figure{
    display: block;
    margin-top: 2%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
