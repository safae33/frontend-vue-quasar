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
          <!-- tweets-input -->
          <q-card-section class="addTweetInput q-pa-none q-px-xs">
            <q-input
              type="text"
              v-model="addTweetValue"
              ref="addTweetRef"
              label="Tweet eklemek için linkini giriniz."
              @keyup="addNewTweet"
              :class="{ pulse: !tweetGroups.length }"
              dense
            />
          </q-card-section>
          <!-- tweets-body -->
          <q-card-section
            class="full-width tweets-card-section q-pa-none relative-position"
          >
            <div
              class="inset-shadow-down absolute-bottom shadow_div z-top"
            ></div>
            <div
              v-if="!tweetGroups.length"
              class="row fit content-start no-tweet-text aldrich-font q-pt-md"
            >
              <q-icon class="col-12" name="fas fa-arrow-circle-up" />
              <div class="col-12">
                <span>Önce Tweet Eklemeniz Gerekmektedir</span>
              </div>
            </div>
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="tweet-scroll fit q-pr-sm"
              ref="tweetsScroll"
              visible
            >
              <div
                v-for="tweetGroup in tweetGroups"
                :key="tweetGroup.id"
                class="q-pr-sm q-py-xs relative-position"
              >
                <DraggableTweets :tweetGroupId="tweetGroup.id" />
                <q-separator inset class="color-text" />
              </div>
            </q-scroll-area>
          </q-card-section>
          <q-inner-loading :showing="isNewTweetLoading" color="primary">
            <q-spinner-hourglass color="teal-4" size="100px" />
          </q-inner-loading>
        </q-card>
      </div>
      <!-- accounts -->
      <div class="col-12 col-xl-8 col-lg-8 col-md-8 accounts relative-position">
        <div class="inset-shadow-down absolute-bottom shadow_div z-top"></div>
        <div
          v-if="!isSelected"
          class="row fit items-center no-selected-text aldrich-font absolute-center z-top pulse"
        >
          <div class="col-2">
            <q-icon size="xl" name="fas fa-arrow-circle-left" />
          </div>
          <div class="col-10 non-selectable mitr-font">
            Önce Tweet veya Tweet Grubu seçmeniz gerekmektedir.
          </div>
        </div>
        <q-card class="fit" flat>
          <q-card-section
            class="util-row q-pa-none q-pr-xs row align-between justify-between"
          >
            <q-input
              class="col-3 q-pa-none q-pl-xs"
              v-model="accountsFilterValue"
              type="text"
              label="Ara"
              clear-icon="fas fa-times"
              clearable
              dense
            />

            <q-btn
              dense
              class="col-3 like-color"
              icon="fas fa-heart"
              label="Tümüyle Beğen"
              flat
              @click="likeAllActions"
            />
            <q-btn
              dense
              class="col-3 retweet-color"
              icon="fas fa-retweet"
              label="Tümüyle Retweet"
              flat
              @click="retweetAllActions"
            />

            <q-btn
              dense
              class="col-2"
              color="primary"
              icon="fas fa-redo"
              label="Sıfırla"
              flat
              @click="resetActions"
            />
          </q-card-section>
          <q-card-section class="accounts-card-section full-width q-pa-none">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              class="account-scroll fit q-pl-xs q-pr-sm"
              ref="accountsScroll"
              id="accounts-scroll-area"
              visible
            >
              <q-virtual-scroll
                scroll-target="#accounts-scroll-area > .scroll"
                :virtual-scroll-item-size="108"
                :items="accounts"
                id="accounts-virtual-scroll"
              >
                <template v-slot="{ item, index }">
                  <Account
                    :accountElem="item"
                    :isWithAction="true"
                    :key="index"
                  />
                </template>
              </q-virtual-scroll>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  ComputedRef,
} from 'vue';
import { QScrollArea, QInput, useQuasar } from 'quasar';
import Account from 'src/components/dashboard/Account.vue';
import DraggableTweets from 'src/components/dashboard/DraggableTweets.vue';

import AccountModel from 'src/models/Account.model';
import StoreClass from 'src/services/mockService';
import TweetGroup from 'src/models/TweetGroup.model';

