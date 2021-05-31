<template>
  <q-timeline-entry
    class="timeline-entry q-mx-sm"
    :title="title"
    :subtitle="
      'Oluşturma Tarihi: ' +
      processData.createDate +
      ' Oluşturma Saati: ' +
      processData.createHour
    "
    side="left"
    icon="fas fa-heart"
    :color="color"
  >
    <div class="row">
      <div class="col-12 tweet-col q-my-md">
        <Tweet :tweetObject="processData.targetTweet" :isRipple="false" />
      </div>
      <div class="col-5 column">
        <div class="col">
          <span class="detail-text">İşlem tarihi: </span
          >{{ processData.targetDate }}
        </div>
        <div class="col">
          <span class="detail-text">İşlem Saati: </span
          >{{ processData.targetHour }}
        </div>
      </div>
      <div class="col-7">
        <q-item class="fit">
          <q-item-section>
            <q-item-label
              ><span class="detail-text">İşlem Detayı</span></q-item-label
            >
            <q-item-label lines="2">{{ processData.statusText }}</q-item-label>
          </q-item-section>

          <q-item-section top side>
            <q-icon size="xl" :name="statusIconName" :color="statusIconColor" />
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-separator :color="color" spaced size="3px" class="q-mr-md" />
  </q-timeline-entry>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, onMounted } from 'vue';

import Process from 'src/models/Process.model';
import Tweet from 'src/components/dashboard/Tweet.vue';

export default defineComponent({
  name: 'TimelineEntry',
  components: { Tweet },
  props: ['process'],
  setup(props) {
    const processData: ComputedRef<Process> = computed(() =>
      Object.assign(new Process(), props.process)
    );
    const color = ref('');
    const title = ref('');
    const statusIconName = ref('');
    const statusIconColor = ref('');
    function setValues() {
      if (processData.value.type == 0) {
        color.value = 'teal-1';
        title.value = 'Beğeni';
      }
      if (processData.value.type == 1) {
        color.value = 'teal-2';
        title.value = 'Retweet';
      }
      if (processData.value.status == 0) {
        statusIconName.value = 'fas fa-check-circle';
        statusIconColor.value = 'positive';
      }
      if (processData.value.status == 1) {
        statusIconName.value = 'fas fa-times-circle';
        statusIconColor.value = 'negative';
      }
      if (processData.value.status == 2) {
        statusIconName.value = 'fas fa-info-circle';
        statusIconColor.value = 'warning';
      }
    }
    onMounted(() => {
      setValues();
    });

    return {
      processData,
      color,
      title,
      statusIconName,
      statusIconColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.timeline-entry {
  background-color: $myCol;
  margin-top: -16px;
}
.detail-text {
  font-size: 16px;
  color: #757575 !important;
}
</style>
