<template>
  <q-card flat class="max-size">
    <q-card-section class="q-pa-none data">
      <q-item class="q-mx-none no-border">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://picsum.photos/seed/picsum/300/300" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Hesap İsmi Buraya</q-item-label>
          <q-item-label caption lines="1">
            <span class="text-weight-bold">@kullaniciadi</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-actions v-if="withAction" class="row q-pa-none action">
      <div class="col-6 inset-shadow-down" :class="likeComputed">
        <q-btn
          icon="fas fa-heart"
          label="Beğen"
          class="fit text-blue-1"
          @click="like = !like"
        />
      </div>
      <div class="col-6 inset-shadow-down" :class="retweetComputed">
        <q-btn
          icon="fas fa-retweet"
          label="Retweet"
          class="fit text-blue-1 q-px-none"
          @click="retweet = !retweet"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
export default defineComponent({
  name: 'Account',
  props: { withAction: Boolean },
  setup() {
    const like = ref(false);
    const retweet = ref(false);
    const likeComputed = computed(() => {
      if (like.value) return 'like';
      else return 'not';
    });
    const retweetComputed = computed(() => {
      if (retweet.value) return 'retweet';
      else return 'not';
    });

    return { like, retweet, likeComputed, retweetComputed };
  },
});
</script>

<style lang="scss" scoped>
.action {
  div {
    transition: background-color 500ms linear;
  }
  .q-btn {
    padding: 0;
  }
}
.img {
  border-radius: 50%;
}
.max-size {
  width: 100%;

  height: auto;
}
.data {
  @extend .max-size;
  background-color: $myCol;
}
.shadow {
  -moz-box-shadow: inset 0 0 10px #708daa;
  -webkit-box-shadow: inset 0 0 10px #708daa;
  box-shadow: inset 0 0 10px #708daa;
}
.like {
  // @extend .shadow;
  background-color: $like;
}
.retweet {
  // @extend .shadow;
  background-color: $retweet;
}
.not {
  // @extend .shadow;
  background-color: grey;
}
</style>
