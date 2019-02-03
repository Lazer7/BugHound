const state = {
  APIAddress : "http://localhost:8081/"
};
const getters={
  APIAddress:(state)=>{
    return state.APIAddress;
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


