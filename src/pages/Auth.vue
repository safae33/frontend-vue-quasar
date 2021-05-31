<template>
  <q-page class="row justify-center items-center">
    <Login style="max-width: 440px" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from 'src/components/auth/Login.vue';

export default defineComponent({
  name: 'Auth',
  components: { Login },
  setup() {
    return {};
  },
});
</script>
<style lang="scss"></style>
