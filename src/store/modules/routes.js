import { stat } from "fs";

const state = {
  APIAddress : "http://localhost:2017/",
  employee: "employee/",
  program: "program/",
  employeeprogram:"employeeprogram",
  area:"area/",
  bugs:"bug/",
  getBugs: "bug/all/",
  getArea: "area/all/",
  getProgram: "program/all/",
  getEmployees:"employee/all/",
  query:""
};
const getters={
  APIAddress:(state)=>{
    return state.APIAddress;
  },
  getEmployees:(state)=>{
    return state.APIAddress + state.getEmployees;
  },
  getProgram:(state)=>{
    return state.APIAddress + state.getProgram;
  },
  getArea:(state)=>{
    return state.APIAddress + state.getArea;
  },
  getBugs:(state)=>{
    return state.APIAddress + state.getBugs;
  },
  employeeRoute:(state)=>{
    return state.APIAddress + state.employee;
  },
  programRoute:(state)=>{
    return state.APIAddress + state.program;
  },
  areaRoute:(state)=>{
    return state.APIAddress + state.area;
  },
  bugRoute:(state)=>{
    return state.APIAddress + state.bugs;
  },
  EmployeeProgramRoute:(state)=>{
    return state.APIAddress + state.employeeprogram;
  }
};
const actions={};
const mutations={};

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};


