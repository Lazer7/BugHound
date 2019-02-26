<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/area.png">
    <div class="container">
      <div class="notification">
        <a class="button" @click="toggleSubmission()">
          <v-icon name="plus-square"/>
          <label>
            <strong>Add Area</strong>
          </label>
        </a>
        <br>
        <br>
        <table class="table">
          <thead>
            <tr>
              <th>Area Name</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value,index) in data" :key="index">
              <th class="has-text-left">{{value.name}}</th>
              <th>
                <!-- <a class="button" @click="toggleSubmission(value)"> <v-icon name="edit"/><label>Edit</label></a>  -->
                <a class="button" @click="toggleDelete(value)">
                  <v-icon name="trash"/>
                  <label>Delete</label>
                </a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <submission v-if="modal" v-on:toggle="closeSubmission" :data="editData"/>
  </div>
</template>
<script>
import submission from "../modals/AreaSubmission";
import axios from "axios";
export default {
  name: "BugReport",
  components: {
    submission: submission
  },
  data() {
    return {
      data: ["Top", "Right", "Left", "Bottom"],
      editData: {},
      modal: false
    };
  },
  created() {
    this.getValue();
  },
  methods: {
    getValue() {
      var self = this;
      axios.get(this.$store.getters["routes/getArea"]).then(result => {
        self.data = result.data.areas;
      });
    },
    toggleDelete(value) {
      this.$dialog.confirm({
        title: "Deleting area",
        message:
          "Are you sure you want to <b>delete</b> this area? This action cannot be undone.",
        confirmText: "Delete area",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .delete(this.$store.getters["routes/areaRoute"] + value.name)
            .then(() => {
              this.getValue();
            })
            .catch(err => {
              Swal.fire({
                background: "#2d2d2d",
                title: `<span style="color:#FF0000">Oops.. OwO</span>`,
                html:
                  `<span style="color:#FF0000">Cannot delete area as it is currently in use!</span>` +
                  err.response.data.msg,
                type: "error"
              });
            });
        }
      });
    },
    toggleSubmission(value) {
      this.editData = value;
      this.modal = true;
    },
    closeSubmission(value) {
      this.getValue();
      this.modal = false;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
hr {
  background: #2d2d2d;
}
a {
  margin: auto !important;
}
.button {
  background: white;
  color: #2d2d2d;
}
.button:hover {
  background: #2d2d2d;
  color: white;
}
label {
  padding-left: 5%;
}
.table {
  margin: auto;
  margin-top: 2%;
}
</style>
