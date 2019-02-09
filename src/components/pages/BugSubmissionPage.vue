<template>
  <div class="section has-text-left">
    <img width="25%" src="../../assets/report.png"/>
      <div class="container">
        <div class="notification">
          <div class="columns">
            <div class="column is-3">
              <b-field label="Program">
                <b-select placeholder="Select Program" v-model="program">
                  <option
                    v-for="level in ProgramData"
                    :value="level"
                    :key="level">
                      {{ level }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Report Type">
                <b-select placeholder="Select Report Type" v-model="report_type">
                  <option
                    v-for="data in ReportData"
                    :value="data.value"
                    :key="data.key">
                      {{ data.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Severity">
                <b-select placeholder="Select Severity" v-model="severity">
                  <option
                    v-for="data in SeverityData"
                    :value="data.value"
                    :key="data.key">
                      {{ data.value }}
                  </option>
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
                <b-checkbox v-model="reproducible">
                    {{ reproducible?"Yes":"No" }}
                </b-checkbox>
              </b-field>  
            </div>
          </div>
          <b-field label="Problem">
            <b-input v-model="problem_description" placeholder="Describe the problem" maxlength="2000" type="textarea"></b-input>
          </b-field>
          <b-field label="Suggested Fix">
            <b-input v-model="suggested_fix" placeholder="Describe the solution" maxlength="2000" type="textarea"></b-input>
          </b-field>
          <div class="columns">
            <div class="column is-3">
              <b-field label="Reported By">
                <b-select placeholder="Reported By" v-model="reported_by">
                  <option
                    v-for="data in EmployeeList"
                    :value="data.id"
                    :key="data.name">
                      {{ data.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Date">
                <b-datepicker
                    placeholder="Type or select a date..."
                    v-model="date_reported"
                    icon="calendar"
                    editable>
                </b-datepicker>
              </b-field>
            </div>
          </div>

          <hr/>
          <div class="title">
            Optional Fields
          </div>
          <div class="columns">
            <div class="column is-3">
              <b-field label="Functional Area">
                <b-select placeholder="Functional Area" v-model="area">
                  <option
                    v-for="data in AreaData"
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Assigned To">
                <b-select placeholder="Assigned To" v-model="assigned_to">
                  <option
                    v-for="data in EmployeeList"
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
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
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Priority">
                <b-select placeholder="Priority" v-model="priority">
                  <option
                    v-for="data in PriorityData"
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Resolution">
                <b-select placeholder="Resolution" v-model="resolution">
                  <option
                    v-for="data in ResolutionData"
                    :value="data.value"
                    :key="data.key">
                      {{ data.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Resolution Version">
                <b-select placeholder="Resolution Version" v-model="resolution_version">
                  <option
                    v-for="data in ResolutionVersionData"
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>


          <div class="columns">
            <div class="column is-3">
              <b-field label="Resolved By">
                <b-select placeholder="Resolved By" v-model="status">
                  <option
                    v-for="data in EmployeeList"
                    :value="data"
                    :key="data">
                      {{ data }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Resolution Date">
                <b-datepicker
                    placeholder="Type or select a date..."
                    v-model="date_resolved"
                    icon="calendar"
                    editable>
                </b-datepicker>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Tested By">
                <b-select placeholder="Tested By" v-model="resolution">
                  <option
                    v-for="data in EmployeeList"
                    :value="data.value"
                    :key="data.key">
                      {{ data.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field label="Date Tested">
                <b-datepicker
                    placeholder="Type or select a date..."
                    v-model="resolution_tested_date"
                    icon="calendar"
                    editable>
                </b-datepicker>
              </b-field>
            </div>
          </div>
          <hr/>
          <button class="button" :disabled="validate">Submit</button>
          <button class="button" @click="toDashBoard">Cancel</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'BugReport',
    data(){
        return{
            ProgramData:[],
            ReportData:[
                {key:1,value:"Coding Error"},
                {key:2,value:"Design Issue"},
                {key:3,value:"Suggestion"},
                {key:4,value:"Documentation"},
                {key:5,value:"Hardware"},
                {key:6,value:"Query"}
                ],
            SeverityData:[
                {key:1,value:"Fatal"},
                {key:2,value:"Serious"},
                {key:3,value:"Minor"},
            ],
            EmployeeList:[],
            AreaData:[],
            StatusData:["Open","Close"],
            PriorityData:[1,2,3,4,5],
            ResolutionData:[
              {key:1,value:"Pending"},
              {key:2,value:"Fixed"},
              {key:3,value:"Irreproducible"},
              {key:4,value:"Deferred"},
              {key:5,value:"At designed"},
              {key:6,value:"Can't be fixed"},
              {key:7,value:"Withdrwawn by reporter"},
              {key:8,value:"Needs more information"},
              {key:9,value:"Disagree with suggestion"},
              {key:10,value:"Duplicate"}
            ],
            ResolutionVersionData:['1.0','2.0','3.0'],
            program:undefined,
            report_type:undefined,
            severity:undefined,
            problem_summary:"",
            problem_description:"",
            suggested_fix:"",
            reported_by:undefined,
            date_reported:undefined,
            reproducible:false,
            area:undefined,
            assigned_to:undefined,
            comments:"",
            priority:undefined,
            status:undefined,
            resolution:undefined,
            resolution_version:undefined,
            resolved_by:undefined,
            date_resolved:undefined,
            resolution_tested_by:undefined,
            resolution_tested_date:undefined,
            deffered:undefined
        }
    },
    computed:{
      validate(){
        if(this.program===undefined) return true;
        if(this.report_type===undefined) return true;
        if(this.severity===undefined) return true;
        if(this.problem_summary==="") return true;
        if(this.problem_description==="") return true;
        if(this.suggested_fix==="") return true;
        if(this.reported_by===undefined) return true;
        if(this.date_reported===undefined) return true;
        if(this.reproducible===undefined) return true;
      }
    },
    methods:{
      toDashBoard(){
        this.$store.dispatch('userInfo/setCurrentPage',0);
        this.$router.push('/Main/Dashboard');
      }
    }
}
</script>

<style scoped>
hr{
  background: #2d2d2d;
}
</style>
