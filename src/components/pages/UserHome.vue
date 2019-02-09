<template>
    <div class="Userpage">
        <div class="columns">
          <div class="column is-2">
            <div class="context">
            <context/>
            </div>
          </div>
          <div class="column">
              <router-view/>
          </div>
        </div>
    </div>
</template>
<script>
import login from '../LoginModal';
import 'vue-awesome/icons';
import context from '../ContextMenu';
export default {
    name:'Userpage',
    components:{
      context:context
    }
}
</script>

<style scoped>
.context{
    top:0;
    position: fixed;
}
</style>
