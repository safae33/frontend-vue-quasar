<template>
  <div class="row main cursor-pointer">
    <q-card flat class="col-12">
      <q-card-section class="q-pa-none data">
        <q-item class="q-mx-none no-border q-pr-xs">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://picsum.photos/seed/picsum/300/300" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Hesap İsmi Buraya {{ name }}</q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-bold">@kullaniciadi</span>
            </q-item-label>
          </q-item-section>
          <q-item-section top side
            ><q-icon name="fab fa-twitter-square" color="blue" size="md"
          /></q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions class="q-pa-none">
        <q-item class="q-pa-none">
          <q-item-section class="row">
            <q-item-label lines="2" header class="q-pa-none">
              "Bu bir örnek tweet mesajı9 ol tweet mesajı9 olmak üzer tweet
              mesajı9 olmak üzer tweet mesajı9 olmak üzer tweet mesajı9 olmak
              üzermak üzerdir"
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-actions>
    </q-card>
    <!-- <div class="col-2 column justify-center items-center">
      <div class="ball" />
      <div class="line" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Tweet',
  props: { name: String },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.ball {
  width: 35%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: $text-color;
}
.main {
  border: $text-color solid 2px;
  border-radius: 8px 0 0 8px;
}
</style>
