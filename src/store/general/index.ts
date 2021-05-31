import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { GeneralState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const generalModule: Module<GeneralState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default generalModule;
