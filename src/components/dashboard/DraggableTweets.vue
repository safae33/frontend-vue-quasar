<template>
  <!-- :class="tweetGroup.color + '-border'" -->

  <draggable
    :class="{ 'selected-tg': isSelected() }"
    class="list-group q-my-sm"
    tag="transition-group"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    handle=".handle"
    v-model="tweetGroup"
    v-bind="dragOptions"
    @start="drag = true"
    @end="end()"
    item-key="index"
  >
    <template #item="{ element }">
      <div class="row q-ma-xs list-group-item">
        <div class="col-10" @click="setSelectedTweetGroup">
          <Tweet :tweetElem="element" :isSelected="isSelected()" />
        </div>
        <div
          class="col-2 action-border column items-center justify-end q-py-xs q-px-xs"
          :class="{ 'not-selected': !isSelected(), selected: isSelected() }"
        >
          <q-btn
            class="col handle q-mb-xs q-py-none full-width"
            icon="fas fa-arrows-alt"
            size="md"
            flat
          />
          <q-btn
            class="col q-mb-xs q-py-none full-width"
            icon="mdi-delete"
            size="md"
            flat
          />

          <q-btn
            :disable="tweetGroup.length == 1"
            flat
            class="col q-py-none full-width"
            icon="mdi-view-split-horizontal"
            size="md"
            @click="splitTweet(element.index)"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, computed, ref, ComputedRef } from 'vue';

import Tweet from 'src/components/dashboard/Tweet.vue';
import draggable from 'vuedraggable';

import StoreClass from 'src/services/mockService';
import TweetM from 'src/models/Tweet.model';

export default defineComponent({
  name: 'DraggableTweets',
  components: { Tweet, draggable },
  props: ['tweetGroupIndex'],
  setup(props) {
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });
    const drag = ref(false);

    const Store = new StoreClass();

    const tweetGroup: ComputedRef<TweetM[]> = computed({
      get() {
        return Store.store.state.general.tweets[props.tweetGroupIndex].tweets;
      },
      set(val) {
        const payload = { tweets: val, index: props.tweetGroupIndex };
        Store.store.commit('general/setTweetGroupTweets', payload);
      },
    });

    const isSelected = (): boolean => {
      if (Store.getIsSelectedTweetGroup)
        return Store.getSelectedTweetGroupId.value == props.tweetGroupIndex;
      else return false;
    };

    return {
      isSelected,
      tweetGroup,
      drag,
      dragOptions,
      end() {
        drag.value = false;
      },
      splitTweet(tweetIndex: number) {
        Store.splitTweetToNewGroup(props.tweetGroupIndex, tweetIndex);
      },
      setSelectedTweetGroup() {
        Store.setSelectedTweetGroupId(props.tweetGroupIndex);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.selected-tg {
  border-left: $text-color solid 5px !important;
}
.selected {
  background-color: $myCol1;
}
.not-selected {
  background-color: $myCol;
}
.list-group {
  transition: border-left 300ms linear;
  min-width: 223px;
  padding-left: 0;
  border-radius: 5px;
  border-left: transparent solid 5px;
}
.action-border {
  transition: background-color 300ms linear;
  .q-btn {
    color: $text-color;
    background-color: white;
  }
}

.bottom-border {
  border-bottom: $myCol solid 2px;
}
.red-border {
  border: $red-2 solid 3px;
}
.green-border {
  border: $green-2 solid 3px;
}
.blue-border {
  border: $blue-2 solid 3px;
}
</style>
