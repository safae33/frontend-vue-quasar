import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';
import { MutationTree } from 'vuex';
import { GeneralState } from './state';

const mutation: MutationTree<GeneralState> = {
  pushAccountItem(state, account) {
    state.accounts.push(account);
  },
  toggleAccountItemLike(state, id: number) {
    state.accounts[id].like = !state.accounts[id].like;
  },
  toggleAccountItemRetweet(state, id: number) {
    state.accounts[id].retweet = !state.accounts[id].retweet;
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
};

export default mutation;
