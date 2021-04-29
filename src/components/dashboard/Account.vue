<template>
  <q-card class="max-size">
    <q-card-section class="q-pa-none data">
      <q-item class="q-mx-none no-border q-px-xs">
        <q-item-section avatar>
          <q-avatar>
            <img :src="account.profilePicUrl + account.id" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ account.name }}</q-item-label>
          <q-item-label caption lines="1">
            <span class="text-weight-bold">{{ account.username }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side style="padding-left:4px; !important"
          ><q-icon name="fab fa-twitter-square" color="blue" size="md"
        /></q-item-section>
      </q-item>
    </q-card-section>
    <q-card-actions class="row q-pa-none action">
      <div class="col-6 inset-shadow-down">
        <q-btn
          :class="{ like: account.like, not: !account.like }"
          icon="fas fa-heart"
          label="Beğen"
          class="fit"
          @click="toggleLike"
        />
      </div>
      <div class="col-6 inset-shadow-down">
        <q-btn
          :class="{ retweet: account.retweet, not: !account.retweet }"
          icon="fas fa-retweet"
          label="Retweet"
          class="fit"
          @click="toggleRetweet"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StoreClass from 'src/services/mockService';
export default defineComponent({
  name: 'Account',
  props: ['accountId'],
  setup(props) {
    const Store = new StoreClass(props.accountId);

    const account = Store.getAccountById();
    const toggleLike = () => Store.toggleLike();
    const toggleRetweet = () => Store.toggleRetweet();
    return { account, toggleLike, toggleRetweet };
  },
});
</script>

<style lang="scss" scoped>
.action {
  div {
  }
  .q-btn {
    transition: background-color 300ms linear, color 300ms linear;
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
  background-color: $like;
  color: $myCol;
}
.retweet {
  background-color: $retweet;
  color: $myCol;
}
.not {
  background-color: whitesmoke;
  color: $text-color;
}
</style>
