<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">
          <strong>Add Area</strong>
        </p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
          <b-field label="Area">
            <b-input v-model="name" placeholder="Project name" maxlength="32"/>
          </b-field>
          <b-field label="Program">
            <b-select placeholder="Select Program" v-model="program">
              <option
                v-for="data in programData"
                :value="data.id"
                :key="data.id"
              >{{ data.name }}</option>
            </b-select>
          </b-field>
          <div class="danger">{{warning}}</div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="submit" :disabled="validate">Submit</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AreaSubmission",
  data() {
    return {
      name: "",
      program: undefined,
      programData: [],
      warning: ""
    };
  },
  mounted() {
    var self = this;
    axios.get(this.$store.getters["routes/getProgram"]).then(result => {
      self.programData = result.data.programs;
    });
  },
  computed: {
    validate() {
      if (this.name === "") return true;
      if(this.program===undefined) return true;
      return false;
    }
  },
  methods: {
    close() {
      this.$emit("toggle", false);
    },
    submit() {
      var self = this;
      var body = {
        name: this.name,
        programid: this.program
      };
      axios
        .post(this.$store.getters["routes/areaRoute"], body)
        .then(result => {
          self.$snackbar.open({
            message: "Successfully created a area!",
            duration: 5000
          });
          self.close();
        })
        .catch(err => {
          self.warning = "Area already exist!";
          console.log(err)
        });
    }
  }
};
</script>
<style scoped>
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
.button {
  background: #2d2d2d;
  color: #ffffff;
}
.button:hover {
  background: #ffffff;
  color: #2d2d2d;
}
.danger {
  color: red;
}
</style>
