import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import createPersistedState from 'vuex-persistedstate';

const modules = {};
const options = {
  isEnabled: true,
  logLevels: ['debug', 'info', 'warn', 'error', 'fatal'],
  logLevel: process.env.LOG_LEVEL,
  stringifyArguments: false,
  showLogLevel: true,
  // showMethodName: true,
  // separator: '|',
  showConsoleColors: true,
};
Vue.use(VueLogger, options);
Vue.use(Vuex);

// return computed state
const getters = {
  isNewUser: (state) => {
    Vue.$log.info(`reading store(isNewUser): ${state.isNewUser}`);
    return state.isNewUser;
  },
};

// change state - synchronous
const mutations = {

  setIsNewUser: (state, value) => {
    Vue.$log.info(`writing store(isNewUser) = ${value}`);
    // eslint-disable-next-line no-param-reassign
    state.isNewUser = value;
  },
};

// db actions - asynchronous - set it locally and remotely
const actions = {
  setIsNewUser: async (context, value) => {
    context.commit('setIsNewUser', value);
  },
};

// const DEV_IP = '192.168.10.20';
// const DEV_IP = '192.168.43.80';
// const DEV_IP = 'localhost';
// const DEV_IP = '192.168.43.107';
// return default state
Vue.$log.info('env object', process.env);
const state = {
  isNewUser: false,
  messages: [

  ],
};

Vue.$log.info(state.NODE_ENV, process.env.VUE_APP_VERSION);

export default new Vuex.Store({
  modules,
  mutations,
  actions,
  getters,
  state,
  plugins: [createPersistedState({
    paths: [
      'specialInviteJobs',
    ],
  })],
});
