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
          class="fit"
        >
          <div
            v-for="item in items"
            :key="item.index"
            class="q-px-sm relative-position"
            v-ripple
          >
            <draggable
              :class="item.color + '-border'"
              class="list-group"
              tag="transition-group"
              :component-data="{
                tag: 'ul',
                type: 'transition-group',
                name: !drag ? 'flip-list' : null,
              }"
              handle=".handle"
              v-model="item.list"
              v-bind="dragOptions"
              @start="drag = true"
              @end="end()"
              item-key="index"
            >
              <template #item="{ element }">
                <div class="row q-ma-xs list-group-item">
                  <div class="col-10">
                    <Tweet :name="element.name" />
                  </div>
                  <div
                    class="col-2 ball-border column items-center justify-between"
                  >
                    <q-icon
                      class="col full-width"
                      color="red"
                      name="mdi-delete"
                      size="sm"
                    />

                    <div class="col ball handle" :class="'bg-' + item.color" />

                    <q-icon
                      class="col full-width"
                      color="primary"
                      name="mdi-view-split-horizontal"
                      size="sm"
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
          class="fit"
          ref="accountsScroll"
        >
          <div class="row">
            <div
              class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-sm column items-center"
              v-for="i in 38"
              :key="i"
            >
              <Account :withAction="true" />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { QScrollArea } from 'quasar';
import draggable from 'vuedraggable';

import Tweet from 'src/components/dashboard/Tweet.vue';
import Account from 'src/components/dashboard/Account.vue';
export default defineComponent({
  name: 'ProcessPanel',
  components: {
    Tweet,
    Account,
    draggable,
  },
  setup() {
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
      { name: '4', index: 4 },
    ]);
    const list2 = ref([
      { name: '5', index: 5 },
      { name: '6', index: 6 },
      { name: '7', index: 7 },
      { name: '8', index: 8 },
    ]);
    const items = reactive([
      { index: 0, list: list, color: 'red' },
      { index: 1, list: list2, color: 'green' },
    ]);
    return {
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
  border: red solid 3px;
}
.green-border {
  border: green solid 3px;
}
.accounts {
  background-color: $text-color;
}
.tweets {
  background-color: $myCol;
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
.ball {
  width: 2em;
  height: auto;
  border-radius: 50%;
  background-color: $text-color;
}
.ball-border {
  border-right: $text-color solid 2px;
  border-bottom: $text-color solid 2px;
  border-top: $text-color solid 2px;
  border-radius: 0 8px 8px 0;
}
</style>
