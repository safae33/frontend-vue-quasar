import TweetGroup from 'src/models/TweetGroup.model';
import { MutationTree } from 'vuex';
import { GeneralState } from './state';

const mutation: MutationTree<GeneralState> = {
  setSelectedTweetGroupId(state, id) {
    state.selectedTweetGroupId = id;
  },
  setTweetGroupTweets(state, payload) {
    state.tweetGroups.filter(
      (tweetGroup) => tweetGroup.id == payload.id
    )[0].tweets = payload.tweets;
  },

  deleteTweetGroupById(state, id) {
    let target = 0;
    state.tweetGroups.forEach((tweetGroup, index) => {
      if (tweetGroup.id == id) target = index;
    });
    state.tweetGroups.splice(target, 1);
  },

  createNewTweetGroup(state, tweetIndex?: number) {
    state.tweetGroups.push(
      new TweetGroup(state.tweetGroupIdSequence++, tweetIndex)
    );
  },

  removeTweetIndexFromTweetGroup(state, payload) {
    const tg = state.tweetGroups.filter(
      (tg) => tg.id == payload.tweetGroupId
    )[0];
    tg.tweets.splice(tg.tweets.indexOf(payload.tweetIndex), 1);
  },

  //   pushAccountItem(state, account) {
  //     state.accounts.push(account);
  //   },
  //   toggleAccountLike(state, id: number) {
  //     state.tweets[state.selectedTweetGroupId].accounts[id].like = !state.tweets[
  //       state.selectedTweetGroupId
  //     ].accounts[id].like;
  //   },
  //   toggleAccountRetweet(state, id: number) {
  //     state.tweets[state.selectedTweetGroupId].accounts[id].retweet = !state
  //       .tweets[state.selectedTweetGroupId].accounts[id].retweet;
  //   },

  //   pushTweetGroup(state, tweetGroup: TweetGroup) {
  //     state.tweets.push(tweetGroup);
  //     const clonedAccounts: Account[] = [];
  //     state.accounts.forEach((val) =>
  //       clonedAccounts.push(Object.assign(new Account(), val))
  //     );
  //     state.tweets[tweetGroup.index].accounts = clonedAccounts;
  //   },

  //   setTweets(state, tweets: TweetGroup[]) {
  //     state.tweets = tweets;
  //   },

  //   setSelectedTweetGroupId(state, id) {
  //     state.selectedTweetGroupId = id;
  //   },
  //   setIsSelectedTweetGroup(state, val: boolean) {
  //     state.isSelectedTweetGroup = val;
  //   },
  //   /**index değeri verilen TweetGroup'a verilen tweet[] ataması yapılır*/
  //   setTweetGroupTweets(state, payload: ISetTweetGroupTweetsPayload) {
  //     state.tweets[payload.index].tweets = payload.tweets;
  //   },
  //   spliceTweet(state, payload: ISliceTweetPayload) {
  //     let target = 0;
  //     state.tweets[payload.tweetGroupIndex_].tweets.forEach((tweet) => {
  //       if (tweet.index == payload.tweetIndex_) target = tweet.index;
  //     });
  //     state.splicedTweet = state.tweets[payload.tweetGroupIndex_].tweets.splice(
  //       target,
  //       1
  //     )[0];
  //   },

  //   /** index değeri verilen tweetGroup tweets içinden silinir.
  //    * @ elemanlar taşınırken boş kalan tweetgroup'u silmek için kullanılıyor.
  //    * @ arrayden eleman eksiltmek için çok iyi yöntem. kısa ve anlaşılır. */
  //   deleteTweetGroupByIndex(state, index) {
  //     // state.tweets.splice()
  //     state.tweets = state.tweets.filter((tweet) => tweet.index != index);
  //   },
  toggleActionLike(state, id) {
    state.accounts
      .filter((account) => account.id == id)[0]
      .actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0].like = !state.accounts
      .filter((account) => account.id == id)[0]
      .actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0].like;
  },
  toggleActionRetweet(state, id) {
    state.accounts
      .filter((account) => account.id == id)[0]
      .actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0].retweet = !state.accounts
      .filter((account) => account.id == id)[0]
      .actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0].retweet;
  },
  pushAccount(state, account) {
    state.accounts.push(account);
  },
  pushTweet(state, tweet) {
    state.tweets.push(tweet);
  },
  pushTweetGroup(state, tweetGroup) {
    state.tweetGroups.push(tweetGroup);
  },
};

export default mutation;
