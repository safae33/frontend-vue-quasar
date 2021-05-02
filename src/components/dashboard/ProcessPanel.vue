<template>
  <q-card
    class="process-panel mitr-font fit"
    :class="{ shadow: isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    flat
  >
    <q-card-section class="col-12 row pp-header q-pa-none">
      <span class="q-pa-sm">İşlem Paneli</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-card-section class="row pp-body q-pa-none">
      <div class="col-12 col-xl-4 col-lg-4 col-md-4 non-selectable">
        <q-card class="fit" flat>
          <q-card-section class="q-pa-none q-px-xs">
            <q-input
              dense
              type="text"
              v-model="inputUrl"
              label="Tweet eklemek linkini giriniz."
              @keypress="pushNewTweet"
            />
          </q-card-section>
          <q-card-section class="full-width tweets-card-section q-pa-none">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="tweet-scroll fit q-pr-sm"
            >
              <div
                v-for="tweetGroup in tweets"
                :key="tweetGroup.index"
                class="q-pr-sm q-py-xs relative-position"
              >
                <DraggableTweets :tweetGroupIndex="tweetGroup.index" />
                <q-separator inset class="color-text" />
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-xl-8 col-lg-8 col-md-8 accounts">
        <div
          v-if="!isSelected"
          class="row fit items-center no-selected-text aldrich-font"
        >
          Önce Tweet veya Tweet Grubu seçmeniz gerekmektedir.
        </div>
        <q-card v-if="isSelected" class="fit" flat>
          <q-card-section class="q-pa-none q-pr-xs" style="height: 40px">
            <div class="row full-height">
              <div class="col-1 bg-red">a</div>
              <div class="col-3 bg-green">s</div>
              <div class="col-4 bg-blue">d</div>
              <div class="col-4 bg-indigo">f</div>
            </div>
          </q-card-section>
          <q-card-section class="accounts-card-section full-width q-pa-none">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="account-scroll fit q-pl-xs q-pr-sm"
              ref="accountsScroll"
              id="accounts-scroll-area"
            >
              <!-- <div
            class="row q-pl-xs q-pr-sm"
            style="margin-top: 12px; margin-bottom: 12px"
          > -->
              <q-virtual-scroll
                scroll-target="#accounts-scroll-area > .scroll"
                :virtual-scroll-item-size="108"
                :items="accounts"
                id="accounts-virtual-scroll"
              >
                <template v-slot="{ item, index }">
                  <Account :accountElem="item" :key="index" />
                </template>
              </q-virtual-scroll>

              <!-- <div
              class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pr-sm q-py-sm column items-center"
              v-for="account in accounts()"
              :key="account.id"
            >
              <Account :accountElem="account" />
            </div> -->
              <!-- </div> -->
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect } from 'vue';
import { useQuasar, QScrollArea } from 'quasar';
import Account from 'src/components/dashboard/Account.vue';
import DraggableTweets from 'src/components/dashboard/DraggableTweets.vue';

import AccountModel from 'src/models/Account.model';
import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'ProcessPanel',
  components: {
    Account,
    DraggableTweets,
  },
  setup() {
    //ref içindeki value kullanmak gerekince arrow function ile yapmak gerekiyor.
    const $q = useQuasar();
    const Store = new StoreClass();
    const tweets = Store.getTweets;

    const test = [1, 2, 3, 4, 5, 6];
    console.log(test.splice(2, 2), 'bunlar silinenler');
    console.log(test);
    watchEffect(() => Store.scanForEmptyTweetGroup(tweets.value.length));
    watchEffect(() => console.log('Tweetts: ', tweets));

    const inputUrl = ref('');
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
    const accountsScroll = ref<QScrollArea>();
    const isHovering = ref(false);

    const selectedTweetGroupId = Store.getSelectedTweetGroupId;
    const isSelected = Store.getIsSelectedTweetGroup;

    function slice(size: number) {
      const accounts: [AccountModel[]] = [[]];
      for (
        let index = 0;
        index < tweets.value[selectedTweetGroupId.value].accounts.length;
        index += size
      ) {
        const sliced = tweets.value[selectedTweetGroupId.value].accounts.slice(
          index,
          index + size
        );
        accounts.push(sliced);
      }
      if (accounts[-1] == []) accounts.pop();
      return accounts;
    }
    const accounts = computed(() => {
      if (Store.getIsSelectedTweetGroup) {
        if ($q.screen.name == 'xl' || $q.screen.name == 'lg') {
          return slice(3);
        } else if ($q.screen.name == 'md' || $q.screen.name == 'sm') {
          return slice(2);
        } else {
          return slice(1);
        }
      } else return [];
    });

    console.log('panelden accounts slicedli', accounts);

    return {
      inputUrl,
      pushNewTweet() {
        Store.pushNewTweet(inputUrl.value);
        inputUrl.value = '';
      },
      isSelected,
      accounts,
      selectedTweetGroupId,
      accountsScroll,
      setSelectedTweetGroup(id: number) {
        Store.setSelectedTweetGroupId(id);
        accountsScroll.value?.setScrollPosition('vertical', 0, 500);
      },
      tweets,
      isHovering,
      thumbStyle,
      barStyle,
    };
  },
});
</script>
<style lang="scss">
// #accounts-virtual-scroll {
//   .q-virtual-scroll__content {
//     display: flex;
//     flex-wrap: wrap;
//   }
// }
.color-text {
  background: $text-color;
}
.shadow {
  box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%), 0 12px 17px 2px rgb(0 0 0 / 14%),
    0 5px 22px 4px rgb(0 0 0 / 12%);
}
.no-selected-text {
  text-align: center;
  color: $text-color;
  font-size: 48px;
  span,
  p {
    font-size: 16px;
    text-align: left;
  }
}
.account-scroll {
  border: $myCol solid 2px;
  transition: border 200ms linear;
}
.account-scroll:hover {
  border: $primary solid 2px;
  border-radius: 10px;
}

.tweet-scroll {
  border: $myCol solid 2px;
  transition: border 200ms linear;
}
.tweet-scroll:hover {
  border: $primary solid 2px;
  border-radius: 10px;
}

.tweets-card-section {
  height: 515px;
}

.accounts-card-section {
  height: 515px;
}

.process-panel {
  transition: box-shadow 300ms linear;
  margin-left: auto;
  margin-right: auto;
  height: 600px;
  max-height: 900px;
  border-radius: 10px;

  .pp-header {
    border-bottom: 5px solid $text-color;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    span {
      font-size: 20px;
    }
  }
  .pp-body {
    height: 555px;
    max-height: 855px;
    background-color: white;
  }
  .dot {
    height: 51px;
    width: 36px;
    border-top-right-radius: 10px;
    // background-color: $text-color;
  }
}
</style>
