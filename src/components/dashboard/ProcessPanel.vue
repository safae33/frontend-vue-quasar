<template>
  <q-card
    class="process-panel mitr-font fit"
    :class="{ 'shadow-12': isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <q-card-section class="col-12 row pp-header q-pa-none">
      <span class="q-pa-sm">İşlem Paneli</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-card-section class="row pp-body q-pa-none">
      <div class="col-12 col-xl-4 col-lg-4 col-md-4 tweets non-selectable">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="fit tweet-scroll q-pl-xs q-pr-sm"
        >
          <div
            v-for="tweetGroup in tweets"
            :key="tweetGroup.index"
            class="q-pl-xs q-pr-sm relative-position"
            v-ripple
            @click="setSelectedTweetGroup(tweetGroup.index)"
          >
            <DraggableTweets :tweetGroupIndex="tweetGroup.index" />
            <!-- <draggable
              :class="tweetGroup.color + '-border'"
              class="list-group q-my-md"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }"
              handle=".handle"
              :list="tweetGroup.tweets"
              v-bind="dragOptions"
              @start="drag = true"
              @end="end()"
              item-key="index"
            >
              <template #item="{ element }">
                <div class="row q-ma-xs list-group-item">
                  <div class="col-10">
                    <Tweet :tweetElem="element" />
                  </div>
                  <div
                    class="col-2 ball-border column items-center justify-between"
                  >
                    <q-btn
                      class="col"
                      icon="mdi-delete"
                      size="md"
                      v-ripple.stop
                    />

                    <q-btn
                      class="col handle"
                      icon="fas fa-arrows-alt-v"
                      size="md"
                      v-ripple.stop
                    />

                    <q-btn
                      class="col"
                      icon="mdi-view-split-horizontal"
                      size="md"
                      v-ripple.stop
                    />
                  </div>
                </div>
              </template>
            </draggable> -->
          </div>
        </q-scroll-area>
      </div>

      <div
        class="col-12 col-xl-8 col-lg-8 col-md-8 accounts"
        :class="{ 'no-pointer-events': !isSelected }"
      >
        <div
          v-if="!isSelected"
          class="row fit items-center no-selected-text aldrich-font"
        >
          Önce Tweet veya Tweet Grubu seçmeniz gerekmektedir.
        </div>

        <q-scroll-area
          v-if="isSelected"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="fit account-scroll q-pl-xs q-pr-sm"
          ref="accountsScroll"
        >
          <div
            class="row q-pl-xs q-pr-sm"
            style="margin-top: 12px; margin-bottom: 12px"
          >
            <div
              class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pr-sm q-py-sm column items-center"
              v-for="account in accounts"
              :key="account.id"
            >
              <Account :accountId="account.id" />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { QScrollArea } from 'quasar';
import draggable from 'vuedraggable';

// import Tweet from 'src/components/dashboard/Tweet.vue';
import Account from 'src/components/dashboard/Account.vue';
import DraggableTweets from 'src/components/dashboard/DraggableTweets.vue';

import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'ProcessPanel',
  components: {
    // Tweet,
    Account,
    draggable,
    DraggableTweets,
  },
  setup() {
    const Store = new StoreClass();
    // const tweets: Ref<TweetGroup[]> = ref([]);
    // setTimeout(() => (tweets.value = Store.getTweetsCloned()), 500);
    const tweets = Store.getTweets;
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
    // const dragOptions = computed(() => {
    //   return {
    //     animation: 200,
    //     group: 'description',
    //     disabled: false,
    //     ghostClass: 'ghost',
    //   };
    // });
    // const drag = ref(false);

    const selectedTweetGroupId = Store.getSelectedTweetGroupId;
    const isSelected = Store.getIsSelectedTweetGroup;
    const accounts = Store.getSelectedTweetGroupAccounts;

    return {
      isSelected,
      accounts,
      selectedTweetGroupId,
      accountsScroll,
      setSelectedTweetGroup(id: number) {
        Store.setSelectedTweetGroupId(id);
        accountsScroll.value?.setScrollPosition('vertical', 0, 500);
      },
      tweets,
      // end() {
      //   drag.value = false;
      // },
      // drag,
      // dragOptions,
      isHovering,
      thumbStyle,
      barStyle,

      // toggleSelected() {
      //   tweetSelected.value = !tweetSelected.value;
      //   accountsScroll.value?.setScrollPosition('vertical', 0, 500);
      // },
    };
  },
});
</script>
<style lang="scss">
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
// .list-group {
//   min-width: 223px;
//   padding-left: 0;
//   border-radius: 8px;
// }
// .red-border {
//   border: $red-2 solid 3px;
// }
// .green-border {
//   border: $green-2 solid 3px;
// }
// .blue-border {
//   border: $blue-2 solid 3px;
// }
.accounts {
  background-color: $myCol;
}
.account-scroll {
  border: $myCol solid 2px;
  transition: border 200ms linear;
}
.account-scroll:hover {
  border: $primary solid 2px;
  border-radius: 10px;
}
.tweets {
  background-color: $myCol;
}
.tweet-scroll {
  border: $myCol solid 2px;
  transition: border 200ms linear;
}
.tweet-scroll:hover {
  border: $primary solid 2px;
  border-radius: 10px;
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
  }
  .pp-body {
    height: 555px;
    max-height: 855px;
  }
  .dot {
    height: 40px;
    width: 36px;
    border-top-right-radius: 10px;
    background-color: $text-color;
  }
}

.ball-border {
  border-right: $text-color solid 2px;
  border-bottom: $text-color solid 2px;
  border-top: $text-color solid 2px;
  border-radius: 0 8px 8px 0;

  .q-icon {
    color: $text-color;
  }
}
</style>
