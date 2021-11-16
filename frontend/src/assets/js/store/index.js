import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import createPersistedState from 'vuex-persistedstate';
import CountriesModule from './countries';

const modules = {
  countries: CountriesModule,
};

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
  flavor: state => state.flavor,
  isNewUser: (state) => {
    Vue.$log.info(`reading store(isNewUser): ${state.isNewUser}`);
    return state.isNewUser;
  },
  getEnv: (state) => {
    Vue.$log.info(`reading store(getEnv): ${state.NODE_ENV}`);
    return state.NODE_ENV;
  },
  locale: (state) => {
    Vue.$log.info(`reading store(locale): ${state.locale}`);
    return state.locale;
  },
  hasOnboard: (state) => {
    Vue.$log.info(`reading store(hasOnboard): ${state.hasOnboard}`);
    return state.hasOnboard;
  },
  isAdminUser: (state) => {
    Vue.$log.info(`reading store(isAdminUser): ${state.isAdminUser}`);
    return state.isAdminUser;
  },
  isOnboardSession: (state) => {
    Vue.$log.info(`reading store(isOnboardSession): ${state.isOnboardSession}`);
    return state.isOnboardSession;
  },
  myId: (state) => {
    Vue.$log.info(`reading store(myId): ${state.myId}`);
    return state.myId;
  },
  token: (state) => {
    Vue.$log.info(`reading store(token): ${state.token}`);
    return state.token;
  },
  isLoggedIn: state => !!state.token,
  isAuthenticated: state => !!state.myId,
  fcm: (state) => {
    Vue.$log.info(`reading store(fcm): ${state.fcm}`);
    return state.fcm;
  },
  specialInviteJobs: (state) => {
    Vue.$log.info(`reading store(specialInviteJobs): ${state.specialInviteJobs}`);
    return state.specialInviteJobs;
  },
  getNotification: (state) => {
    Vue.$log.info(`reading store(notification): ${state.notification}`);
    return state.notification;
  },
  currentOrganisationId: (state) => {
    Vue.$log.info(`reading store(currentOrganisationId): ${state.currentOrganisationId}`);
    return state.currentOrganisationId;
  },
  currentOrganisation: (state) => {
    Vue.$log.info('reading store(currentOrganisation)');
    return state.organisations
    && state.organisations.find(o => o.id === state.currentOrganisationId);
  },
  givenPermissions: (state) => {
    const { userLevel, employerLevels } = state;
    return Array.from(employerLevels)
      .filter(e => e.userLevel <= userLevel)
      .flatMap(e => e.features.map(f => f.permissions))
      .flat();
  },
  givenPermissionDescriptions: (state) => {
    const { userLevel, employerLevels } = state;
    return Array.from(employerLevels)
      .filter(e => e.userLevel <= userLevel && e.description)
      .map(e => e.description && e.description.split(',').map(d => d.trim()))
      .flat();
  },
  unlockedFeatures: (state) => {
    const { userLevel, employerLevels } = state;
    return Array.from(employerLevels)
      .filter(e => e.userLevel <= userLevel)
      .map(e => e.features)
      .flat();
  },
  localCurrency: (_, { currentOrganisation }) => {
    const region = currentOrganisation && currentOrganisation.region;
    if (region === 'mm') return 'MMK';
    if (region === 'vn') return 'VND';
    if (region === 'hk') return 'HKD';
    return 'USD';
  },
  queryVariables: (state) => {
    Vue.$log.info(`reading store(queryVariables): ${state.queryVariables}`);
    return state.queryVariables;
  },
};

// change state - synchronous
const mutations = {
  change(state, flavor) {
    // eslint-disable-next-line no-param-reassign
    state.flavor = flavor;
  },

  setIsNewUser: (state, value) => {
    Vue.$log.info(`writing store(isNewUser) = ${value}`);
    // eslint-disable-next-line no-param-reassign
    state.isNewUser = value;
  },
  // for operation user
  setIsAdminUser: (state, value) => {
    Vue.$log.info(`writing store(isAdminUser) = ${value}`);
    // eslint-disable-next-line no-param-reassign
    state.isAdminUser = value;
  },
  setLocale: (state, locale) => {
    Vue.$log.info(`writing store(locale) = ${locale}`);
    // eslint-disable-next-line no-param-reassign
    state.locale = locale;
  },
  setHasOnboard: (state, hasOnboard) => {
    Vue.$log.info(`writing store(hasOnboard) = ${hasOnboard}`);
    // eslint-disable-next-line no-param-reassign
    state.hasOnboard = hasOnboard;
  },
  setIsOnboardSession: (state, isOnboardSession) => {
    Vue.$log.info(`writing store(isOnboardSession) = ${isOnboardSession}`);
    // eslint-disable-next-line no-param-reassign
    state.isOnboardSession = isOnboardSession;
  },
  setMyId: (state, id) => {
    Vue.$log.info(`writing store(myId) = ${id}`);
    // eslint-disable-next-line no-param-reassign
    state.myId = id;
  },
  setToken: (state, token) => {
    Vue.$log.info(`writing store(token) = ${token}`);
    // eslint-disable-next-line no-param-reassign
    state.token = token;
  },
  setFCM: (state, fcm) => {
    Vue.$log.info(`writing store(fcm) = ${fcm}`);
    // eslint-disable-next-line no-param-reassign
    state.fcm = fcm;
  },
  setSpecialInviteJobs: (state, specialInviteJobs) => {
    Vue.$log.info(`writing store(specialInviteJobs) = ${specialInviteJobs}`);
    // eslint-disable-next-line no-param-reassign
    state.specialInviteJobs = specialInviteJobs;
  },
  setNotifications: (state, notifications) => {
    Vue.$log.info(`writing store(notifications) = ${notifications}`);
    state.notifications = [...notifications];
  },
  setCurrentOrganisationId: (state, organisationId) => {
    Vue.$log.info(`writing store(organisationId) = ${organisationId}`);
    state.currentOrganisationId = organisationId;
  },
  setOrganisations: (state, organisations) => {
    state.organisations = organisations;
  },
  setEmployer: (state, employer) => {
    state.employer = employer;
  },
  setUserLevel: (state, userLevel) => {
    state.userLevel = userLevel;
  },
  setEmployerLevels: (state, employerLevels) => {
    state.employerLevels = employerLevels;
  },
  setCommonData: (state, commonData) => {
    state.commonData = Object.assign(state.commonData, commonData);
  },
  setQueryVariables: (state, queryVariables) => {
    state.queryVariables = queryVariables;
  },
};

