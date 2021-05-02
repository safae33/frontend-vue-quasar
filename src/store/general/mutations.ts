import Account from 'src/models/Account.model';
import Tweet from 'src/models/Tweet.model';
import TweetGroup from 'src/models/TweetGroup.model';
import { MutationTree } from 'vuex';
import { GeneralState } from './state';

interface ISetTweetGroupTweetsPayload {
  index: number;
  tweets: Tweet[];
}
interface ISliceTweetPayload {
  tweetGroupIndex_: number;
  tweetIndex_: number;
}

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
      clonedAccounts.push(Object.assign(new Account(), val))
    );
    state.tweets[tweetGroup.index].accounts = clonedAccounts;
  },

  setTweets(state, tweets: TweetGroup[]) {
    state.tweets = tweets;
  },

  setSelectedTweetGroupId(state, id) {
    state.selectedTweetGroupId = id;
  },
  setIsSelectedTweetGroup(state, val: boolean) {
    state.isSelectedTweetGroup = val;
  },
  /**index değeri verilen TweetGroup'a verilen tweet[] ataması yapılır*/
  setTweetGroupTweets(state, payload: ISetTweetGroupTweetsPayload) {
    state.tweets[payload.index].tweets = payload.tweets;
  },
  spliceTweet(state, payload: ISliceTweetPayload) {
    let target = 0;
    state.tweets[payload.tweetGroupIndex_].tweets.forEach((tweet) => {
      if (tweet.index == payload.tweetIndex_) target = tweet.index;
    });
    state.splicedTweet = state.tweets[payload.tweetGroupIndex_].tweets.splice(
      target,
      1
    )[0];
  },

  /** index değeri verilen tweetGroup tweets içinden silinir.
   * @ elemanlar taşınırken boş kalan tweetgroup'u silmek için kullanılıyor.
   * @ arrayden eleman eksiltmek için çok iyi yöntem. kısa ve anlaşılır. */
  deleteTweetGroupByIndex(state, index) {
    // state.tweets.splice()
    state.tweets = state.tweets.filter((tweet) => tweet.index != index);
  },
};

export default mutation;
