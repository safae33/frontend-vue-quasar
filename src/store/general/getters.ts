import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { GeneralState } from './state';

const getters: GetterTree<GeneralState, StateInterface> = {
  getAccount: (state) => (id: number) => {
    return state.tweets[state.selectedTweetGroupId].accounts[id];
  },
};

export default getters;
