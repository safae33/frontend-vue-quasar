import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { GeneralState } from './state';

const actions: ActionTree<GeneralState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
