<template>
  <q-page>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="scroll-main"
    >
      <div class="page">
        <div class="row justify-around items-center toparea">
          <div
            class="col-xs-10 col-sm-10 col-md-10 col-xl-5 col-lg-5 column items-center q-my-md"
          >
            <AccountCard />
          </div>
          <div
            class="col-xs-10 col-sm-10 col-md-10 col-xl-5 col-lg-5 column items-center q-my-md"
          >
            <ProcessCard />
          </div>
        </div>
        <div class="row justify-center items-center q-ma-xl">
          <div class="col-12"><ProcessPanel /></div>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { QScrollArea } from 'quasar';

import AccountCard from 'src/components/dashboard/AccountCard.vue';
import ProcessCard from 'src/components/dashboard/ProcessCard.vue';
import ProcessPanel from 'src/components/dashboard/ProcessPanel.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { AccountCard, ProcessCard, ProcessPanel },
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

    return {
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
.page {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 56px;
  padding-bottom: 56px;
}
.scroll-main {
  height: 100vh;
  width: auto;
}

.toparea {
  margin: 24px;
  background-color: transparent;
  border-radius: 10px;
  transform: skew(-5deg);
}
.v {
  transform: skew(5deg);
}
</style>
