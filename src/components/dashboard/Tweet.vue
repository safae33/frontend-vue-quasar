<template>
  <div class="row main cursor-pointer">
    <q-card flat class="col-12">
      <q-card-section class="q-pa-none data">
        <q-item class="q-mx-none no-border q-pr-xs">
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="tweet?.account.profilePicUrl + '12' + tweet?.account.id"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ tweet?.account.name }}</q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-bold">{{
                tweet?.account.username
              }}</span>
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
              {{ tweet?.tweetText }}
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
import Tweet from 'src/models/Tweet.model';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Tweet',
  // props: { tweet: Tweet },
  props: ['tweetElem'],
  setup(props) {
    const tweet = new Tweet();
    Object.assign(tweet, props.tweetElem);

    return { tweet };
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