export default defineComponent({
  name: 'ProcessPanel',
  components: {
    Account,
    DraggableTweets,
  },
  setup() {
    //ref içindeki value kullanmak gerekince arrow function ile yapmak gerekiyor.

    //*sabitler //////////////////////////////
    const $q = useQuasar();
    const Store = new StoreClass();
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
    const isHovering = ref(false);
    //*tweets side //////////////////////////////
    // const tweetGroups = Store.getTweetGroups;
    const tweetGroups: ComputedRef<TweetGroup[]> = computed(() => {
      const tweetGroups_: TweetGroup[] = [];
      Store.getTweetGroups.value.forEach((tweetGroup) => {
        tweetGroups_.push(Object.assign(new TweetGroup(), tweetGroup));
      });
      return tweetGroups_.reverse();
    });
    const tweetsScroll = ref<QScrollArea>();
    watch(Store.getTweetGroups.value, () => {
      Store.scanForEmptyTweetGroup();
      tweetsScroll.value?.setScrollPosition('vertical', 0, 100);
    });
    const isNewTweetLoading = ref(false);

    //*accounts side //////////////////////////////
    const isSelected = computed(
      () => Store.getSelectedTweetGroupId.value != 999999
    );
    function slice(size: number, filter: string) {
      let oldAccounts = Store.getAccounts.value;
      if (filter != '' && filter != null)
        oldAccounts = oldAccounts.filter((account) => {
          return (
            account.name.includes(filter) || account.username.includes(filter)
          );
        });
      const accounts: [AccountModel[]] = [[]];
      for (let index = 0; index < oldAccounts.length; index += size) {
        const sliced = oldAccounts.slice(index, index + size);
        accounts.push(sliced);
      }
      if (accounts[-1] == []) accounts.pop();
      return accounts;
    }
    const accounts = computed(() => {
      const filter = accountsFilterValue.value;
      if ($q.screen.name == 'xl' || $q.screen.name == 'lg') {
        return slice(3, filter);
      } else if ($q.screen.name == 'md' || $q.screen.name == 'sm') {
        return slice(2, filter);
      } else {
        return slice(1, filter);
      }
    });
    const accountsFilterValue = ref('');

    function resetActions() {
      Store.resetAllActions();
    }
    function likeAllActions() {
      Store.likeAllActions();
    }
    function retweetAllActions() {
      Store.retweetAllActions();
    }

    //*add tweet side //////////////////////////////
    const addTweetValue = ref('');
    const addTweetRef = ref<QInput>();
    function addNewTweet() {
      isNewTweetLoading.value = true;
      setTimeout(() => {
        isNewTweetLoading.value = false;
        addTweetValue.value = '';
        addTweetRef.value?.blur();
        Store.addNewTweet();
      }, 3000);
    }

    return {
      isNewTweetLoading,
      retweetAllActions,
      likeAllActions,
      accountsFilterValue,
      resetActions,
      tweetsScroll,
      addNewTweet,
      addTweetRef,
      accounts,
      addTweetValue,
      isSelected,
      tweetGroups,
      isHovering,
      thumbStyle,
      barStyle,
    };
  },
});
</script>
<style lang="scss">
.shadow_div {
  width: 100%;
  height: 50px;
}
.retweet-color {
  color: $retweet;
}
.like-color {
  color: $like;
}
.util-row {
  max-height: 56px;
}
.addTweetInput {
  .q-field__label {
    padding-left: 20px;
  }
  border-right: 2px solid $text-color !important;
}
.pulse {
  box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  border-radius: 6px;
  animation: pulse 0.8s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(4, 61, 117, 0.7);
  }

  50% {
    box-shadow: 2px 10px 0 10px rgba(4, 61, 117, 0.3);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  }
}
.color-text {
  background: $text-color;
}
.shadow {
  box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%), 0 12px 17px 2px rgb(0 0 0 / 14%),
    0 5px 22px 4px rgb(0 0 0 / 12%);
}
.no-selected-text {
  text-align: center;
  // color: $text-color;
  color: $myCol1;
  font-size: 42px;
  background-color: #000000a9;
  span,
  p {
    font-size: 16px;
    text-align: left;
  }
  .q-icon {
    font-size: 110px !important;
    color: $myCol1;
  }
}
.no-tweet-text {
  text-align: center;
  color: $text-color;

  font-size: 48px;

  span,
  p {
    font-size: 16px;
    text-align: left;
  }
  .q-icon {
    color: $text-color;
  }
}
.account-scroll {
  border: transparent solid 2px;
  border-radius: 10px;
  transition: border 200ms linear;
}
.account-scroll:hover {
  border: $primary solid 2px;
}

.tweet-scroll {
  border: $myCol solid 2px;
  transition: border 200ms linear;
}
// .tweet-scroll:hover {
//   border: $primary solid 2px;
//   border-radius: 10px;
// }

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
