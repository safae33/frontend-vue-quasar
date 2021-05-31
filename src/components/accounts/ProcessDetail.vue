<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    class="fit q-pl-xs q-pr-sm"
    id="account-process-scroll-area"
    visible
  >
    <q-timeline color="secondary">
      <q-virtual-scroll
        scroll-target="#account-process-scroll-area > .scroll"
        :virtual-scroll-item-size="317"
        :items="processes"
        id="accounts-virtual-scroll"
      >
        <template v-slot="{ item, index }">
          <TimelineEntry :key="index" :process="item" />
        </template>
      </q-virtual-scroll>
    </q-timeline>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, reactive } from 'vue';
// import { useQuasar } from 'quasar';

import Process from 'src/models/Process.model';

import TimelineEntry from 'src/components/accounts/TimelineEntry.vue';

import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'ProcessDetail',
  components: { TimelineEntry },
  setup() {
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

    const processes: ComputedRef<Process[]> = computed(
      () =>
        Store.getAccounts.value.filter(
          (account) => account.id == Store.getSelectedAccountId.value
        )[0].processes
    );

    //burda kaldın. tweet e clickable olmasını prop olarak at. virtual scroll a height vermedin henüz. şu timeline body kısmını düzenle biraz. card ve itemlarla yapabilrsn. bu kadar şimdilik akllımdakiler. daha çalışmıyo kafam

    return { processes, thumbStyle, barStyle };
  },
});
</script>

<style lang="scss" scoped>
.timeline-heading {
  font-size: 50px !important;
}
.detail-card {
  height: 200px;
}
.text-text-color {
  font-size: 2.8rem;
  font-weight: 500;
}
.tweet-col {
  border: $myCol1 solid 4px;
  border-radius: 8px;
}
</style>
