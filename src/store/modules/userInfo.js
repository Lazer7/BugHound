import { stat } from "fs";

const state = {
  User : {},
  CurrentPage: ['is-active']
};
const getters={
  User:(state)=>{
    return state.User;
  },
  LoggedIn:(state)=>{
    return Object.entries(state.User).length === 0? false:true;
  },
  CurrentPage:(state)=>{
    return state.CurrentPage;
  }
};
const actions={
  setUser:({state,commit},value)=>{
    commit('setUser',value);
  },
  resetUser:({state,commit})=>{
    commit('setUser',{});
  },
  setCurrentPage:({state,commit},value)=>{
    commit('setCurrentPage',value);
  }
};
const mutations={
  setUser:(state,payload)=>{
    state.User = payload;
  },
  setCurrentPage:(state,payload)=>{
    state.CurrentPage = [];
    state.CurrentPage[payload]='is-active';
  }
};
  
export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};
  
  
  