<template>
  <q-card
    class="account-card mitr-font fit"
    :class="{ shadow: isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    flat
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
      <q-icon name="far fa-check-circle" class="q-pr-md" />

      <!-- v: vertical. textlerde eğim olmaması için düzeltme. -->
    </q-card-section>
    <q-card-actions class="v count-text"
      ><span class="q-pl-sm">Kayıtlı İşlem Sayısı</span> <q-space />
      <transition appear enter-active-class="animated bounceIn">
        <q-btn
          color="primary"
          icon="mdi-format-list-bulleted-square"
          flat
          label="İşlemlere git"
        />
      </transition>
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
<style lang="scss" scoped>
.shadow {
  box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%), 0 12px 17px 2px rgb(0 0 0 / 14%),
    0 5px 22px 4px rgb(0 0 0 / 12%);
}
.account-card {
  border-radius: 10px;
  background-color: #f5f5f5;
}
.card-header {
  border-bottom: 5px solid $text-color;
  span {
    font-size: 20px;
  }
}
.dot {
  height: 51px;
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
