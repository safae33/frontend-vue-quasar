<template>
  <transition
    appear
    mode="out-in"
    enter-active-class="animated slideInDown"
    leave-active-class="animated fadeOut"
  >
    <q-card-section
      v-if="selectedAccountId != null"
      :key="selectedAccountId"
      class="row ap-process-body q-pa-none"
      style="scroll-direction: horizontal"
    >
      <div class="col-4 full-height inset-shadow-down">
        <AccountDetail />
      </div>
      <div class="col-8 full-height process-detail-bg relative-position">
        <div
          class="inset-shadow-down absolute-bottom pd__shadow_div z-top"
        ></div>

        <ProcessDetail />
      </div>
    </q-card-section>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';
import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'DetailBody',
  components: {},
  setup() {
    const Store = new StoreClass();
    const selectedAccountId = Store.getSelectedAccountId;

    return {
      selectedAccountId,
    };
  },
});
</script>

<style lang="scss" scoped></style>
