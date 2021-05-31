import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';
import { useQuasar } from 'quasar';

import mockAccJson from 'src/services/mock.json';
import Account from 'src/models/Account.model';
import TweetGroup from 'src/models/TweetGroup.model';
import Tweet from 'src/models/Tweet.model';
import Action from 'src/models/Action.model';
import { ITweetInfo } from 'src/models/interfaces';

export class Store {
  store = useStore();
  q = useQuasar();

  //*getters //////////////////////////////
  /**@return tüm state.tweetGroups */
  getTweetGroups: ComputedRef<TweetGroup[]> = computed(
    () => this.store.state.general.tweetGroups
  );
  /**@return tüm state.tweets */
  getTweets: ComputedRef<Tweet[]> = computed(
    () => this.store.state.general.tweets
  );
  /**@return tüm state.accounts */
  getAccounts: ComputedRef<Account[]> = computed(
    () => this.store.state.general.accounts
  );
  /**@return state.accounts.length */
  getAccountsLength: ComputedRef<Account[]> = computed(
    () => this.store.state.general.accounts.length
  );
  /**@return state.selectedTweetGroupId */
  getSelectedTweetGroupId = computed(
    () => this.store.state.general.selectedTweetGroupId
  );
  /**@return state.isDragging */
  getIsDragging = computed(() => this.store.state.general.isDragging);
  /**@return state.loggedInUser */
  getLoggedInUser = computed(() => this.store.state.general.loggedInUser);
  /**@return state.token */
  getToken = computed(() => this.store.state.general.token);

  //allAccounts
  /**@return state.selectedAccountId */
  getSelectedAccountId: ComputedRef<number | null> = computed(
    () => this.store.state.general.selectedAccountId
  );
  /**@return state.delSelectMode */
  getDelSelectMode: ComputedRef<boolean> = computed(
    () => this.store.state.general.delSelectMode
  );
  /**@return state.delSelectedAccountIdArr */
  getDelSelectedAccountIdArr: ComputedRef<number[]> = computed(
    () => this.store.state.general.delSelectedAccountIdArr
  );
  /**@return state.addAccountTaskId */
  getAddAccountTaskId = computed(
    () => this.store.state.general.addAccountTaskId
  );
  /**@return state.addAccountTaskId */
  getAddAccountStatus = computed(
    () => this.store.state.general.addAccountStatus
  );

  //*setters //////////////////////////////
  /**gönderilen id değeri selectedgroupid ye yazılır*/
  setSelectedTweetGroupId(id: number) {
    this.store.commit('general/setSelectedTweetGroupId', id);
    if (id != 999999)
      this.q.notify({
        type: 'myType',
        message: 'Tweet grubu seçildi.',
        timeout: 400,
        position: 'top-right',
      });
  }
  /**
   * gönderilen idye ait accountun selectedgroupidli actionının like değeri togglelanır
   * @param accountId işlem yapılcak account idsi
   */
  toggleLike(accountId: number) {
    this.store.commit('general/toggleActionLike', accountId);
  }
  /**
   * gönderilen idye ait accountun selectedgroupidli actionının retweet değeri togglelanır
   * @param accountId işlem yapılcak account idsi
   */
  toggleRetweet(accountId: number) {
    this.store.commit('general/toggleActionRetweet', accountId);
  }
  /**
   * dragging değerini toggle eder. tutma başlayınca ve bitince çalışacak
   */
  toggleDragging() {
    this.store.commit('general/toggleDragging');
  }
  /**
   *  gönderilen tweetgroupid içindeki gönderilen tweet indexini çıkarır.
   * tweet silinmiş olmaz ancak grupsuz kaldığı için görünmez.
   * @param tweetGroupId işlem yapılacak tweetgroup id
   * @param tweetIndex işlem yapılacak tweet indexi
   */
  removeTweetIndexFromTweetGroup(tweetGroupId: number, tweetIndex: number) {
    this.store.commit('general/removeTweetIndexFromTweetGroup', {
      tweetGroupId: tweetGroupId,
      tweetIndex: tweetIndex,
    });
    this.setSelectedTweetGroupId(999999);
    this.q.notify({
      type: 'myType',
      message: 'Tweet silindi.',
      timeout: 800,
      position: 'top-right',
    });
  }
  /**
   * gönderilen tweetgroupid içindeki gönderilen tweet indexini çıkarır.
   * gönderilen tweet indexini içeren yeni bir grup oluşturur.
   * @param tweetGroupId işlem yapılacak tweetgroup id
   * @param tweetIndex işlem yapılacak tweet indexi
   */
  splitTweetToNewGroup(tweetGroupId: number, tweetIndex: number) {
    this.store.commit('general/removeTweetIndexFromTweetGroup', {
      tweetGroupId: tweetGroupId,
      tweetIndex: tweetIndex,
    });
    this.store.commit('general/createNewTweetGroup', tweetIndex);
    this.store.commit('general/addActionForRecentAddedTweetGroup');
    //notify
    this.q.notify({
      type: 'myType',
      message: 'Tweet gruptan ayrıldı.',
      timeout: 800,
      position: 'top-right',
    });
  }

