<template>
  <q-page>
    <div class="row justify-around items-center toparea">
      <div
        class="
          col-xs-11 col-sm-11 col-md-10 col-xl-5 col-lg-5
          column
          items-center
          q-mb-md
        "
      >
        <transition appear enter-active-class="animated fadeInUp">
          <AccountCard :accountCount="accountsLength" />
        </transition>
      </div>
      <div
        class="
          col-xs-11 col-sm-11 col-md-10 col-xl-5 col-lg-5
          column
          items-center
          q-mb-md
        "
      >
        <transition appear enter-active-class="animated fadeInUp">
          <ProcessCard />
        </transition>
      </div>
    </div>
    <div class="row justify-center items-center q-ma-sm">
      <div class="col-12">
        <transition appear enter-active-class="animated fadeInUp"
          ><ProcessPanel
        /></transition>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import AccountCard from 'src/components/dashboard/AccountCard.vue';
import ProcessCard from 'src/components/dashboard/ProcessCard.vue';
import ProcessPanel from 'src/components/dashboard/ProcessPanel.vue';

import StoreClass from 'src/services/mockService';

import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Dashboard',
  components: { AccountCard, ProcessCard, ProcessPanel },
  setup() {
    const Store = new StoreClass();
    const q = useQuasar();
    const accountsLength = Store.getAccountsLength;
    // onMounted(() => {
    // if (Store.getAccounts.value.length == 0) {
    //   Store.initialize();
    // }

    // });
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

    return {
      accountsLength,
      thumbStyle,
      barStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
.toparea {
  background-color: transparent;
  border-radius: 10px;
}
</style>
