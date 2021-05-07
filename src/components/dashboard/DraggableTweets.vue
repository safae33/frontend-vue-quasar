<template>
  <!-- :class="tweetGroup.color + '-border'" -->

  <draggable
    :class="{ 'selected-tg': isSelected(), newAdded: newAdded }"
    class="list-group q-my-sm"
    tag="transition-group"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    handle=".handle"
    v-model="tweets"
    v-bind="dragOptions"
    @start="drag = true"
    @end="end()"
    item-key="valueOf"
  >
    <template #item="{ element }">
      <div
        class="row q-ma-xs list-group-item"
        :class="{ 'not-selected': !isSelected(), selected: isSelected() }"
      >
        <div class="col-10" @click="setSelectedTweetGroup">
          <Tweet :tweetIndex="element" :isRipple="true" />
        </div>
        <div
          class="col-2 action-border column items-center justify-end q-py-xs q-px-xs"
        >
          <q-btn
            class="col handle q-mb-xs q-py-none full-width"
            icon="fas fa-arrows-alt"
            size="md"
            flat
          />
          <q-btn
            class="col q-mb-xs q-py-none full-width"
            icon="fas fa-trash"
            size="md"
            text-color="negative"
            flat
            @click="removeTweetIndex(element)"
          />

          <q-btn
            :disable="tweets.length == 1"
            flat
            class="col q-py-none full-width"
            icon="mdi-view-split-horizontal"
            size="md"
            @click="splitTweet(element)"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, computed, ref, ComputedRef, onMounted } from 'vue';

import Tweet from 'src/components/dashboard/Tweet.vue';
import draggable from 'vuedraggable';

import StoreClass from 'src/services/mockService';

import TweetGroup from 'src/models/TweetGroup.model';

export default defineComponent({
  name: 'DraggableTweets',
  components: { Tweet, draggable },
  props: ['tweetGroupId'],
  setup(props) {
    //*sabitler //////////////////////////////
    const Store = new StoreClass();

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });
    const drag = ref(false);
    const newAdded = ref(true);

    const tweets: ComputedRef<number[]> = computed({
      get() {
        return Store.store.state.general.tweetGroups.filter(
          (tweetGroup: TweetGroup) => tweetGroup.id == props.tweetGroupId
        )[0].tweets;
      },
      set(val) {
        const payload = { tweets: val, id: props.tweetGroupId };
        Store.store.commit('general/setTweetGroupTweets', payload);
      },
    });
    const isSelected = (): boolean => {
      return Store.getSelectedTweetGroupId.value == props.tweetGroupId;
    };

    onMounted(() => {
      setTimeout(() => {
        newAdded.value = false;
      }, 1200);
    });

    return {
      newAdded,
      tweets,
      isSelected,
      drag,
      dragOptions,
      end() {
        drag.value = false;
      },
      removeTweetIndex(tweetIndex: number) {
        Store.removeTweetIndexFromTweetGroup(props.tweetGroupId, tweetIndex);
      },
      splitTweet(tweetIndex: number) {
        Store.splitTweetToNewGroup(props.tweetGroupId, tweetIndex);
      },
      setSelectedTweetGroup() {
        Store.setSelectedTweetGroupId(props.tweetGroupId);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.newAdded {
  box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  border-radius: 10px;
  animation: pulse 0.8s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(4, 61, 117, 0.7);
  }

  50% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(4, 61, 117, 0.3);
  }

  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  }
}
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
