<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/report.png">
    <div class="container">
      <div class="notification">
        <div class="columns">
          <div class="column is-3">
            <b-field label="Program">
              <b-select placeholder="Select Program" v-model="program">
                <option
                  v-for="(level,index) in ProgramData"
                  :value="level"
                  :key="index"
                >{{ level.name }} V:{{level.version}} R:{{level.release}}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Report Type">
              <b-select placeholder="Select Report Type" v-model="report_type">
                <option
                  v-for="data in ReportData"
                  :value="data.key"
                  :key="data.key"
                >{{ data.value }}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Severity">
              <b-select placeholder="Select Severity" v-model="severity">
                <option
                  v-for="data in SeverityData"
                  :value="data.key"
                  :key="data.key"
                >{{ data.value }}</option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-10">
            <b-field label="Problem Summary">
              <b-input v-model="problem_summary" placeholder="Summary" maxlength="500"></b-input>
            </b-field>
          </div>
          <div class="column is-2 has-text-right">
            <b-field label="Reproducible?">
              <b-checkbox v-model="reproducible">{{ reproducible?"Yes":"No" }}</b-checkbox>
            </b-field>
          </div>
        </div>
        <b-field label="Problem">
          <b-input
            v-model="problem_description"
            placeholder="Describe the problem"
            maxlength="2000"
            type="textarea"
          ></b-input>
        </b-field>
        <b-field label="Suggested Fix">
          <b-input
            v-model="suggested_fix"
            placeholder="Describe the solution"
            maxlength="2000"
            type="textarea"
          ></b-input>
        </b-field>
        <div class="columns">
          <div class="column is-3">
            <b-field label="Reported By">
              <b-select placeholder="Reported By" v-model="reported_by">
                <option
                  v-for="(data,index) in EmployeeData"
                  :value="data"
                  :key="index"
                >{{ data.firstname }} {{data.lastname}}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Date">
              <b-datepicker
                placeholder="Type or select a date..."
                v-model="date_reported"
                icon="calendar"
                editable
              ></b-datepicker>
            </b-field>
          </div>
        </div>

        <hr>
        <div class="title">Optional Fields</div>
        <div class="columns">
          <div class="column is-3">
            <b-field label="Functional Area">
              <b-select placeholder="Functional Area" v-model="area">
                <option
                  v-for="(data,index) in filterArea()"
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
                  v-for="(data,index) in EmployeeList"
                  :value="data"
                  :key="index"
                >{{ data.firstname }} {{data.lastname}}</option>
              </b-select>
            </b-field>
          </div>
        </div>

        <b-field label="Comments">
          <b-input v-model="comments" placeholder="Comments" maxlength="2000" type="textarea"></b-input>
        </b-field>
        <div class="columns">
          <div class="column is-3">
            <b-field label="Status">
              <b-select placeholder="Status" v-model="status">
                <option
                  v-for="data in StatusData"
                  :value="data.key"
                  :key="data.key"
                >{{ data.value }}</option>
              </b-select>
            </b-field>
          </div>
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
                  :value="data.key"
                  :key="data.key"
                >{{ data.value }}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Resolution Version">
              <b-select placeholder="Resolution Version" v-model="resolution_version">
                <option
                  v-for="data in ResolutionVersionData"
                  :value="data.id"
                  :key="data.id"
                >{{data.name}} V:{{data.version}} R:{{data.release}}</option>
              </b-select>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column is-3">
            <b-field label="Resolved By">
              <b-select placeholder="Resolved By" v-model="resolved_by">
                <option
                  v-for="(data,index) in EmployeeList"
                  :value="data"
                  :key="index"
                >{{ data.firstname }} {{data.lastname}}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Resolution Date">
              <b-datepicker
                placeholder="Type or select a date..."
                v-model="date_resolved"
                icon="calendar"
                editable
              ></b-datepicker>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Tested By">
              <b-select placeholder="Tested By" v-model="resolution_tested_by">
                <option
                  v-for="(data,index) in EmployeeList"
                  :value="data"
                  :key="index"
                >{{ data.firstname }} {{data.lastname}}</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Date Tested">
              <b-datepicker
                placeholder="Type or select a date..."
                v-model="resolution_tested_date"
                icon="calendar"
                editable
              ></b-datepicker>
            </b-field>
          </div>
        </div>
        <b-field label="Treat as deferred?">
          <b-checkbox v-model="deferred">
            <div v-if="deferred!==undefined">{{deferred? "Yes" : "No"}}</div>
            <div v-if="deferred===undefined">Undetermined</div>
          </b-checkbox>
        </b-field>
        <form enctype="multipart/form-data" novalidate>
          <b-field label="Upload Attachments"/>
          <div class="dropbox">
            <input
              type="file"
              multiple
              @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
              accept="*"
              class="input-file"
            >
            <p>Please drag your files or click here to begin</p>
          </div>
          <div class="columns" v-for="(list,index) in chunkFiles" :key="index">
            <div class="column is-3 has-text-centered" v-for="(file,index) in list" :key="index">
              <img width="25%" :src="getFileType(file)">
              <br>
              {{file}}
              <br>
              <a class="button" @click="removeFile(file)">Delete File</a>
            </div>
          </div>
        </form>

        <hr>
        <button class="button" :disabled="validate" @click="submit">Submit</button>
        <button class="button" @click="toDashBoard">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "BugReport",
  props: ["data"],
  data() {
    return {
      ProgramData: [],
      EmployeeData: [],
      EmployeeProgram: [],
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
      EmployeeList: [],
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
      ResolutionVersionData: [],
      program: undefined,
      report_type: undefined,
      severity: undefined,
      problem_summary: "",
      problem_description: "",
      suggested_fix: "",
      reported_by: undefined,
      date_reported: undefined,
      reproducible: false,
      area: undefined,
      assigned_to: undefined,
      comments: "",
      priority: undefined,
      status: undefined,
      resolution: undefined,
      resolution_version: undefined,
      resolved_by: undefined,
      date_resolved: undefined,
      resolution_tested_by: undefined,
      resolution_tested_date: undefined,
      deferred: undefined,
      type: "Add",
      bugid: 0,
      attachments: new FormData(),
      files: [],
      editedFiles: []
    };
  },
  mounted() {
    this.type = this.data === undefined ? "Add" : "Edit";
    this.getValues();
  },
  computed: {
    validate() {
      if (this.program === undefined) return true;
      if (this.report_type === undefined) return true;
      if (this.severity === undefined) return true;
      if (this.problem_summary === "") return true;
      if (this.problem_description === "") return true;
      if (this.suggested_fix === "") return true;
      if (this.reported_by === undefined) return true;
      if (this.date_reported === undefined) return true;
      if (this.reproducible === undefined) return true;
    },
    chunkFiles() {
      var chunkFiles = [];
      for (var i = 0, j = this.files.length; i < j; i += 4) {
        chunkFiles.push(this.files.slice(i, i + 4));
      }
      return chunkFiles;
    }
  },
  watch: {
    program() {
      this.filteredItems();
      this.ResolutionVersionData = this.ProgramData.filter(program => {
        return program.name === this.program.name;
      });
    }
  },
  methods: {
    removeFile(value) {
      var editIndex = this.editedFiles.find(file => {
        return file.filename.substring(10) === value;
      });
      if (this.type === "Edit" && editIndex) {
        var self = this;
        var index = this.files.indexOf(editIndex.filename.substring(10));
        var eindex = this.editedFiles.indexOf(editIndex);
        this.files.splice(index, 1);
        this.editedFiles.splice(eindex, 1);
        axios
          .delete(this.$store.getters["routes/attachmentRoute"] + editIndex.id)
          .then(result => {
            self.$snackbar.open({
              message: "Successfully deleted existing attachment!",
              duration: 5000
            });
          });
      } else {
        this.attachments.delete(value);
        var index = this.files.indexOf(value);
        this.files.splice(index, 1);
      }
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        var filename = fileList[x].name.toLowerCase();
        if (
          !this.attachments.has(filename) &&
          this.files.indexOf(filename) === -1
        ) {
          this.attachments.append(filename, fileList[x]);
          this.files.push(filename);
        }
      });
    },
    getFileType(value) {
      var index = value.lastIndexOf(".");
      var suffix = value.substring(index).toLowerCase();
      if (suffix.includes("bmp")) return require("../../assets/icons/bmp.png");
      else if (suffix.includes("dat"))
        return require("../../assets/icons/dat.png");
      else if (suffix.includes("doc"))
        return require("../../assets/icons/doc.png");
      else if (suffix.includes("gif"))
        return require("../../assets/icons/gif.png");
      else if (suffix.includes("jpg"))
        return require("../../assets/icons/jpeg.png");
      else if (suffix.includes("mp3"))
        return require("../../assets/icons/mp3.png");
      else if (suffix.includes("pdf"))
        return require("../../assets/icons/pdf.png");
      else if (suffix.includes("png"))
        return require("../../assets/icons/png.png");
      else return require("../../assets/icons/missing.png");
    },
    findProgram(value) {
      return this.ProgramData.find(program => {
        return program.id === value;
      });
    },
    findArea(value){
      return this.AreaData.find(area=>{
        return area.id===value;
      });
    },
    findEmployee(value) {
      return this.EmployeeData.find(employee => {
        return employee.id === value;
      });
    },
    filteredItems() {
      if (this.program !== undefined) {
        var EmployeeList = [];
        var EmployeesOfProgram = this.EmployeeProgram.filter(program => {
          return program.programid === this.program.id;
        });
        if (EmployeesOfProgram !== undefined || EmployeesOfProgram !== []) {
          for (var i = 0; i < EmployeesOfProgram.length; i++) {
            var result = this.EmployeeData.find(employee => {
              return employee.id === EmployeesOfProgram[i].employeeid;
            });
            if (result !== undefined) EmployeeList.push(result);
          }
        }
        this.EmployeeList = EmployeeList;
      }
    },
    filterArea() {
      if (this.program)
        return this.AreaData.filter(
          element => element.programid === this.program.id
        );
      else return [];
    },
    getValues() {
      var self = this;
      axios.get(this.$store.getters["routes/getProgram"]).then(result => {
        self.ProgramData = result.data.programs;
        axios
          .get(self.$store.getters["routes/EmployeeProgramRoute"])
          .then(result => {
            self.EmployeeProgram = result.data.programs;
            axios
              .get(self.$store.getters["routes/getEmployees"])
              .then(result => {
                self.EmployeeData = result.data.employees;
                axios
                  .get(self.$store.getters["routes/getArea"])
                  .then(result => {
                    self.AreaData = result.data.areas;
                    self.filteredItems();
                    if (self.type === "Edit") {
                      self.program = self.findProgram(self.data.programid);
                      self.report_type = self.data.reporttype;
                      self.severity = self.data.severity;
                      self.problem_summary = self.data.problemsummary;
                      self.problem_description = self.data.problemdescription;
                      self.suggested_fix = self.data.suggestedfix;
                      self.reported_by = self.findEmployee(
                        self.data.reportedby
                      );
                      self.date_reported = new Date(self.data.datereported);
                      self.reproducible =
                        self.data.reproducible === 1 ? true : false;
                      self.area = self.findArea(this.data.area);
                      self.assigned_to = self.findEmployee(
                        self.data.assignedto
                      );
                      self.comments = self.data.comments;
                      self.priority = self.data.priority;
                      self.status = self.data.status;
                      self.resolution = self.data.resolution;
                      self.resolution_version = self.data.resolutionversion;
                      self.resolved_by = self.findEmployee(
                        self.data.resolvedby
                      );
                      if (self.data.dateresolved)
                        self.date_resolved = new Date(self.data.dateresolved);
                      self.resolution_tested_by = self.findEmployee(
                        self.data.resolutiontestedby
                      );
                      if (self.data.resolutiontesteddate)
                        self.resolution_tested_date = new Date(
                          self.data.resolutiontesteddate
                        );
                      if (self.data.deferred) {
                        self.deferred = self.data.deferred === 1 ? true : false;
                      }
                      axios
                        .get(
                          self.$store.getters["routes/attachmentRoute"] +
                            self.data.id
                        )
                        .then(result => {
                          result.data.attachments.forEach(file => {
                            self.files.push(file.filename.substring(10));
                          });
                          self.editedFiles = result.data.attachments;
                        });
                    }
                  });
              });
          });
      });
    },
    submit() {
      var self = this;
      var resolveby =
        this.resolved_by !== undefined ? this.resolved_by.id : undefined;
      var resolutiontestedby =
        this.resolution_tested_by !== undefined
          ? this.resolution_tested_by.id
          : undefined;
      var assignedTo =
        this.assigned_to !== undefined ? this.assigned_to.id : undefined;
      var areaName = this.area !== undefined ? this.area.id : undefined;
      var data = {
        programid: this.program.id,
        reporttype: this.report_type,
        severity: this.severity,
        problemsummary: this.problem_summary,
        problemdescription: this.problem_description,
        suggestedfix: this.suggested_fix,
        reportedby: this.reported_by.id,
        datereported: this.date_reported,
        reproducible: this.reproducible,
        area: areaName,
        assignedto: assignedTo,
        comments: this.comments,
        priority: this.priority,
        status: this.status,
        resolution: this.resolution,
        resolutionversion: this.resolution_version,
        resolvedby: resolveby,
        dateresolved: this.date_resolved,
        resolutiontestedby: resolutiontestedby,
        resolutiontesteddate: this.resolution_tested_date,
        deferred: this.deferred
      };
      if (this.type === "Add") {
        axios
          .post(this.$store.getters["routes/bugRoute"], data)
          .then(result => {
            var bugID = result.data.bug.bugid;
            if (this.files.length !== 0) {
              axios({
                method: "post",
                url: this.$store.getters["routes/attachmentRoute"] + bugID,
                data: this.attachments,
                config: { headers: { "Content-Type": "multipart/form-data" } }
              }).then(result => {
                self.$snackbar.open({
                  message: "Successfully created a bug!",
                  duration: 5000
                });
                self.toDashBoard();
              });
            } else {
              self.$snackbar.open({
                message: "Successfully created a bug!",
                duration: 5000
              });
              self.toDashBoard();
            }
          })
          .catch(err => {
            Swal.fire({
              background: "#2d2d2d",
              title: `<span style="color:#FF0000">Oops.. OwO</span>`,
              html: `<span style="color:#FF0000">Something went wrong!</span>`,
              type: "error"
            });
          });
      } else {
        data["id"] = this.data.bugid;
        axios.put(this.$store.getters["routes/bugRoute"], data).then(result => {
          var bugID = result.data.bug.bugid;
          if (this.files.length > this.editedFiles.length) {
            axios({
              method: "post",
              url: this.$store.getters["routes/attachmentRoute"] + bugID,
              data: this.attachments,
              config: { headers: { "Content-Type": "multipart/form-data" } }
            }).then(result => {
              self.$snackbar.open({
                message: "Successfully edited a bug!",
                duration: 5000
              });
              self.toDashBoard();
            });
          } else {
            self.$snackbar.open({
              message: "Successfully edited a bug!",
              duration: 5000
            });
            self.toDashBoard();
          }
        });
      }
    },
    toDashBoard() {
      this.$store.dispatch("userInfo/setCurrentPage", 0);
      this.$router.push("/Main/Dashboard");
    }
  }
};
</script>

<style scoped>
hr {
  background: #2d2d2d;
}
.notification {
  border-radius: 10px;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #ffffff;
  color: #333333;
  padding: 10px 10px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #e5e4e6; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
