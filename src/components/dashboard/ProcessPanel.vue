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
          >
            <draggable
              :class="tweetGroup.color + '-border'"
              class="list-group q-my-md"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }"
              handle=".handle"
              v-model="tweetGroup.tweets"
              v-bind="dragOptions"
              @start="drag = true"
              @end="end()"
              item-key="id"
            >
              <template #item="{ element }">
                <div class="row q-ma-xs list-group-item">
                  <div class="col-10">
                    <Tweet :tweet="element" />
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
            </draggable>
          </div>
        </q-scroll-area>
      </div>

      <div
        class="col-12 col-xl-8 col-lg-8 col-md-8 accounts"
        :class="{ 'no-pointer-events': !tweetSelected }"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="fit account-scroll q-pl-xs q-pr-sm"
          ref="accountsScroll "
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
    <q-btn color="primary" icon="check" label="OK" @click="test" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { QScrollArea } from 'quasar';
import draggable from 'vuedraggable';

import Tweet from 'src/components/dashboard/Tweet.vue';
import Account from 'src/components/dashboard/Account.vue';

import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'ProcessPanel',
  props: ['accounts'],
  components: {
    Tweet,
    Account,
    draggable,
  },
  setup() {
    const Store = new StoreClass();
    let tweets = Store.getTweets();
    console.log(tweets);
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
    const isHovering = ref(false);
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });
    const drag = ref(false);
    const list = ref([
      { name: '1', index: 1 },
      { name: '2', index: 2 },
      { name: '3', index: 3 },
    ]);
    const list2 = ref([
      { name: '4', index: 5 },
      { name: '5', index: 6 },
    ]);
    const list3 = ref([
      { name: '6', index: 5 },
      { name: '7', index: 6 },
    ]);
    const list4 = ref([{ name: '8', index: 5 }]);
    const items = reactive([
      { index: 0, list: list4, color: 'none' },
      { index: 1, list: list, color: 'red' },
      { index: 2, list: list2, color: 'green' },
      { index: 3, list: list3, color: 'blue' },
    ]);

    return {
      test() {
        tweets = Store.getTweets();
      },
      tweets,
      end() {
        drag.value = false;
      },
      drag,
      items,
      dragOptions,
      isHovering,
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
.list-group {
  min-width: 223px;
  padding-left: 0;
  border-radius: 8px;
}
.red-border {
  border: $red-4 solid 3px;
}
.green-border {
  border: $green-4 solid 3px;
}
.blue-border {
  border: $blue-4 solid 3px;
}
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