  setToken(token: string | null) {
    this.store.commit('general/setToken', token);
  }

  setAddAccountTaskId(taskId: string) {
    this.store.commit('general/setAddAccountTaskId', taskId);
  }

  setAddAccountStatus(status: string) {
    this.store.commit('general/setAddAccountStatus', status);
  }

  isAuth = computed(() => {
    if (this.getToken.value == '') return true;
    else return false;
  });

  /**
   * mock içindeki yeni tweet tweets içine eklenir. Yeni bir grup oluşturulur.
   *  tweetindex değeri gönderilmediği için tüm tweetlerin en son indexini atar.
   *
   */
  addNewTweet(tweet: ITweetInfo) {
    const tweet1 = Object.assign(new Tweet(), tweet);
    this.store.commit('general/pushTweet', tweet1);
    this.store.commit('general/createNewTweetGroup');
    this.store.commit('general/addActionForRecentAddedTweetGroup');
    //notify
    this.q.notify({
      type: 'myType',
      message: 'Yeni tweet eklendi.',
      timeout: 800,
      position: 'top-right',
    });
  }

  /**
   * tweet groupları içinde tweets alanı boş kalmış grup arar. bulursa siler.
   */
  scanForEmptyTweetGroup() {
    this.getTweetGroups.value.forEach((tg) => {
      if (!tg.tweets.length) {
        this.setSelectedTweetGroupId(999999);
        this.store.commit('general/deleteTweetGroupById', tg.id);
        this.store.commit('general/removeActionForDeletedTweetGroup', tg.id);
      }
    });
  }
  //utilrow işlemleri
  resetAllActions() {
    this.store.commit('general/resetAllActions');
  }
  likeAllActions() {
    this.store.commit('general/likeAllActions');
  }
  retweetAllActions() {
    this.store.commit('general/retweetAllActions');
  }

  //allAccounts
  setSelectedAccountId(id: number | null) {
    this.store.commit('general/setSelectedAccountId', id);
  }

  setDelSelectMode(value: boolean) {
    this.store.commit('general/setDelSelectMode', value);
  }
  delSelectedAccounts() {
    this.store.commit('general/delSelectedAccounts');
  }
  toggleDelSelectMode() {
    this.store.commit('general/toggleDelSelectMode');
  }
  setDelSelectedAccountIdArr(val: number[]) {
    this.store.commit('general/setDelSelectedAccountIdArr', val);
  }
  addActionsForNewAccountAndPushToAccounts(account: Account) {
    this.getTweetGroups.value.forEach((tg) =>
      account.actions.push(new Action(tg.id))
    );
    this.store.commit('general/pushAccount', account);
    this.setSelectedAccountId(account.id);
    //notify
    this.q.notify({
      type: 'positive',
      message: 'Yeni hesap eklendi. Kullanıcı Adı: ' + account.username,
      timeout: 800,
      position: 'top-right',
    });
  }

  resetWhenRouteChange() {
    this.setDelSelectMode(false);
    this.setDelSelectedAccountIdArr([]);
    this.setSelectedAccountId(null);
  }

  //mock işlemler
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
  }
}

export default Store;
