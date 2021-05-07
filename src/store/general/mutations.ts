import Action from 'src/models/Action.model';
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
  removeActionForDeletedTweetGroup(state, tgId) {
    state.accounts.forEach((account) => {
      account.actions.splice(
        account.actions.findIndex((action) => action.tweetGroupId == tgId),
        1
      );
    });
  },

  createNewTweetGroup(state, tweetIndex?: number) {
    if (tweetIndex != undefined)
      state.tweetGroups.push(
        new TweetGroup(state.tweetGroupIdSequence++, tweetIndex)
      );
    else
      state.tweetGroups.push(
        new TweetGroup(state.tweetGroupIdSequence++, state.tweets.length - 1)
      );
  },

  addActionForRecentAddedTweetGroup(state) {
    state.accounts.forEach((account) => {
      account.actions.push(new Action(state.tweetGroupIdSequence - 1));
    });
  },

  removeTweetIndexFromTweetGroup(state, payload) {
    const tg = state.tweetGroups.filter(
      (tg) => tg.id == payload.tweetGroupId
    )[0];

    tg.tweets.splice(tg.tweets.indexOf(payload.tweetIndex), 1);
  },
  //utilrow //////////////////////
  resetAllActions(state) {
    state.accounts.forEach((account) => {
      const action = account.actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0];
      action.like = false;
      action.retweet = false;
    });
  },

  likeAllActions(state) {
    state.accounts.forEach((account) => {
      const action = account.actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0];
      action.like = true;
    });
  },
  retweetAllActions(state) {
    state.accounts.forEach((account) => {
      const action = account.actions.filter(
        (action) => action.tweetGroupId == state.selectedTweetGroupId
      )[0];
      action.retweet = true;
    });
  },

  //allAccounts
  setSelectedAccountId(state, id: number) {
    state.selectedAccountId = id;
  },
  delSelectedAccounts(state) {
    state.accounts = state.accounts.filter(
      (account) => !state.delSelectedAccountIdArr.includes(account.id)
    );
  },
  setDelSelectedAccountIdArr(state, val: number[]) {
    state.delSelectedAccountIdArr = val;
  },
  setDelSelectMode(state, value: boolean) {
    state.delSelectMode = value;
  },
  toggleDelSelectMode(state) {
    state.delSelectMode = !state.delSelectMode;
  },

  //*halledilenler //////////////////////////////
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
