<template>
  <div class="section has-text-left">
    <div class="x">
      <img width="25%" src="../../assets/joinProgram.png">
    </div>
    <div class="columns">
      <div class="column">
        <div class="title">Employees</div>
        <drag
          v-for="(employees,i) in names"
          :key="i"
          :class="{ employees: true }"
          :transfer-data="{ item: employees}"
        >
          <div class="title box">{{ employees.firstname }} {{employees.lastname}}</div>
        </drag>
      </div>
      <div class="column">
        <div class="title">Programs</div>
        <div class="box" v-for="(program,i) in programs" :key="i">
          <drop class="drop" @drop="handleDrop(program, ...arguments)">
            <div class="title">{{program.name}} v:{{program.version}}</div>
            <div class="subtitle">
              <p
                v-for="(employee,index) in filteredItems(program.id)"
                :key="index"
              >{{employee.firstname}} {{employee.lastname}}</p>
            </div>
          </drop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      programs: [],
      names: [],
      programEmployee: []
    };
  },
  mounted() {
    this.getValues();
  },
  methods: {
    filteredItems(programId) {
      var EmployeeList = [];
      var EmployeesOfProgram = this.programEmployee.filter(program => {
        return program.programid === programId;
      });
      if (EmployeesOfProgram !== undefined && EmployeesOfProgram !== []) {
        for (var i = 0; i < EmployeesOfProgram.length; i++) {
          var result = this.names.find(employee => {
            return employee.id === EmployeesOfProgram[i].employeeid;
          });
          if (result !== undefined) EmployeeList.push(result);
        }
      }
      return EmployeeList;
    },
    getValues() {
      var self = this;
      axios.get(this.$store.getters["routes/getProgram"]).then(result => {
        self.programs = result.data.programs;
      });
      axios
        .get(this.$store.getters["routes/EmployeeProgramRoute"])
        .then(result => {
          self.programEmployee = result.data.programs;
        });
      axios.get(this.$store.getters["routes/getEmployees"]).then(result => {
        self.names = result.data.employees;
      });
    },
    handleDrop(toList, data) {
      var ProgramEmployeeList = this.filteredItems(toList.id);
      if (!ProgramEmployeeList.includes(data.item)) {
        var data = {
          employeeid: data.item.id,
          programid: toList.id
        };
        var self = this;
        axios
          .post(this.$store.getters["routes/EmployeeProgramRoute"], data)
          .then(result => {
            self.getValues();
            self.$forceUpdate();
          });
      } else {
        Swal.fire({
          background: "#2d2d2d",
          title: `<span style="color:#FF0000">Oops.. OwO</span>`,
          html: `<span style="color:#FF0000">You can't add the same person into the project</span>`,
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.box {
  margin: 10px 10px 10px 10px;
  background: #333333;
  color: #ffffff;
}
.x {
  margin-bottom: 3%;
}
.title {
  color: black;
}
.drop > .title,
.box,
.drop > .subtitle {
  color: white;
}
</style>
