<template>
  <div class="modal is-active">
    <div class="modal-background"/>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-left">
          <strong>Advanced Search</strong>
        </p>
      </header>
      <section class="modal-card-body">
        <div class="has-text-left">
          <b-field label="Program">
            <b-select placeholder="Select Program" v-model="program">
              <option
                v-for="(level,index) in ProgramData"
                :value="level"
                :key="index"
              >{{ level.name }} V:{{level.version}} R:{{level.release}}</option>
            </b-select>
          </b-field>

          <b-field label="Report Type">
            <b-select placeholder="Select Report Type" v-model="report_type">
              <option v-for="data in ReportData" :value="data.key" :key="data.key">{{ data.value }}</option>
            </b-select>
          </b-field>

          <b-field label="Severity">
            <b-select placeholder="Select Severity" v-model="severity">
              <option
                v-for="data in SeverityData"
                :value="data.value"
                :key="data.key"
              >{{ data.value }}</option>
            </b-select>
          </b-field>

          <b-field label="Date Reported">
            <b-datepicker
              placeholder="Type or select a date..."
              v-model="date_reported"
              icon="calendar"
              editable
            ></b-datepicker>
          </b-field>

          <hr>
          <div class="columns">
            <div class="column is-3">
              <b-field label="Functional Area">
                <b-select placeholder="Functional Area" v-model="area">
                  <option
                    v-for="(data,index) in AreaData"
                    :value="data"
                    :key="index"
                  >{{ data.name }}</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Assigned To">
                <b-select placeholder="Assigned To" v-model="assigned_to">
                  <option
                    v-for="(data,index) in EmployeeData"
                    :value="data"
                    :key="index"
                  >{{ data.firstname }} {{data.lastname}}</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Status">
                <b-select placeholder="Status" v-model="status">
                  <option
                    v-for="data in StatusData"
                    :value="data.value"
                    :key="data.key"
                  >{{ data.value }}</option>
                </b-select>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column is-3">
              <b-field label="Priority">
                <b-select placeholder="Priority" v-model="priority">
                  <option v-for="data in PriorityData" :value="data" :key="data">{{ data }}</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Resolution">
                <b-select placeholder="Resolution" v-model="resolution">
                  <option
                    v-for="data in ResolutionData"
                    :value="data.value"
                    :key="data.key"
                  >{{ data.value }}</option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Resolved By">
                <b-select placeholder="Resolved By" v-model="resolved_by">
                  <option
                    v-for="(data,index) in EmployeeData"
                    :value="data"
                    :key="index"
                  >{{ data.firstname }} {{data.lastname}}</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="submit" :disabled="validSearch">Submit</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AdvanceSearch",
  data() {
    return {
      ProgramData: [],
      EmployeeData: [],
      ReportData: [
        { key: 1, value: "Coding Error" },
        { key: 2, value: "Design Issue" },
        { key: 3, value: "Suggestion" },
        { key: 4, value: "Documentation" },
        { key: 5, value: "Hardware" },
        { key: 6, value: "Query" }
      ],
      SeverityData: [
        { key: 1, value: "Fatal" },
        { key: 2, value: "Serious" },
        { key: 3, value: "Minor" }
      ],
      AreaData: [],
      StatusData: [{ key: 1, value: "Open" }, { key: 2, value: "Close" }],
      PriorityData: [1, 2, 3, 4, 5],
      ResolutionData: [
        { key: 1, value: "Pending" },
        { key: 2, value: "Fixed" },
        { key: 3, value: "Irreproducible" },
        { key: 4, value: "Deferred" },
        { key: 5, value: "At designed" },
        { key: 6, value: "Can't be fixed" },
        { key: 7, value: "Withdrwawn by reporter" },
        { key: 8, value: "Needs more information" },
        { key: 9, value: "Disagree with suggestion" },
        { key: 10, value: "Duplicate" }
      ],
      program: undefined,
      report_type: undefined,
      severity: undefined,
      date_reported: undefined,
      area: undefined,
      assigned_to: undefined,
      status: undefined,
      priority: undefined,
      resolution: undefined,
      resolved_by: undefined
    };
  },
  mounted() {
    var self = this;
    axios.get(this.$store.getters["routes/getProgram"]).then(result => {
      self.ProgramData = result.data.programs;
      axios.get(this.$store.getters["routes/getEmployees"]).then(result => {
        self.EmployeeData = result.data.employees;
        axios.get(this.$store.getters["routes/getArea"]).then(result => {
          self.AreaData = result.data.areas;
        });
      });
    });
  },
    computed: {
    validSearch() {
      if (
        this.program === undefined &&
        this.report_type === undefined &&
        this.severity === undefined &&
        this.date_reported === undefined &&
        this.area === undefined &&
        this.assigned_to === undefined &&
        this.status === undefined &&
        this.priority === undefined &&
        this.resolution === undefined &&
        this.resolved_by === undefined
      ) {
        console.log("Everything is undefine");
        return true;
      } else {
        console.log("KEK");
        return false;
      }
    }
  },
  methods: {
    close() {
      this.$emit("toggle");
    },
    submit() {
      var programName = this.program !== undefined ? this.program : undefined;
      var areaName = this.area !== undefined ? this.area.name : undefined;
      var resolvedName =
        this.resolved_by !== undefined ? this.resolved_by.id : undefined;
      var assignedName =
        this.assigned_to !== undefined ? this.assigned_to : undefined;

      var searchData = {
        programid: programName,
        reporttype: this.report_type,
        severity: this.severity,
        datereported: this.date_reported,
        area: areaName,
        assignedto: assignedName,
        status: this.status,
        priority: this.priority,
        resolution: this.resolution,
        resolvedby: resolvedName
      };
      this.$emit("toggle", searchData);
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
</style>
