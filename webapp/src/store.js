import Vue from "vue"
import Vuex from "vuex"
import {
  persistColorModeIndex,
  retrieveColorModeIndex,
  hasColorModeIndex,
  persistAllowOpeningAnimation,
  retrieveAllowOpeningAnimation
} from "~/utils/persistence.js"

import { logMessage } from '@/utils/logger.js'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    app: {
      isInitDone: false
    },
    allow: {
      motion: false,
    },
    openingScreen: {
      allowAnimate: retrieveAllowOpeningAnimation(true),
      doAnimate: false,
      doReveal: false,
      isAnimateDone: false,
      isRevealDone: false,
    },
    signatureSVG: {
      doAnimate: false,
      isAnimateDone: false,
    },
    colorScheme: {
      modes: ['light','dark'],
      defaultIndex: 0,
      hasUserPreference: hasColorModeIndex(),
      selectedIndex: retrieveColorModeIndex(0),
    }
  },
  getters: {
    mApp: state => state.app,
    mAllow: state => state.allow,
    mOpeningScreen: state => state.openingScreen,
    mSignatureSVG: state => state.signatureSVG,
    mColorScheme: state => state.colorScheme
  },
  mutations: {
    // can be used directly for synchronous events

    SET_APP_ISINITDONE: (state, setting) => {
      logMessage("store - SET_APP_ISINITDONE = " + setting)
      state.app.isInitDone = setting
    },
    SET_ALLOW_MOTION: (state, setting) => {
      logMessage("store - SET_ALLOW_MOTION = " + setting)
      state.allow.motion = setting
    },
    SET_OPENINGSCREEN_ALLOWANIMATE: (state, setting) => {
      logMessage("store/persist - SET_OPENINGSCREEN_ALLOWANIMATE = " + setting)
      state.openingScreen.allowAnimate = setting;
      persistAllowOpeningAnimation(false)
    },
    SET_OPENINGSCREEN_DOANIMATE: (state, setting) => {
      logMessage("store - SET_OPENINGSCREEN_DOANIMATE = " + setting)
      state.openingScreen.doAnimate = setting;
    },
    SET_OPENINGSCREEN_ISANIMATEDONE: (state, setting) => {
      logMessage("store - SET_OPENINGSCREEN_ISANIMATEDONE = " + setting)
      state.openingScreen.isAnimateDone = setting;
    },
    SET_OPENINGSCREEN_DOREVEAL: (state, setting) => {
      logMessage("store - SET_OPENINGSCREEN_DOREVEAL = " + setting)
      state.openingScreen.doReveal = setting;
    },
    SET_OPENINGSCREEN_ISREVEALDONE: (state, setting) => {
      logMessage("store - SET_OPENINGSCREEN_ISREVEALDONE = " + setting)
      state.openingScreen.isRevealDone = setting;
    },
    SET_SIGNATURESVG_DOANIMATE: (state, setting) => {
      logMessage("store - SET_SIGNATURESVG_DOANIMATE = " + setting)
      state.signatureSVG.doAnimate = setting;
    },
    SET_SIGNATURESVG_ISANIMATEDONE: (state, setting) => {
      logMessage("store - SET_SIGNATURESVG_ISANIMATEDONE = " + setting)
      state.signatureSVG.isAnimateDone = setting;
    },
    SET_COLORSCHEME_INDEX: (state, setting) => {
      logMessage("store/persist - SET_COLORSCHEME_INDEX = " + setting)
      state.colorScheme.selectedIndex = setting
      persistColorModeIndex(setting)
    }
  },
  actions: {
    // for async functionality - commit a mutation
    // e.g. setTimeTick: (context, tick) => context.commit("SET_TIME_TICK", tick)
  },
  plugins: [
  ]
});
