<template>
  <q-card
    class="account-card mitr-font fit"
    :class="{ 'shadow-12': isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <q-card-section class="card-header" horizontal>
      <span class="v q-pa-sm">İşlem Sayısı</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-card-section
      class="q-py-none v count-text aldrich-font row justify-center items-baseline"
    >
      261.814<span>/500.000</span><q-space />

      <!-- v: vertical. textlerde eğim olmaması için düzeltme. -->
    </q-card-section>
    <q-card-actions class="v count-text"
      ><span class="q-pl-sm">Kayıtlı İşlem Sayısı</span> <q-space />
      <q-btn
        color="primary"
        icon="mdi-format-list-bulleted-square"
        flat
        label="İşlemlere git"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ProcessCard',
  setup() {
    const isHovering = ref(false);
    return { isHovering };
  },
});
</script>
<style lang="scss">
.account-card {
  border-radius: 10px;
  background-color: #f5f5f5;
}
.card-header {
  border-bottom: 5px solid $text-color;
}
.dot {
  height: 40px;
  width: 36px;
  background-color: $text-color;
}
.count-text {
  color: $text-color;
  font-size: 64px;
  span,
  p {
    font-size: 16px;
    text-align: left;
  }
}
</style>
