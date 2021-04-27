<template>
  <q-card class="account-card mitr-font fit" flat>
    <q-card-section class="card-header" horizontal>
      <span class="v q-pa-sm">Giriş</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-form>
      <q-card-section class="v row q-gutter-y-lg justify-center items-baseline">
        <q-input
          class="col-12"
          filled
          v-model="username"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          class="col-12"
          filled
          type="number"
          v-model="password"
          label="Your age *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />
      </q-card-section>
      <q-card-actions class="v count-text row">
        <q-toggle v-model="remember" label="Beni Hatırla" class="q-ml-lg" />
        <q-space />
        <q-btn label="Submit" type="submit" color="primary" class="q-mr-lg" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref(null);
    const password = ref(null);
    const remember = ref(false);
    return { remember, username, password };
  },
});
</script>
<style lang="scss">
.account-card {
  transform: skew(-5deg);
  margin: 24px;
  border-radius: 10px;
  background-color: #f5f5f5;
}
.v {
  transform: skew(5deg);
}
.card-header {
  border-bottom: 5px solid $text-color;
}
.dot {
  height: 40px;
  width: 36px;
  background-color: $text-color;
}
</style>
