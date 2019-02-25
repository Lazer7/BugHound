import { stat } from "fs";

const state = {
  root: "http://localhost:2017/",
  APIAddress : "http://localhost:2017/api/",
  employee: "employee/",
  program: "program/",
  employeeprogram:"employeeprogram",
  area:"area/",
  bugs:"bug/",
  getBugs: "bug/all/",
  getArea: "area/all/",
  getProgram: "program/all/",
  getEmployees:"employee/all/",
  query:"",
  register: "authenticate/register/",
  login: "authenticate/login/",
  attachments:"attachment/"
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
  attachmentRoute:(state)=>{
    return state.APIAddress + state.attachments;
  },
  EmployeeProgramRoute:(state)=>{
    return state.APIAddress + state.employeeprogram;
  },
  register:(state) => {
    return state.root + state.register;
  },
  login:(state) => {
    return state.root + state.login;
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


