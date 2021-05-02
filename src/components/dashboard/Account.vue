<template>
  <div class="row">
    <div
      v-for="(item, index) in accountElem"
      :key="index"
      class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pr-sm q-py-sm column items-center"
    >
      <q-card class="max-size">
        <q-card-section class="q-pa-none data">
          <q-item class="q-mx-none no-border q-px-xs">
            <q-item-section avatar>
              <q-avatar>
                <img :src="item.profilePicUrl + item.id" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ item.name }}</q-item-label>
              <q-item-label caption lines="1">
                <span class="text-weight-bold">{{ item.username }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top side style="padding-left:4px; !important"
              ><q-icon name="fab fa-twitter-square" color="blue" size="md"
            /></q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions class="row q-pa-none action">
          <div class="col-6 btn-shadow">
            <q-btn
              :class="{ like: item.like, not: !item.like }"
              icon="fas fa-heart"
              label="Beğen"
              class="fit"
              @click="toggleLike(item.id)"
            />
          </div>
          <div class="col-6 btn-shadow">
            <q-btn
              :class="{ retweet: item.retweet, not: !item.retweet }"
              icon="fas fa-retweet"
              label="Retweet"
              class="fit"
              @click="toggleRetweet(item.id)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'Account',
  props: ['accountElem'],
  setup() {
    const Store = new StoreClass();
    //ref içindeki value kullanmak gerekince arrow function ile yapmak gerekiyor.
    // const account = (): Account =>
    //   Object.assign(new Account(), props.accountElem);
    // Store.setAccountId(account().id);

    const toggleLike = (id: number) => Store.toggleLike(id);
    const toggleRetweet = (id: number) => Store.toggleRetweet(id);

    // onMounted(() => {
    //   document.getElementById('qvs_1')?.classList.add('row');
    // });
    // onUpdated(() => {
    //   document.getElementById('qvs_1')?.classList.add('row');
    // });

    return { toggleLike, toggleRetweet };
  },
});
</script>

<style lang="scss" scoped>
.action {
  div {
  }
  .q-btn {
    transition: border 300ms linear, box-shadow 300ms linear, color 300ms linear;
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

.btn-shadow {
  box-shadow: 0 -7px 9px -7px rgb(0 0 0 / 70%) inset !important;
}
.like {
  // background-color: $like;
  color: $like;
  border: $like solid 1px;
  box-shadow: 0 -7px 9px -7px $like inset !important;
}
.retweet {
  // background-color: $retweet;
  color: $retweet;
  border: $retweet solid 1px;
  box-shadow: 0 -7px 9px -7px $retweet inset !important;
}
.not {
  background-color: white;
  color: $text-color;
  box-shadow: 0 -7px 9px -7px $text-color inset !important;
}
</style>
