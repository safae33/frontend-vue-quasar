import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';
import { MutationTree } from 'vuex';
import { GeneralState } from './state';

const mutation: MutationTree<GeneralState> = {
  pushAccountItem(state, account) {
    state.accounts.push(account);
  },
  toggleAccountLike(state, id: number) {
    state.tweets[state.selectedTweetGroupId].accounts[id].like = !state.tweets[
      state.selectedTweetGroupId
    ].accounts[id].like;
  },
  toggleAccountRetweet(state, id: number) {
    state.tweets[state.selectedTweetGroupId].accounts[id].retweet = !state
      .tweets[state.selectedTweetGroupId].accounts[id].retweet;
  },

  pushTweetGroup(state, tweetGroup: TweetGroup) {
    state.tweets.push(tweetGroup);
    const clonedAccounts: Account[] = [];
    state.accounts.forEach((val) =>
      clonedAccounts.push(Object.assign({}, val))
    );
    state.tweets[tweetGroup.index].accounts = clonedAccounts;
  },
  setTweets(state, tweets: TweetGroup[]) {
    state.tweets = tweets;
  },
  setSelectedTweetGroupId(state, id) {
    state.isSelectedTweetGroup = true;
    state.selectedTweetGroupId = id;
  },
  setTweetGroupTweets(state, payload) {
    state.tweets[payload.index].tweets = payload.val;
  },
};

export default mutation;
