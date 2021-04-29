<template>
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
        <div class="col-2 ball-border column items-center justify-between">
          <q-btn class="col" icon="mdi-delete" size="md" v-ripple.stop />

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
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import Tweet from 'src/models/Tweet.model';
import draggable from 'vuedraggable';
import TweetGroup from 'src/models/TweetGroup.model';

export default defineComponent({
  name: 'DraggableTweets',
  components: { Tweet, draggable },
  // props: { tweet: Tweet },
  props: ['tweetGroup'],
  setup(props) {
    const tweetGroup: TweetGroup = props.tweetGroup;
    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    });
    const drag = ref(false);

    return {
      tweetGroup,
      drag,
      dragOptions,
      end() {
        drag.value = false;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.list-group {
  min-width: 223px;
  padding-left: 0;
  border-radius: 8px;
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
