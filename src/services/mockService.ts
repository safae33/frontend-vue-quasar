// import { mapMutations, mapGetters } from 'vuex';
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';
import mockAccJson from 'src/services/mock.json';
import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';

export class Store {
  accountId: number;
  store = useStore();

  getAccounts: ComputedRef<Account[]> = computed(() => {
    return this.store.state.general.accounts;
  });

  //   getTweets: ComputedRef<TweetGroup[]> = computed(() => {
  //     return this.store.state.general.tweets;
  //   });

  //   getTweets: ComputedRef<TweetGroup[]> = computed({
  //     get: () => {
  //       return this.store.state.general.tweets;
  //     },
  //     set: (tweets: TweetGroup[]) => {
  //       this.store.commit('setTweets', tweets);
  //     },
  //   });

  getTweets() {
    const clonedTweets: TweetGroup[] = [];
    this.store.state.general.tweets.forEach((val: TweetGroup) =>
      clonedTweets.push(Object.assign({}, val))
    );
    console.log(clonedTweets);
    return clonedTweets;
  }

  getAccountById() {
    const account: ComputedRef<Account[]> = computed(() => {
      return this.store.state.general.accounts.filter((account: Account) => {
        return account.id == this.accountId;
      });
    });
    return account.value[0];
  }

  toggleLike() {
    this.store.commit('general/toggleAccountItemLike', this.accountId);
  }
  toggleRetweet() {
    this.store.commit('general/toggleAccountItemRetweet', this.accountId);
  }

  setAc() {
    mockAccJson.accounts.forEach((account) => {
      this.store.commit(
        'general/pushAccountItem',
        Object.assign(
          new Account(0, 'null', 'null', 'null', false, false),
          account
        )
      );
    });
  }
  setTw() {
    mockAccJson.tweets.forEach((tweetGroup) => {
      this.store.commit(
        'general/pushTweetGroup',
        Object.assign(new TweetGroup(), tweetGroup)
      );
    });
  }
  initialize() {
    this.setAc();
    this.setTw();
  }
  constructor(accountId = 0) {
    this.accountId = accountId;
  }
}

export default Store;
