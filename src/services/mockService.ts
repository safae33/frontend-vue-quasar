import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';

import mockAccJson from 'src/services/mock.json';
import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';
import Tweet from 'src/models/Tweet.model';

export class Store {
  store = useStore();

  //*getters //////////////////////////////
  getTweetGroups: ComputedRef<TweetGroup[]> = computed(
    () => this.store.state.general.tweetGroups
  );
  getTweets: ComputedRef<Tweet[]> = computed(
    () => this.store.state.general.tweets
  );
  getAccounts: ComputedRef<Account[]> = computed(
    () => this.store.state.general.accounts
  );
  getAccountsLength: ComputedRef<Account[]> = computed(
    () => this.store.state.general.accounts.length
  );
  getSelectedTweetGroupId = computed(
    () => this.store.state.general.selectedTweetGroupId
  );

  //*setters //////////////////////////////
  setSelectedTweetGroupId(id: number) {
    this.store.commit('general/setSelectedTweetGroupId', id);
  }

  toggleLike(accountId: number) {
    this.store.commit('general/toggleActionLike', accountId);
  }

  toggleRetweet(accountId: number) {
    this.store.commit('general/toggleAccountRetweet', accountId);
  }

  setIsSelectedTweetGroup(val: boolean) {
    this.store.commit('general/setIsSelectedTweetGroup', val);
  }

  removeTweetIndexFromTweetGroup(tweetGroupId: number, tweetIndex: number) {
    this.store.commit('general/removeTweetIndexFromTweetGroup', {
      tweetGroupId: tweetGroupId,
      tweetIndex: tweetIndex,
    });
  }

  // pushNewTweet(url: string) {
  //   //'NORMALDE BURADA BACKENDE İSTEK ATILIP URLDEKİ TWEETİN BİLGİLERİ DÖNÜLECEK. BEN YİNE RANDOM ATIYORUM',

  //   console.log(url, 'mecburi');
  //   // this.store.commit('general/pushNewTweetGroup', new TweetGroup(), Api.getTweetInfo())

  //   this.store.commit(
  //     'general/pushTweetGroup',
  //     new TweetGroup(
  //       this.store.state.general.tweets.length,
  //       new Tweet(
  //         new Account(
  //           this.store.state.general.accounts.length,
  //           'Mock Safa Hesabı',
  //           '@mockhesap',
  //           'https://source.unsplash.com/random/200x200?sig=',
  //           false,
  //           false
  //         ),
  //         'Bu tweet mock olarak eklenmiştir. backend bağlanana kadr böyle eklenecek her tweet.',
  //         'neurlsi',
  //         this.totalTweetCount()
  //       )
  //     )
  //   );
  //   console.log('pushnew den tweets ', this.getTweets.value);
  // }

  splitTweetToNewGroup(tweetGroupId: number, tweetIndex: number) {
    this.store.commit('general/removeTweetIndexFromTweetGroup', {
      tweetGroupId: tweetGroupId,
      tweetIndex: tweetIndex,
    });
    this.store.commit('general/createNewTweetGroup', tweetIndex);
  }

  scanForEmptyTweetGroup() {
    this.getTweetGroups.value.forEach((tg) => {
      if (!tg.tweets.length) {
        this.setSelectedTweetGroupId(999999);
        this.store.commit('general/deleteTweetGroupById', tg.id);
      }
    });
  }

  /**Mock accountları atama */
  setAc() {
    mockAccJson.accounts.forEach((account) =>
      this.store.commit(
        'general/pushAccount',
        Object.assign(new Account(), account)
      )
    );
  }

  /**Mock tweetleri atama */
  setTw() {
    mockAccJson.tweets.forEach((tweet) => {
      this.store.commit('general/pushTweet', Object.assign(new Tweet(), tweet));
    });
  }
  /**Mock tweetgroupları atama */
  setTwG() {
    mockAccJson.tweetGroups.forEach((tweetGroup) => {
      this.store.commit(
        'general/pushTweetGroup',
        Object.assign(new TweetGroup(), tweetGroup)
      );
    });
  }

  initialize() {
    this.setAc();
    this.setTw();
    this.setTwG();
    // console.log('bunlar tweetgroups ', this.getTweetGroups.value);
    // console.log('bunlar tweets ', this.getTweets.value);
    // console.log('bunlar accounts ', this.getAccounts.value);
  }
}

export default Store;
