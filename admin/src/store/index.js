import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import action from "./action"

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})
