<template>
  <div class="row">
    <div
      v-for="account in accounts"
      :key="account.id"
      class="
        col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12
        q-pr-sm q-py-xs
        column
        items-center
      "
    >
      <q-card class="max-size">
        <q-card-section class="q-pa-none data">
          <q-item
            class="q-mx-none no-border q-px-xs"
            v-on="{
              click:
                !isWithAction && !delSelectMode
                  ? () => setSelectedAccountId(account.id)
                  : null,
            }"
            :clickable="!isWithAction && !delSelectMode"
            v-ripple:primary="!isWithAction && !delSelectMode"
            :class="{ selectedAccount: isSelectedAccount(account.id) }"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="account.profilePicUrl + account.id" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="account-info">
              <q-item-label lines="1">{{ account.name }}</q-item-label>
              <q-item-label caption lines="1">
                <span class="text-weight-bold">{{ account.username }}</span>
              </q-item-label>
            </q-item-section>
            <transition
              mode="out-in"
              appear
              enter-active-class="animated bounceIn"
              leave-active-class="animated bounceOut"
            >
              <q-item-section v-if="delSelectMode" top side>
                <q-checkbox
                  v-model="delSelectedAccountIdArr"
                  :val="account.id"
                  color="negative"
                  class="pulse-negative"
                />
              </q-item-section>
              <q-item-section v-else top side class="twitter-icon"
                ><q-icon name="fab fa-twitter-square" size="md"
              /></q-item-section>
            </transition>
          </q-item>
        </q-card-section>
        <q-card-actions v-if="isWithAction" class="row q-pa-none action">
          <div class="col-6 btn-shadow">
            <q-btn
              :class="{
                like: account.actions[0].like,
                not: !account.actions[0].like,
              }"
              icon="fas fa-heart"
              label="Beğen"
              class="fit"
              @click="toggleLike(account.id)"
            />
          </div>
          <div class="col-6 btn-shadow">
            <q-btn
              :class="{
                retweet: account.actions[0].retweet,
                not: !account.actions[0].retweet,
              }"
              icon="fas fa-retweet"
              label="Retweet"
              class="fit"
              @click="toggleRetweet(account.id)"
            />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import StoreClass from 'src/services/mockService';
import Account from 'src/models/Account.model';

export default defineComponent({
  name: 'Account',
  props: ['accountElem', 'isWithAction'],
  setup(props) {
    const Store = new StoreClass();
    const accounts = computed(() => {
      if (props.accountElem.length != 0) {
        const accounts_: Account[] = [];
        props.accountElem.forEach((propAccount: Account) => {
          const temp: Account = Object.assign(new Account(), propAccount);
          temp.actions = temp.actions.filter(
            (action) =>
              action.tweetGroupId == Store.getSelectedTweetGroupId.value
          );
          accounts_.push(temp);
        });

        return accounts_;
      } else return [];
    });
    const isSelectedAccount = (id: number) =>
      Store.getSelectedAccountId.value == id;
    function setSelectedAccountId(id: number) {
      if (!isSelectedAccount(id)) {
        // Store.setSelectedAccountId(null);
        Store.setSelectedAccountId(id);
        // setTimeout(() => Store.setSelectedAccountId(id), 300);
      }
    }
    const toggleLike = (id: number) => Store.toggleLike(id);
    const toggleRetweet = (id: number) => Store.toggleRetweet(id);

    const delSelectMode = Store.getDelSelectMode;

    const delSelectedAccountIdArr = computed({
      get() {
        return Store.getDelSelectedAccountIdArr.value;
      },
      set(val: number[]) {
        Store.setDelSelectedAccountIdArr(val);
      },
    });

    return {
      toggleLike,
      toggleRetweet,
      accounts,
      isSelectedAccount,
      setSelectedAccountId,
      delSelectMode,
      delSelectedAccountIdArr,
    };
  },
});
</script>

<style lang="scss" scoped>
.twitter-icon {
  .q-icon {
    color: $twitter-blue;
  }
}
.account-info {
  font-size: 1.2rem;
}
.selectedAccount {
  transition: background-color 200ms linear;
  background-color: $myCol1;
}
.action {
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
.pulse-negative {
  box-shadow: 0 0 0 rgb(193, 0, 23, 1);
  border-radius: 10px;
  animation: pulse-negative 1s infinite;
  animation-delay: 400ms;
}
@-webkit-keyframes pulse-negative {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(193, 0, 23);
  }
  70% {
    -webkit-box-shadow: 0 0 0 2px rgba(193, 0, 23, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}
@keyframes pulse-negative {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(193, 0, 23);
    box-shadow: 0 0 0 0 rgba(193, 0, 23);
  }
  70% {
    -moz-box-shadow: 0 0 0 2px rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 2px rgba(193, 0, 23, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}
</style>
