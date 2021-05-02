<template>
  <q-page>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="scroll-main"
    >
      <div class="page">
        <div class="row justify-around items-center toparea">
          <div
            class="col-xs-10 col-sm-10 col-md-10 col-xl-5 col-lg-5 column items-center q-my-md"
          >
            <AccountCard :accountCount="accountsLength" />
          </div>
          <div
            class="col-xs-10 col-sm-10 col-md-10 col-xl-5 col-lg-5 column items-center q-my-md"
          >
            <ProcessCard />
          </div>
        </div>
        <div class="row justify-center items-center q-ma-sm">
          <div class="col-12"><ProcessPanel /></div>
        </div>
      </div>
      <!-- {{ test }} -->
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed } from 'vue';
// import { useStore } from 'vuex';
import { QScrollArea } from 'quasar';

import AccountCard from 'src/components/dashboard/AccountCard.vue';
import ProcessCard from 'src/components/dashboard/ProcessCard.vue';
import ProcessPanel from 'src/components/dashboard/ProcessPanel.vue';

// import mockAccJson from 'src/services/mock.json';
// import Account from 'src/models/Account.model';
// import TweetGroup from 'src/models/TweetGroup.model';

import StoreClass from 'src/services/mockService';
import TweetGroup from 'src/models/TweetGroup.model';

export default defineComponent({
  name: 'Dashboard',
  components: { AccountCard, ProcessCard, ProcessPanel },
  setup() {
    const Store = new StoreClass();
    const accountsLength = Store.getAccountsLength;
    onMounted(() => {
      Store.initialize();
    });

    const tweets = Store.getTweets;
    const test = computed(() => {
      const cl: TweetGroup[] = [];
      tweets.value.forEach((tweet) => {
        cl.push(Object.assign(new TweetGroup(), tweet));
      });
      cl.forEach((val) => {
        val.accounts = [];
      });
      return cl;
    });

    const thumbStyle = reactive({
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      width: '5px',
      opacity: 0.75,
    });
    const barStyle = reactive({
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2,
    });
    const tweetSelected = ref(true);
    const accountsScroll = ref<QScrollArea>();

    return {
      test,

      init() {
        Store.initialize();
      },
      accountsLength,
      thumbStyle,
      barStyle,
      tweetSelected,
      accountsScroll,
      toggleSelected() {
        tweetSelected.value = !tweetSelected.value;
        accountsScroll.value?.setScrollPosition('vertical', 0, 500);
      },
    };
  },
});
</script>
<style lang="scss">
.page {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 24px;
  padding-bottom: 56px;
}
.scroll-main {
  height: 100vh;
  width: auto;
}

.toparea {
  margin: 24px;
  background-color: transparent;
  border-radius: 10px;
  // transform: skew(-5deg);
}
// .v {
//   transform: skew(5deg);
// }
</style>
