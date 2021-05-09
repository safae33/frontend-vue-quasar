<template>
  <q-card
    flat
    class="account-card mitr-font fit"
    :class="{ shadow: isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <q-card-section class="card-header" horizontal>
      <span class="v q-pa-sm">Hesap Sayısı</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-card-section
      class="q-py-none v count-text aldrich-font row justify-center items-baseline"
    >
      {{ accountCount }}<span>/500</span><q-space />
      <q-icon name="fas fa-users" class="q-pr-md" />
      <!-- v: vertical. textlerde eğim olmaması için düzeltme. -->
    </q-card-section>
    <q-card-actions class="v count-text"
      ><span class="q-pl-sm">Kayıtlı Hesap Sayısı</span> <q-space />
      <transition appear enter-active-class="animated bounceIn">
        <q-btn
          color="primary"
          icon="mdi-format-list-bulleted-square"
          flat
          label="Hesaplara git"
          to="/accounts"
        />
      </transition>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'AccountCard',
  props: {
    accountCount: Number,
  },
  setup() {
    const isHovering = ref(false);
    return { isHovering };
  },
});
</script>
<style lang="scss">
.shadow {
  box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%), 0 12px 17px 2px rgb(0 0 0 / 14%),
    0 5px 22px 4px rgb(0 0 0 / 12%) !important;
}
.account-card {
  border-radius: 10px;
  background-color: white !important;
  transition: box-shadow 300ms linear;
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
