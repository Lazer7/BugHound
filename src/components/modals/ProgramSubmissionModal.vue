<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">
          <strong>{{type}} Program</strong>
        </p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
          <b-field label="Program Name">
            <b-input v-model="name" placeholder="Program name" maxlength="32"/>
          </b-field>
          <b-field label="Date Created">
            <b-datepicker v-model="datestarted" placeholder="Click to select..."/>
          </b-field>
          <b-field label="Release">
            <b-input v-model="release" value placeholder="Release" maxlength="32"/>
          </b-field>
          <b-field label="Version">
            <b-input v-model="version" placeholder="Version" maxlength="32"/>
          </b-field>
        </div>
        <div class="danger">{{warning}}</div>
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
import Swal from 'sweetalert2';
export default {
  name: "ProgramSubmission",
  props: ["data", "programs"],
  data() {
    return {
      type: "",
      name: "",
      datestarted: undefined,
      release: "",
      version: "",
      warning: ""
    };
  },
  computed: {
    validate() {
      if (this.name === "") return true;
      if (this.datestarted === undefined) return true;
      if (this.release === "") return true;
      if (this.version === "") return true;
      if (this.data !== undefined) {
        if (
          this.name === this.data.name &&
          this.datestarted === this.data.datestarted &&
          this.release === this.data.release &&
          this.version === this.data.version
        )
          return true;
      }
      return false;
    }
  },
  mounted() {
    if (this.data === undefined) {
      this.type = "Add";
    } else {
      this.type = "Edit";
      this.id = this.data.id;
      this.name = this.data.name;
      this.datestarted = new Date(this.data.datestarted);
      this.release = this.data.release;
      this.version = this.data.version;
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
        datestarted: this.datestarted,
        release: this.release,
        version: this.version
      };
      var found = this.programs.find(program => {
        return (
          program.name === this.name &&
          program.release === this.release &&
          program.version === this.version
        );
      });
      if (this.type === "Add" && found === undefined) {
        axios
          .post(this.$store.getters["routes/programRoute"], body)
          .then(result => {
            self.$snackbar.open({
              message: "Successfully created a program!",
              duration: 5000
            });
            self.close();
          })
          .catch(err => {
            Swal.fire({
              background: "#2d2d2d",
              title: `<span style="color:#FF0000">Oops.. OwO</span>`,
              html:
                `<span style="color:#FF0000">Something went wrong!</span>` +
                err.response.data.msg,
              type: "error"
            });
          });
      } else if (this.type === "Edit") {
        body.id = this.id;
        axios
          .put(this.$store.getters["routes/programRoute"], body)
          .then(result => {
            self.$snackbar.open({
              message: "Successfully edited the program: " + self.name + "!",
              duration: 5000
            });
            self.close();
          })
          .catch(err => {
            Swal.fire({
              background: "#2d2d2d",
              title: `<span style="color:#FF0000">Oops.. OwO</span>`,
              html:
                `<span style="color:#FF0000">Something went wrong!</span>` +
                err.response.data.msg,
              type: "error"
            });
          });
      } else {
        this.warning =
          "Program already exist with that Name/Version/Resolution";
      }
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
