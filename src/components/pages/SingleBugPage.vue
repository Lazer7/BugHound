<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/report.png">
    <div class="container notification">
      <article class="media">
        <figure class="media-left">
          <div>
            <strong>Severity</strong>
          </div>
          <p class="image is-64x64">
            <img :src="getImage(data.severity)">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Program:</strong>
              {{program.name}} V:{{program.version}} R:{{program.release}}
            </p>
            <p></p>
            <p>
              <strong>Date Reported:</strong>
              {{getDate(new Date(data.datereported))}}
            </p>
            <p>
              <strong>Reported By:</strong>
              {{(getEmployee(data.reportedby))}}
            </p>
            <p>
              <strong>Severity:</strong>
              {{SeverityData[data.severity-1]}}
            </p>
            <p>
              <strong>Report Type:</strong>
              {{ReportData[data.reporttype-1]}}
            </p>
            <p>
              <strong>Reproducible:</strong>
              {{data.reproducible===1? "Yes" : "No"}}
            </p>
            <p>
              <strong>Problem Summary</strong>
              <br>
              {{data.problemsummary}}
            </p>
            <p>
              <strong>Problem Description</strong>
              {{data.problemdescription}}
            </p>
            <p>
              <strong>Suggested Fix</strong>
            </p>
            {{data.suggestedfix}}
          </div>
        </div>
      </article>
      <article class="media">
        <figure class="media-left">
          <div>
            <strong>Misc.</strong>
          </div>
          <p class="image is-64x64">
            <img src="../../assets/function.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p v-if="data.area">
              <strong>Functional Area:</strong>
              {{data.area}}
            </p>
            <p v-if="data.assignedto">
              <strong>Assigned To:</strong>
              {{(getEmployee(data.assignedto))}}
            </p>
            <p v-if="data.comments">
              <strong>Comments:</strong>
              {{data.comments}}
            </p>
            <p v-if="data.status">
              <strong>Status:</strong>
              {{StatusData[data.status-1]}}
            </p>
            <p v-if="data.priority">
              <strong>Priority:</strong>
              {{data.priority}}
            </p>
            <p v-if="data.resolution">
              <strong>Resolution:</strong>
              {{ResolutionData[data.resolution-1]}}
            </p>
            <p v-if="data.resolutionversion">
              <strong>Resolution Version:</strong>
              {{data.resolutionversion}}
            </p>
            <p v-if="data.resolvedby">
              <strong>Resolved By:</strong>
              {{getEmployee(data.resolvedby)}}
            </p>
            <p v-if="data.dateresolved">
              <strong>Resolved By Date:</strong>
              {{getDate(new Date(data.dateresolved))}}
            </p>
            <p v-if="data.resolutiontestedby">
              <strong>Tested By:</strong>
              {{getEmployee(data.resolutiontestedby)}}
            </p>
            <p v-if="data.resolutiontesteddate">
              <strong>Tested Date:</strong>
              {{getDate(new Date(data.resolutiontesteddate))}}
            </p>
            <p v-if="data.deferred">
              <strong>Treated as deferred:</strong>
              {{data.deferred?"Yes":"No"}}
            </p>
          </div>
          <strong v-if="attachments.length!==0">Attachments:</strong>
          <div class="columns" v-for="(list,index) in chunkFiles" :key="index">
            <div
              class="column is-3 has-text-centered"
              v-for="(file,index) in list"
              :key="index"
              @click="download(file)"
            >
              <img width="25%" :src="getFileType(file.filename)">
              <br>
              {{file.filename.substring(10)}}
            </div>
          </div>
        </div>
      </article>
      <div class="has-text-right">
        <a class="button" @click="toggleEdit()">
          <v-icon name="edit"/>
          <label>Edit</label>
        </a>
        <a class="button" @click="toggleDelete()">
          <v-icon name="trash"/>
          <label>Delete</label>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "BugBox",
  props: ["data", "employeeList", "programList"],
  data() {
    return {
      ReportData: [
        "Coding Error",
        "Design Issue",
        "Suggestion",
        "Documentation",
        "Hardware",
        "Query"
      ],
      SeverityData: ["Fatal", "Serious", "Minor"],
      StatusData: ["Open", "Close"],
      PriorityData: [1, 2, 3, 4, 5],
      ResolutionData: [
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
      ],
      ResolutionVersionData: ["1.0", "2.0", "3.0"],
      program: {},
      attachments: []
    };
  },
  mounted() {
    var self = this;
    this.program = this.filterProgram(this.data.programid);
    axios
      .get(this.$store.getters["routes/attachmentRoute"] + this.data.id)
      .then(result => {
        self.attachments = result.data.attachments;
      });
  },
  computed: {
    chunkFiles() {
      var chunkFiles = [];
      for (var i = 0, j = this.attachments.length; i < j; i += 4) {
        chunkFiles.push(this.attachments.slice(i, i + 4));
      }
      return chunkFiles;
    }
  },
  methods: {
    download(value) {
      axios({
        url: this.$store.getters["routes/download"] + value.filename.substring(10),
        method: "GET",
        responseType: "blob" // important
      }).then(result  => {
        const url = window.URL.createObjectURL(new Blob([result .data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", value.filename.substring(10));
        document.body.appendChild(link);
        link.click();
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
    filterProgram(id) {
      return this.programList.find(program => {
        return program.id === id;
      });
    },
    getImage(id) {
      if (id === 1) return require("../../assets/danger.png");
      else if (id === 2) return require("../../assets/warning.png");
      else return require("../../assets/minor.png");
    },
    getEmployee(id) {
      var employee = this.employeeList.find(employee => {
        return employee.id === id;
      });
      return employee !== undefined
        ? employee.firstname + " " + employee.lastname
        : "";
    },
    getDate(date) {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return (
        monthNames[date.getMonth()] +
        " " +
        date.getDate() +
        "," +
        date.getFullYear()
      );
    },
    toggleEdit() {
      this.$store.dispatch("userInfo/setCurrentPage", 3);
      this.$router.push({ name: "BugSubmission", params: { data: this.data } });
    },
    toggleDelete() {
      this.$dialog.confirm({
        title: "Deleting Bug",
        message:
          "Are you sure you want to <b>delete</b> this wonderful bug? This action cannot be undone.",
        confirmText: "Delete Bug",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          axios
            .delete(this.$store.getters["routes/bugRoute"] + this.data.bugid)
            .then(() => {
              this.$store.dispatch("userInfo/setCurrentPage", 0);
              this.$router.push("/Main/DashBoard");
            })
            .catch(err => {
              Swal.fire({
                background: "#2d2d2d",
                title: `<span style="color:#FF0000">Oops.. OwO</span>`,
                html:
                  `<span style="color:#FF0000">Cannot delete bug as it is currently in use!</span>` +
                  err.response.data.msg,
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>
