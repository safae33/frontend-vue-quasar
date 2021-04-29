// import { mapMutations, mapGetters } from 'vuex';
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';
import mockAccJson from 'src/services/mock.json';
import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';

// interface IgetAccountBySelectedTweetGroup {
//   selectedTweetGroup: number | null;
//   accounts: Account[];
// }
export class Store {
  accountId = 0;
  store = useStore();

  ////////////////////////////////////////////
  getAccounts: ComputedRef<Account[]> = computed(() => {
    return this.store.state.general.accounts;
  });
  getTweets: ComputedRef<TweetGroup[]> = computed(() => {
    return this.store.state.general.tweets;
  });
  getAccountsLength: ComputedRef<number> = computed(() => {
    return this.store.state.general.accounts.length;
  });

  getSelectedTweetGroupId = computed(() => {
    return this.store.state.general.selectedTweetGroupId;
  });

  getIsSelectedTweetGroup: ComputedRef<boolean> = computed(() => {
    return this.store.state.general.isSelectedTweetGroup;
  });

  getSelectedTweetGroupAccounts: ComputedRef<Account[]> = computed(() => {
    return this.getTweets.value[this.getSelectedTweetGroupId.value].accounts;
  });

  /** anlık seçili tweet grubu idsini ve onun içindeki accountsu döndürür.
   * result içindeki accounts biraz karışık oldu. kesin unuturum ben bunu.
   * önce selectedTweetGroup.value null mı onun kontrolü var. && ile kullanınca ilk koşul doğruysa sonrakine eşitle, gibi bir şey çıkıyor.
   * || sonrası ise ilk koşul doğru değilse eşitleniyor. yani bir nevi -koşul- if -true sonucu- else -false sonucu-
   */
  // getAccountBySelectedTweetGroup: ComputedRef<IgetAccountBySelectedTweetGroup> = computed(
  //   () => {
  //     const result: IgetAccountBySelectedTweetGroup = {
  //       selectedTweetGroup: this.getSelectedTweetGroup.value,
  //       accounts: [],
  //     };
  //     if (this.store.state.general.isSelectedTweetGroup)
  //       result.accounts = this.getTweets.value.filter((val) => {
  //         return val.index == this.getSelectedTweetGroup.value;
  //       })[0].accounts;

  //     console.log('servicete resultla şey ederkenki accounts', result.accounts);
  //     return result;
  //   }
  // );

  tweets: ComputedRef<TweetGroup[]> = computed({
    get() {
      return useStore().state.general.tweets;
    },
    set(val) {
      console.log('asdas');
      useStore().commit('general/setTweets', val);
    },
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

  getTweetsCloned() {
    const clonedTweets: TweetGroup[] = [];
    this.store.state.general.tweets.forEach((val: TweetGroup) =>
      clonedTweets.push(Object.assign({}, val))
    );
    console.log(clonedTweets);
    return clonedTweets;
  }

  // getAccountById() {
  //   const account: Account[] = this.store.state.general.accounts.filter(
  //     (account: Account) => {
  //       return account.id == this.accountId;
  //     }
  //   );
  //   console.log('bulduğu account', account);

  //   return account[0];
  // }
  getAccountById: ComputedRef<Account> = computed(() => {
    return this.store.state.general.accounts.filter((account: Account) => {
      return account.id == this.accountId;
    })[0];
  });

  toggleLike() {
    this.store.commit('general/toggleAccountLike', this.accountId);
    console.log(
      'bu da işlemden sonra like accsi',
      this.store.state.general.tweets[this.getSelectedTweetGroupId.value]
    );
  }
  toggleRetweet() {
    this.store.commit('general/toggleAccountRetweet', this.accountId);
  }

  setSelectedTweetGroupId(id: number) {
    this.store.commit('general/setSelectedTweetGroupId', id);
    console.log(
      'service içindeki setteyim.',
      this.store.state.general.selectedTweetGroupId
    );
  }

  /**Mock account atama */
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
