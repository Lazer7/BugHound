<template>
    <div class="homepage">
      <img class="banner" src="../../assets/banner.png"/>
      <section class="section">
        <div class="container">
          <h1 class="title">Track Code</h1>
          <h2 class="subtitle">
            Faster
            Easier
            Better
          </h2>
        </div>
        <hr>
        <div class="container has-text-centered">
          <h1 class="title">Creators</h1>
          <h2 class="subtitle">
            <div class="columns">
              <div class="column">
                <strong>Jimmy Chao (Lazer)</strong><br/>
                <figure class="image is-1x1">
                  <img class="is-rounded" src="../../assets/Lazer.jpg">
                </figure>
              </div>
              <div class="column">
                <strong>Konstantin Zlatkov (Sithonic)</strong>
                <figure class="image is-128x128">
                  <img class="is-rounded" src="../../assets/Sithonic.jpg">
                </figure>
              </div>
            </div>
          </h2>
        </div>
      </section>
      <footer class="footer">
        <div class="content has-text-centered ">
          <img class="image" src="../../assets/logoname.png"/>  
            <div class="columns has-text-left">
              <div class="column ">
                <p>
                  <strong>About Bug Hound</strong><br/>
                  Bug Hound is a web-based bug recording and tracking software
                  product. Our team is dedicated to provide users a straight-forward
                  way to create,edit and update bugs for their projects. 
                </p>
              </div>
              <div class="column">
                <strong>Our Vision</strong><br/>
                To hopefully get an A in our testing class by creating this
                web-application to track bugs.
              </div>
              <div class="column">
                <strong>Sponsors</strong><br/>
                None. Please help us.
              </div>
              <div class="column">
                <strong> Contact </strong><br/>
                <v-icon name="map-marker-alt"/> Location <br/>
                1250 Bellflower Blvd, <br/>
                Long Beach, <br/>
                CA 90840<br/><br/>
                <v-icon name="mobile-alt"/> Phone <br/>
                (562) 000-0000
              </div>
            </div>
        </div>
      </footer>
    </div>
</template>
<script>
import 'vue-awesome/icons';
export default {
  name:'Homepage',
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
