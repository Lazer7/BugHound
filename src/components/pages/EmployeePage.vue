<template>
  <div class="section has-text-left">
    <img width="40%" src="../../assets/employees.png">
    <div class="container">
      <div class="notification">
        <edit v-if="editModal" :data="editData" v-on:toggle="closeEdit"/>
        <table class="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Level</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value,index) in data" :key="index">
              <th class="has-text-centered">{{value.id}}</th>
              <th>{{value.firstname}}</th>
              <th>{{value.lastname}}</th>
              <th class="has-text-centered">{{value.userlevel}}</th>
              <th>
                <a class="button" @click="toggleEdit(value)">
                  <v-icon name="edit"/>
                  <label>Edit</label>
                </a>
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
  </div>
</template>

<script>
import axios from "axios";
import "vue-awesome/icons";
import edit from "../modals/EmployeeEditModal";
import Swal from 'sweetalert2';
export default {
  name: "employee",
  components: {
    edit: edit
  },
  data() {
    return {
      data: [
        {
          employee: {
            firstname: "Jimmy",
            lastname: "Chao",
            userlevel: 5,
            id: 100
          }
        }
      ],
      editModal: false,
      editData: {}
    };
  },
  created() {
    this.getValue();
  },
  methods: {
    getValue() {
      var self = this;
      axios.get(this.$store.getters["routes/getEmployees"]).then(result => {
        self.data = result.data.employees;
      });
    },
    toggleEdit(value) {
      this.editData = value;
      this.editModal = true;
    },
    toggleDelete(value) {
      var self = this;
      this.$dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <b>delete</b> this employee? This action cannot be undone.",
        confirmText: "Delete employee",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .delete(this.$store.getters["routes/employeeRoute"] + value.id)
            .then(result => {
              self.$snackbar.open({
                message: "Successfully deleted a employee!",
                duration: 5000
              });
            })
            .catch(err => {
              Swal.fire({
                background: "#2d2d2d",
                title: `<span style="color:#FF0000">Oops.. OwO</span>`,
                html:
                  `<span style="color:#FF0000">Cannot delete employee as it is currently in use!</span>`,
                type: "error"
              });
            });
        }
      });
    },
    closeEdit() {
      this.getValue();
      this.editModal = false;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
label {
  padding-left: 5%;
}
.table {
  margin: auto;
  margin-top: 2%;
}
.button {
  background: white;
  color: #2d2d2d;
}
.button:hover {
  background: #2d2d2d;
  color: white;
}
</style>

