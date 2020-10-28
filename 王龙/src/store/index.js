import Vue from "vue";
import Vuex from "vuex";
import fromInfo from "./modules/fromInfo";
import onceInfo from "./modules/onceInfo"

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  modules: {
    fromInfo,
    onceInfo,
  },
});
