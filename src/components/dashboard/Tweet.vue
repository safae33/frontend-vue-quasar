<template>
  <div class="row cursor-pointer">
    <q-card flat class="col-12 tweeet-card">
      <q-card-section
        class="q-pa-none"
        :class="{ 'not-selected': !isSelected, selected: isSelected }"
      >
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
      <q-card-section
        class="q-pa-none"
        :class="{ 'not-selected': !isSelected, selected: isSelected }"
      >
        <q-item class="q-pa-none">
          <q-item-section class="row">
            <q-item-label lines="2" header class="q-pa-none">
              {{ tweet?.tweetText }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import Tweet from 'src/models/Tweet.model';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Tweet',
  // props: { tweet: Tweet },
  props: ['tweetElem', 'isSelected'],
  setup(props) {
    const tweet = new Tweet();
    Object.assign(tweet, props.tweetElem);

    return { tweet };
  },
});
</script>

<style lang="scss" scoped>
.tweeet-card {
  .q-card__section {
    transition: background-color 300ms linear;
  }
}
.selected {
  background-color: $myCol1;
}
.not-selected {
  background-color: $myCol;
}
</style>
