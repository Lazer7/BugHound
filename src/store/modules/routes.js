const state = {
  APIAddress : "http://localhost:2017/",
  authen: "employee",
  getEmployee:"employees",
  query:""
};
const getters={
  APIAddress:(state)=>{
    return state.APIAddress;
  },
  getEmployees:(state)=>{
    return state.APIAddress + state.getEmployee;
  },
  addEmployee:(state)=>{
    return state.APIAddress + state.authen;
  },
  editEmployee:(state)=>{
    return state.APIAddress + state.authen;
  },
  deleteEmployee:(state)=>{
    return state.APIAddress + state.authen + state.query;
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


