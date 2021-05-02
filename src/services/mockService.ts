import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';

import mockAccJson from 'src/services/mock.json';
import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';
import Tweet from 'src/models/Tweet.model';

export class Store {
  accountId = 0;
  store = useStore();

  ////////////////////////////////////////////
  getAccounts: ComputedRef<Account[]> = computed(
    () => this.store.state.general.accounts
  );
  getTweets: ComputedRef<TweetGroup[]> = computed(
    () => this.store.state.general.tweets
  );
  getAccountsLength: ComputedRef<number> = computed(
    () => this.store.state.general.accounts.length
  );

  getSelectedTweetGroupId = computed(
    () => this.store.state.general.selectedTweetGroupId
  );

  getIsSelectedTweetGroup: ComputedRef<boolean> = computed(
    () => this.store.state.general.isSelectedTweetGroup
  );

  getSelectedTweetGroupAccounts: ComputedRef<Account[]> = computed(
    () => this.getTweets.value[this.getSelectedTweetGroupId.value].accounts
  );

  getSplicedTweet: ComputedRef<Tweet> = computed(
    () => this.store.state.general.splicedTweet
  );

  getTweetsCloned() {
    const clonedTweets: TweetGroup[] = [];
    this.store.state.general.tweets.forEach((val: TweetGroup) =>
      clonedTweets.push(Object.assign({}, val))
    );

    return clonedTweets;
  }

  getAccountById: ComputedRef<Account> = computed(() => {
    return this.store.state.general.accounts.filter((account: Account) => {
      return account.id == this.accountId;
    })[0];
  });

  toggleLike(accountId: number) {
    this.store.commit('general/toggleAccountLike', accountId);
  }
  toggleRetweet(accountId: number) {
    this.store.commit('general/toggleAccountRetweet', accountId);
  }

  setIsSelectedTweetGroup(val: boolean) {
    this.store.commit('general/setIsSelectedTweetGroup', val);
  }

  setSelectedTweetGroupId(id: number) {
    this.setIsSelectedTweetGroup(true);
    this.store.commit('general/setSelectedTweetGroupId', id);
  }

  totalTweetCount() {
    let count = 0;
    this.getTweets.value.forEach((tg) => {
      count += tg.tweets.length;
    });
    return count;
  }
  pushNewTweet(url: string) {
    //'NORMALDE BURADA BACKENDE İSTEK ATILIP URLDEKİ TWEETİN BİLGİLERİ DÖNÜLECEK. BEN YİNE RANDOM ATIYORUM',

    console.log(url, 'mecburi');
    // this.store.commit('general/pushNewTweetGroup', new TweetGroup(), Api.getTweetInfo())

    this.store.commit(
      'general/pushTweetGroup',
      new TweetGroup(
        this.store.state.general.tweets.length,
        new Tweet(
          new Account(
            this.store.state.general.accounts.length,
            'Mock Safa Hesabı',
            '@mockhesap',
            'https://source.unsplash.com/random/200x200?sig=',
            false,
            false
          ),
          'Bu tweet mock olarak eklenmiştir. backend bağlanana kadr böyle eklenecek her tweet.',
          'neurlsi',
          this.totalTweetCount()
        )
      )
    );
    console.log('pushnew den tweets ', this.getTweets.value);
  }

  pushNewTweetWithTweet(tweet: Tweet) {
    this.store.commit(
      'general/pushTweetGroup',
      new TweetGroup(this.store.state.general.tweets.length, tweet)
    );
  }

  scanForEmptyTweetGroup(length: number) {
    console.log(length, 'mecburi');
    this.getTweets.value.forEach((tg) => {
      if (!tg.tweets.length) {
        this.setIsSelectedTweetGroup(false);
        this.setSelectedTweetGroupId(9999);
        this.store.commit('general/deleteTweetGroupByIndex', tg.index);
      }
    });

    console.log('scanden tüm tweets ', this.getTweets.value);
    console.log('scanden selectedtg id ', this.getSelectedTweetGroupId.value);
    console.log('scanden isselectedtg ', this.getIsSelectedTweetGroup.value);
    return this.getTweets;
  }

  splitTweetToNewGroup(tweetGroupIndex_: number, tweetIndex_: number) {
    const payload = {
      tweetGroupIndex: tweetGroupIndex_,
      tweetIndex: tweetIndex_,
    };

    this.setIsSelectedTweetGroup(false);
    this.setSelectedTweetGroupId(9999);
    this.store.commit('general/spliceTweet', payload);
    this.pushNewTweetWithTweet(this.getSplicedTweet.value);
  }

  setAc() {
    mockAccJson.accounts.forEach((account) =>
      this.store.commit(
        'general/pushAccountItem',
        Object.assign(new Account(), account)
      )
    );
  }

  /**Mock tweetleri atama */
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
  setAccountId(id: number) {
    this.accountId = id;
  }
  constructor(accountId = 0) {
    this.accountId = accountId;
  }
}

export default Store;
