<template>
  <q-timeline-entry
    title="Beğeni"
    :subtitle="'Oluşturma Tarihi:' + process1.createDate"
    side="left"
    icon="fas fa-heart"
    class="q-mx-xl"
  >
    <div class="column">
      <div class="col tweet-col q-my-md">
        <Tweet :tweetObject="process1.targetTweet" :isRipple="false" />
      </div>
      <div class="col">İşlem tarihi: {{ process1.targetDate }}</div>
      <div
        class="col"
        :class="{
          completed: process1.status == 0,
          waiting: process1.status == 2,
          failed: process1.status == 1,
        }"
      >
        {{ process1.statusText }}
      </div>
    </div>
  </q-timeline-entry>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';

import Process from 'src/models/Process.model';
import Tweet from 'src/components/dashboard/Tweet.vue';

export default defineComponent({
  name: 'TimelineEntry',
  components: { Tweet },
  props: ['process'],
  setup(props) {
    const process1: ComputedRef<Process> = computed(() =>
      Object.assign(new Process(), props.process)
    );

    return {
      process1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
