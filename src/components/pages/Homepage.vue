<template>
    <div class="homepage">
      <img class="banner" src="../../assets/banner.png"/>
      
        <div class="container">
          <h1 class="title has-text-left">
            Bug Hound: Bug Tracking Software for the Computing Impaired Master Students
          </h1>
          <h2 class="subtitle has-text-left">
            <article class="media">
              <img width="10%" src="../../assets/Debug.png"/>
              <div class="media-content">
                <div class="content">
                  With Bug Hound you will be able to record and track bugs in real time throughout your project development lifecycle.
                  You will be able to create, update, and resolve any bug reports that you or your team has found in the program and 
                  will be able to quickly resolve them.
                </div>
              </div>
            </article>
            <article class="media">
              <div class="media-content has-text-left">
                <div class="content">
                  Easily keep track of your programs and bugs through Bug Hound's intuitive bug tracking system. Allows you to assign yourself and other
                  to different projects easily and assign each member different bugs through project development. Bug Hound will notify you of the priority
                  of each bugs to allow you to stay on top of maintenance of your project.
                </div>
              </div>
              <figure class="media-right">
                <img width="60%" src="../../assets/planner.png">
              </figure>
            </article>
            <article class="media">
              <img width="10%" src="../../assets/employee.png"/>
              <div class="media-content">
                <div class="content">
                  Bug Hound knows keeping track of task assignment of employees is as hard as fixing those bugs in a project. So Bug Hound created a easy way
                  to add new employees to a project, track their assigned bugs, and their overall bug fixing throughout the project.
                </div>
              </div>
            </article>
          </h2>
        </div>
        <hr>
        <div class="container has-text-centered">
          <h1 class="title">Creators</h1>
          <h2 class="subtitle">
            <div class="columns">
              <div class="column">
                <strong>Jimmy Chao (Lazer)</strong><br/>
                <figure class="image is-128x128">
                  <img class="is-rounded" src="../../assets/Lazer.jpg">
                </figure><br/>
                <div class="section">
                A huge weeb with very little knowledge of what he is doing. Sometimes he wonder what the point of trying so hard is.
                He works hard for nothing, and consumes endless amounts of Sprite. Be careful around this individual.
                </div>
              </div>
              <div class="column">
                <strong>Konstantin Zlatkov (Sithonic)</strong>
                <figure class="image is-128x128">
                  <img class="is-rounded" src="../../assets/Sithonic.jpg">
                </figure><br/>
                <div class="section">
                A young man with a dream. A dream to be the most successful man in the computing field and settle down and make a family.
                An inspiring man with alot of mysteries surrounding him, and if you are single and ready mingle contact this dude.
                </div>
              </div>
            </div>
          </h2>
        </div>
      
      <hr>
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
  .media-right{
    max-width: 20%;
    margin: auto;
  }
   body{
     background-color: #2d2d2d !important;
   }
  .homepage{
     background: #2d2d2d;
  }
  .footer{
    background: #2d2d2d;
    color: white;
  }
  .image{
    width: 30%;
  }
  .columns,.media{
    margin-top: 5%;
    margin-right:5%;
    margin-left:5%;
  }
  .content{
    padding-left:5%;
    padding-right:5%;
  }
  .banner{
    width:100%;
  }
  .container{
    padding:20px 10px 20px 10px;
  }
  strong, h1, h2,.section{
    color:white;
  }
  strong{
    font-size: 25px;
  }
  figure{
    display: block;
    margin-top: 2%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
