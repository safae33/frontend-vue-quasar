<template>
  <q-list>
    <div v-for="root in this.menu" :key="root.label">
      <q-item
        v-if="!root.expansion"
        clickable
        v-ripple
        :to="root.to"
        exact-active-class="exact"
        replace
      >
        <q-item-section avatar>
          <q-avatar
            :color="root.iconColor"
            :text-color="root.iconTextColor"
            :icon="root.icon"
          />
        </q-item-section>
        <q-item-section style="color: $text-color">{{
          root.label
        }}</q-item-section>
      </q-item>

      <q-expansion-item
        group="menu"
        v-if="root.expansion"
        :default-opened="root.default"
        :icon="root.icon"
        :label="root.label"
        dense-toggle
      >
        <q-item
          v-for="item in root.items"
          :key="item.label"
          v-ripple
          clickable
          :to="item.to"
          exact-active-class="exact"
        >
          <q-item-section avatar> </q-item-section>
          <q-item-section class="text-whitesmoke">{{
            item.label
          }}</q-item-section>
        </q-item>
      </q-expansion-item>
    </div>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue';
import json from 'src/config/menu.json';

export default defineComponent({
  name: 'Menu',
  setup() {
    // const menu = ref(json.menu);
    return { menu: json.menu };
  },
});
</script>

<style lang="scss">
.exact {
  border-left: 5px solid $primary !important;
  color: $primary !important;
}
.q-item {
  border-left: 5px solid transparent;
  color: $text-color;
}
.q-item:hover {
  border-left: 5px solid #eff4fa;
}
.q-expansion-item--expanded {
  .q-item__section {
    color: #8db8e2 !important;
  }
}
</style>
