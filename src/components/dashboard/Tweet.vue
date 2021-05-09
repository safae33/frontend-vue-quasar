<template>
  <q-card
    flat
    class="tweeet-card relative-position q-pl-xs bg-transparent"
    :class="{ 'cursor-pointer': isRipple, 'bg-myCol1': !isRipple }"
    v-ripple:primary="isRipple"
  >
    <q-card-section class="q-pa-none">
      <q-item class="q-mx-none no-border q-pr-xs">
        <q-item-section avatar>
          <q-avatar>
            <img :src="tweet.account.profilePicUrl + '1' + tweet.tweetUrl" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ tweet.account.name }}</q-item-label>
          <q-item-label caption lines="1">
            <span class="text-weight-bold">{{ tweet.account.username }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side
          ><q-icon name="fab fa-twitter-square" color="blue" size="md"
        /></q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="q-pa-none q-pl-xs">
      <q-item class="q-pa-none">
        <q-item-section class="row">
          <q-item-label lines="2" header class="q-pa-none">
            {{ tweet.tweetText }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';

import Tweet from 'src/models/Tweet.model';
import StoreClass from 'src/services/mockService';
export default defineComponent({
  name: 'Tweet',
  props: ['tweetIndex', 'tweetObject', 'isRipple'],
  setup(props) {
    const Store = new StoreClass();
    let tweet: ComputedRef<Tweet>;
    if (props.tweetObject != undefined) {
      tweet = computed(() => Object.assign(new Tweet(), props.tweetObject));
    } else {
      tweet = computed(() => Store.getTweets.value[props.tweetIndex]);
    }

    return { tweet };
  },
});
</script>

<style lang="scss" scoped>
.tweeet-card {
  transition: background-color 300ms linear;
}
.tweeet-card:hover {
  background-color: $myCol1 !important;
}
.bg-myCol1 {
  background-color: $myCol1 !important;
}
</style>
