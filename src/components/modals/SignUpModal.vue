<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">Sign Up</p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
          <b-field label="First Name">
            <b-input v-model="firstname" placeholder="First Name" maxlength="32"/>
          </b-field>
          <b-field label="Last Name">
            <b-input v-model="lastname" placeholder="Last Name" maxlength="32"/>
          </b-field>
          <b-field label="Username" :type="validUsername" :message="validUserMessage">
            <b-input v-model="username" value placeholder="Username" maxlength="32"/>
          </b-field>
          <b-field label="Password" :type="validPassword" :message="validMessage">
            <b-input type="password" v-model="password" placeholder="Password"/>
          </b-field>

          <b-field label="Re-type Password" :type="mismatchPasswords" :message="mismatchMessage">
            <b-input type="password" v-model="password2" placeholder="Re-type Password"/>
          </b-field>

          <b-field label="User Level">
            <b-select placeholder="Level" v-model="userlevel">
              <option v-for="level in data" :value="level" :key="level">{{ level }}</option>
            </b-select>
          </b-field>
          <div class="danger">{{warning}}</div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="signUp" :disabled="validate">Sign Up</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      userlevel: undefined,
      data: ["1", "2", "3", "4", "5"],
      warning: ""
    };
  },
  computed: {
    validate() {
      if (this.username === "") return true;
      if (this.username.length < 5) return true;
      if (this.password === "") return true;
      if (this.password2 === "") return true;
      if (this.password2 !== this.password) return true;
      if (this.password.length < 5) return true;
      if (this.firstname === "") return true;
      if (this.lastname === "") return true;
      if (this.userlevel === undefined) return true;
      return false;
    },
    validPassword() {
      if (this.password.length < 5 && this.password.length !== 0)
        return "password is-danger";
      else return "password";
    },
    validMessage() {
      if (this.password.length < 5 && this.password.length !== 0)
        return "Password cannot be shorter than 5 characters";
      else return "";
    },
    mismatchPasswords() {
      if (this.password2 !== this.password) return "password is-danger";
      else return "password";
    },
    mismatchMessage() {
      if (this.password2 !== this.password) return "Passwords do not match";
      else {
        return "";
      }
    },
    validUsername() {
      if (this.username.length < 5 && this.username.length !== 0)
        return "is-danger";
      else {
        return "";
      }
    },
    validUserMessage() {
      if (this.username.length < 5 && this.username.length !== 0)
        return "Username cannot be shorter than 5 characters";
      else {
        return "";
      }
    }
  },
  methods: {
    close() {
      this.$emit("toggle", false);
    },
    signUp() {
      var self = this;
      var user = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        userlevel: this.userlevel
      };
      axios
        .post(this.$store.getters["routes/register"], user)
        .then(result => {
          self.$store.dispatch("userInfo/setUser", result.data.employee);
          self.$store.dispatch("userInfo/setBearerToken", result.token);
          self.toUserPage();
          self.close();
        })
        .catch(err => {
          self.warning = "Username already exist!";
        });
    },
    toUserPage() {
      this.$store.dispatch('userInfo/setCurrentPage',0);
      this.$router.push("/Main");
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
