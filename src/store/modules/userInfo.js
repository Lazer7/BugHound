const state = {
  User : {}
};
const getters={
  User:(state)=>{
    return state.User;
  },
  LoggedIn:(state)=>{
    return Object.entries(state.User).length === 0? false:true;
  }
};
const actions={
  setUser:({state,commit},value)=>{
    commit('setUser',value);
  },
  resetUser:({state,commit})=>{
    commit('setUser',{});
  },
};
const mutations={
  setUser:(state,payload)=>{
    state.User = payload;
  }
};
  
export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};
  
  
  