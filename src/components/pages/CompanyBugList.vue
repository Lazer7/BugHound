<template>
  <div class="section has-text-left">
    <img width="30%" src="../../assets/companybug.png">
    <div class="container notification">
      <div class="columns">
        <div class="column is-10">
          <b-field label="Search">
            <b-input
              placeholder="Press Enter to search..."
              v-model="search"
              @keydown.native.enter="updateList"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-2">
          <b-field label="Search Field">
            <b-select placeholder="Select Field" v-model="field">
              <option
                v-for="option in fieldData"
                :value="option.key"
                :key="option.key"
              >{{ option.value }}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <button class="button" @click="advance=true">Advanced Search</button>
    </div>
    <div class="container">
      <div class="box" v-for="(bug,index) in currentBuglist" :key="index">
        <bugbox :data="bug" :employeeList="employees" :programList="programlist"/>
      </div>
    </div>
    <advance v-if="advance" v-on:toggle="advanceSearch"/>
  </div>
</template>
<script>
import bugbox from "../media/BugBox";
import advance from "../modals/AdvancedSearchModal";
import axios from "axios";
export default {
  name: "companybuglist",
  components: {
    bugbox: bugbox,
    advance: advance
  },
  data() {
    return {
      programlist: [],
      buglist: [],
      currentBuglist: [],
      employees: [],
      search: "",
      field: undefined,
      fieldData: [
        { key: "programid", value: "Program" },
        { key: "reporttype", value: "Report Type" },
        { key: "severity", value: "Severity" },
        { key: "area", value: "Functional Area" },
        { key: "assignedto", value: "Assigned To" },
        { key: "status", value: "Status" },
        { key: "priority", value: "Priority" },
        { key: "resolution", value: "Resolution" },
        { key: "reportedby", value: "Reported By" },
        { key: "datereported", value: "Report Date" },
        { key: "resolvedby", value: "Resolved By" }
      ],
      advance: false
    };
  },
  mounted() {
    var self = this;
    axios.get(this.$store.getters["routes/getBugs"]).then(result => {
      self.buglist = result.data.bugs;
      self.currentBuglist = self.buglist;
      console.log(self.currentBuglist);
    });
    axios.get(this.$store.getters["routes/getEmployees"]).then(result => {
      self.employees = result.data.employees;
    });
    axios.get(this.$store.getters["routes/getProgram"]).then(result => {
      self.programlist = result.data.programs;
    });
  },
  methods: {
    advanceSearch(value) {
      this.advance = false;
      var final = [];
      for (var property in value) {
        if (value.hasOwnProperty(property)) {
          if (value[property] !== undefined) {
            this.search = value[property];
            this.field = property;
            this.updateList();
            final = final.concat(this.currentBuglist);
          }
        }
      }
      this.currentBuglist = final;
      this.field = undefined;
      this.search = undefined;
    },
    updateList() {
      if (this.search !== "" && this.field !== undefined) {
        if (this.field === "datereported") {
          this.currentBuglist = this.searchDate(this.search);
        } else if (this.field.match("by")) {
          this.currentBuglist = this.searchEmployee(this.search);
        } else if (this.field.match("severity")) {
          this.currentBuglist = this.searchSeverity(this.search);
        } else if (this.field.match("status")) {
          this.currentBuglist = this.searchStatus(this.search);
        } else if (this.field.match("reporttype")) {
          this.currentBuglist = this.searchReportType(this.search);
        } else if (this.field.match("resolution")) {
          this.currentBuglist = this.searchResolution(this.search);
        } else {
          this.currentBuglist = this.searchOther(this.search);
        }
      } else {
        this.currentBuglist = this.buglist;
      }
    },
    searchDate(value) {
      var result = [];
      var date = new Date(value);
      this.buglist.forEach(bug => {
        var currentDate = new Date(bug[this.field]);
        if (
          currentDate !== undefined &&
          currentDate.getFullYear() === date.getFullYear() &&
          currentDate.getMonth() === date.getMonth() &&
          currentDate.getDate() === date.getDate()
        ) {
          result.push(bug);
        }
      });
      return result;
    },
    searchEmployee(value) {
      var result = [];
      this.buglist.forEach(bug => {
        this.employees.forEach(employee => {
          if (
            bug[this.field] === employee.id &&
            (value.match(employee.firstname) ||
              value.match(employee.lastname) ||
              value.match(employee.username))
          ) {
            result.push(bug);
          }
        });
      });
      return result;
    },
    searchSeverity(value) {
      var result = [];
      var data = ["Fatal", "Serious", "Minor"];
      this.buglist.forEach(bug => {
        if (value.match(data[bug[this.field] - 1])) result.push(bug);
      });
      return result;
    },
    searchStatus(value) {
      var result = [];
      var data = ["Open", "Close"];
      this.buglist.forEach(bug => {
        if (value.match(data[bug[this.field] - 1])) result.push(bug);
      });
      return result;
    },
    searchReportType(value) {
      var result = [];
      var data = [
        "Coding Error",
        "Design Issue",
        "Suggestion",
        "Documentation",
        "Hardware",
        "Query"
      ];
      this.buglist.forEach(bug => {
        if (value.match(data[bug[this.field] - 1])) result.push(bug);
      });
      return result;
    },
    searchResolution(value) {
      var result = [];
      var data = [
        "Pending",
        "Fixed",
        "Irreproducible",
        "Deferred",
        "At designed",
        "Can't be fixed",
        "Withdrwawn by reporter",
        "Needs more information",
        "Disagree with suggestion",
        "Duplicate"
      ];
      this.buglist.forEach(bug => {
        if (value.match(data[bug[this.field] - 1])) result.push(bug);
      });
      return result;
    },
    searchOther(value) {
      var result = [];
      this.buglist.forEach(bug => {
        if (value.match(bug[this.field])) {
          result.push(bug);
        }
      });
      return result;
    }
  }
};
</script>

<style scoped>
.company {
  margin: 5% 5% 5% 0%;
}
</style>