// db actions - asynchronous - set it locally and remotely
const actions = {
  setIsNewUser: async (context, value) => {
    context.commit('setIsNewUser', value);
  },
  // for operation app
  setIsAdminUser: async (context, value) => {
    context.commit('setIsAdminUser', value);
  },
  setLocale: async (context, locale) => {
    context.commit('setLocale', locale);
  },
  setHasOnboard: async (context, hasOnboard) => {
    context.commit('setHasOnboard', hasOnboard);
  },
  setIsOnboardSession: async (context, isOnboardSession) => {
    context.commit('setIsOnboardSession', isOnboardSession);
  },
  setMyId: async (context, id) => {
    context.commit('setMyId', id);
  },
  setToken: async (context, token) => {
    context.commit('setToken', token);
  },
  setFCM: async (context, fcm) => {
    context.commit('setFCM', fcm);
  },
  addSpecialInviteJob: async (context, specialInviteJob) => {
    const { specialInviteJobs } = context.state;

    specialInviteJobs.push(specialInviteJob);
    context.commit('setSpecialInviteJobs', specialInviteJobs);
  },
  removeSpecialInviteJob: async (context, phoneNo) => {
    const { specialInviteJobs } = context.state;
    const update = specialInviteJobs.filter(x => x.phone !== phoneNo);
    context.commit('setSpecialInviteJobs', update);
  },
  refreshNotifications: async (context) => {
    const notifications = await Vue.prototype.$IdbService
      .getNotificationsFromDb()
      .then(n => n.sort((a, b) => b.receiveDate - a.receiveDate));
    return context.commit('setNotifications', notifications);
  },
  setCurrentOrganisationId: async (context, organisationId) => {
    context.commit('setCurrentOrganisationId', organisationId);
  },
  setOrganisations: async (context, organisations) => {
    context.commit('setOrganisations', organisations);
  },
  setEmployer: async (context, employer) => {
    context.commit('setEmployer', employer);
  },
  setUserLevel: async (context, userLevel) => {
    context.commit('setUserLevel', userLevel);
  },
  setEmployerLevels: async (context, employerLevels) => {
    context.commit('setEmployerLevels', employerLevels);
  },
  setSurveyTriggers: async (context, surveyTriggers) => {
    const { employer } = context.state;
    const ret = await Vue.prototype.$UserService.updateEmployer({
      id: employer.id,
      surveyTriggers,
    });
    if (ret) context.commit('setEmployer', { ...employer, surveyTriggers });
  },
  setCommonData: async (context, commonData) => {
    context.commit('setCommonData', commonData);
  },
  addQueryVariable: async (context, variable) => {
    let { queryVariables } = context.state;
    if (!queryVariables.some(e => e.name === variable.name)) {
      queryVariables.push(variable);
    } else {
      queryVariables = queryVariables.filter(e => e.name !== variable.name);
      queryVariables.push(variable);
    }
    context.commit('setQueryVariables', queryVariables);
  },
};

// const DEV_IP = '192.168.10.20';
// const DEV_IP = '192.168.43.80';
// const DEV_IP = 'localhost';
// const DEV_IP = '192.168.43.107';
// return default state
Vue.$log.info('env object', process.env);
const state = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  // DEVELOPMENT_API_URL: 'http://9beb13f8.ngrok.io/v1',
  // STAGING_API_URL: 'https://staging-api.jobdoh.com/v1',
  // PRODUCTION_API_URL: 'https://api.jobdoh.com/v1',
  flavor: 'none',
  isNewUser: false,
  locale: 'en',
  myId: null,
  isAdminUser: false,
  token: 'null',
  hasOnboard: false,
  isOnboardSession: true,
  fcm: null,
  specialInviteJobs: [],
  notifications: [],
  currentOrganisationId: null,
  organisations: [],
  employer: null,
  userLevel: 1,
  employerLevels: [],
  commonData: {
    jobCategories: null,
  },
  queryVariables: [],
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
      'isAdminUser',
      'notifications',
      'currentOrganisationId',
      'userLevel',
      'employerLevels',
      'organisations',
      'token',
      'myId',
      'commonData',
    ],
  })],
});
