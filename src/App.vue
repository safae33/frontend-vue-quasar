<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'App',
  setup() {
    const Store = new StoreClass();

    onMounted(() => {
      Store.initialize();
    });
  },
});
</script>
