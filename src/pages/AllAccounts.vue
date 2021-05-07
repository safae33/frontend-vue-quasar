<template>
  <q-page>
    <q-card class="accounts-panel mitr-font" flat>
      <!-- accounts detail header -->
      <q-card-section class="row ap-header q-pa-none">
        <span class="q-pa-sm">Hesap Yönetim Paneli</span>
        <q-space />
        <div class="dot"></div>
      </q-card-section>
      <!-- accounts util row -->
      <q-card-section
        class="ap-accounts-util-row q-pa-none q-pr-xs row align-between justify-between"
      >
        <q-input
          class="col-4 q-pa-none q-px-sm"
          type="text"
          label="Ara"
          clear-icon="fas fa-times"
          clearable
          v-model="accountsFilterValue"
        />

        <transition
          mode="out-in"
          appear
          enter-active-class="animated bounceIn"
          leave-active-class="animated bounceOut"
        >
          <q-btn
            v-if="!delSelectMode"
            class="offset-4 col-2"
            icon="fas fa-trash"
            color="negative"
            label="Hesap Sil"
            flat
            @click="enableDelSelectMode"
          />
          <q-btn
            v-else
            class="offset-4 col-2 text-weight-bolder pulse-negative-button"
            icon="fas fa-trash"
            color="negative"
            label="Seçilenleri Sil"
            push
            @click="disableDelSelectMode"
          />
        </transition>

        <q-btn
          class="col-2 newAccountButton"
          icon="fas fa-user-plus"
          label="Hesap Ekle"
          icon-right="fab fa-twitter-square"
          flat
        >
          <q-menu fit auto-close>
            <q-list>
              <q-item
                clickable
                v-ripple:primary
                @click="addSelect = 'internal'"
              >
                <q-item-section>Sayfa İçi Ekle</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple:primary
                @click="addSelect = 'external'"
              >
                <q-item-section>Mail Gönderme</q-item-section>
              </q-item>
            </q-list></q-menu
          >
        </q-btn>
      </q-card-section>
      <!-- add account row -->
      <q-card-section
        class="ap-accounts-add-account q-pa-none q-pr-xs full-width row align-center justify-center"
        :class="{ 'ap-accounts-add-account__max_height': addSelect != '' }"
      >
        <transition
          mode="out-in"
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="addSelect == 'internal'">
            <AddAccountInternal :closeAddRow="closeAddRow" class="fit" />
          </div>
          <div v-else-if="addSelect == 'external'"></div>
          <div v-else></div>
        </transition>
      </q-card-section>
      <!-- accounts body -->
      <q-card-section
        :class="{ deleteMode: delSelectMode }"
        class="ap-accounts full-width q-pa-none"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="account-scroll fit q-pl-xs q-pr-sm"
          ref="accountsScroll"
          id="accounts-scroll-area"
          visible
        >
          <q-virtual-scroll
            scroll-target="#accounts-scroll-area > .scroll"
            :virtual-scroll-item-size="108"
            :items="accounts"
            id="accounts-virtual-scroll"
          >
            <template v-slot="{ item, index }">
              <Account :accountElem="item" :isWithAction="false" :key="index" />
            </template>
          </q-virtual-scroll>
        </q-scroll-area>
      </q-card-section>

      <!-- process detail header -->
      <q-card-section
        class="ap-process-header non-selectable q-pa-none inset-shadow-down"
      >
        <div
          class="row items-between full-width"
          :class="{ pulse: selectedAccountId == null && !delSelectMode }"
        >
          <div class="col-1 q-pl-sm">
            <q-icon
              :class="{ selectedIcon: selectedAccountId != null }"
              name="fas fa-arrow-circle-up"
            />
          </div>

          <div class="q-pa-sm col-10 column items-center justify-center">
            <transition
              mode="out-in"
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <span :key="selectedText">{{ selectedText }}</span>
            </transition>
          </div>

          <div class="col-1 q-pr-sm">
            <q-icon
              :class="{ selectedIcon: selectedAccountId != null }"
              name="fas fa-arrow-circle-up"
            />
          </div>
        </div>
      </q-card-section>

      <!-- ac&process detail body -->
      <transition
        appear
        mode="out-in"
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
      >
        <q-card-section
          v-if="selectedAccountId != null"
          :key="selectedAccountId"
          class="row ap-process-body q-pa-none inset-shadow-down"
          style="scroll-direction: horizontal"
        >
          <div class="col-4 full-height"><AccountDetail /></div>
          <div class="col-8 full-height process-detail-bg">
            <ProcessDetail />
          </div>
        </q-card-section>
      </transition>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useQuasar } from 'quasar';

import StoreClass from 'src/services/mockService';
import Account from 'src/components/dashboard/Account.vue';
import AccountDetail from 'src/components/accounts/AccountDetail.vue';
import ProcessDetail from 'src/components/accounts/ProcessDetail.vue';
import AddAccountInternal from 'src/components/accounts/AddAccountInternal.vue';

import AccountModel from 'src/models/Account.model';
export default defineComponent({
  name: 'AllAccounts',
  components: { Account, AccountDetail, ProcessDetail, AddAccountInternal },
  setup() {
    const Store = new StoreClass();
    const q = useQuasar();
    const thumbStyle = reactive({
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      width: '10px',
      opacity: 0.75,
    });
    const barStyle = reactive({
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '14px',
      opacity: 0.2,
    });

    function slice(size: number, filter: string) {
      let oldAccounts = Store.getAccounts.value;
      if (filter != '' && filter != null)
        oldAccounts = oldAccounts.filter((account) => {
          return (
            account.name.includes(filter) || account.username.includes(filter)
          );
        });
      const accounts: [AccountModel[]] = [[]];
      for (let index = 0; index < oldAccounts.length; index += size) {
        const sliced = oldAccounts.slice(index, index + size);
        accounts.push(sliced);
      }
      if (accounts[-1] == []) accounts.pop();
      return accounts;
    }
    const accounts = computed(() => {
      const filter = accountsFilterValue.value;
      if (q.screen.name == 'xl' || q.screen.name == 'lg') {
        return slice(3, filter);
      } else if (q.screen.name == 'md' || q.screen.name == 'sm') {
        return slice(2, filter);
      } else {
        return slice(1, filter);
      }
    });
    const accountsFilterValue = ref('');
    const selectedAccountId = Store.getSelectedAccountId;
    const delSelectMode = Store.getDelSelectMode;
    const delSelectModeArray = Store.getDelSelectedAccountIdArr;
    const selectedText = computed(() => {
      if (delSelectMode.value) return 'Lütfen silme işlemini tamamlayın.';
      else {
        if (selectedAccountId.value == null)
          return 'İşlem detayını görüntülemek için hesap seçmelisiniz.';
        else return 'Hesap İşlem Detayı';
      }
    });

    function enableDelSelectMode() {
      Store.setSelectedAccountId(null);
      Store.setDelSelectMode(true);
      q.notify({
        type: 'negative',
        message: 'Silme modu aktif.',
        timeout: 800,
        position: 'top-right',
      });
    }

    function disableDelSelectMode() {
      if (!delSelectModeArray.value.length) {
        Store.setDelSelectMode(false);

        setTimeout(
          () =>
            q.notify({
              type: 'positive',
              message: 'Hiçbir hesap seçilmedi.',
              timeout: 800,
              position: 'top-right',
            }),
          300
        );
        return;
      }
      q.dialog({
        title: 'Emin misiniz?',
        message:
          'Seçtiğiniz ' +
          delSelectModeArray.value.length.toString() +
          ' adet hesap silinecektir. Tekrar eklemek için kullanıcıların giriş yapması gerekecektir. Emin misiniz?',
        ok: {
          label: 'Onayla',
          push: true,
        },
        cancel: {
          label: 'İptal',
          push: true,
          color: 'negative',
        },
        persistent: true,
      })
        .onOk(() => {
          Store.delSelectedAccounts();
          Store.setDelSelectMode(false);
          Store.setDelSelectedAccountIdArr([]);
          setTimeout(
            () =>
              q.notify({
                type: 'positive',
                message: 'Seçilen hesaplan silindi.',
                timeout: 800,
                position: 'top-right',
              }),
            1000
          );
        })
        .onCancel(() => {
          Store.setDelSelectMode(false);
          Store.setDelSelectedAccountIdArr([]);
          setTimeout(
            () =>
              q.notify({
                type: 'info',
                message: 'İşlem iptal edildi. Seçimler kaldırıldı.',
                timeout: 800,
                position: 'top-right',
              }),
            1000
          );
        });
    }

    const addSelect = ref('');
    return {
      addSelect,
      delSelectMode,
      disableDelSelectMode,
      selectedAccountId,
      accounts,
      thumbStyle,
      barStyle,
      accountsFilterValue,
      selectedText,
      closeAddRow() {
        console.log('ehuehueheu');
        addSelect.value = '';
      },
      enableDelSelectMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.deleteMode {
  border: $negative solid 2px !important;
  @extend .pulse-negative;
  margin-bottom: 20px;
  margin-top: 20px;
}
.process-detail-bg {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='900' height='350' preserveAspectRatio='none' viewBox='0 0 900 350'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1024%26quot%3b)' fill='none'%3e%3crect width='900' height='350' x='0' y='0' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/rect%3e%3cpath d='M351.92 408.06C432.08 406.72 492.47 310.71 656.04 306.33 819.61 301.95 876.53 169.64 960.16 166.33' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M447.72 404.67C499.61 401.84 480.44 314.3 632.07 308.58 783.7 302.86 900.92 157.63 1000.76 154.58' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M586.05 373.62C668.03 351.31 675.25 140.78 816.5 123.87 957.75 106.96 985.64 41.17 1046.95 39.87' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M271.78 376.76C387.73 367.96 467.55 139.47 671.36 138.67 875.17 137.87 969.21 215.32 1070.94 215.67' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M447.08 354.03C509.69 346.28 480.28 212.77 650.4 204.54 820.52 196.31 948.36 53.09 1057.03 50.54' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1024'%3e%3crect width='900' height='350' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}

.selectedIcon {
  transition: transform 300ms linear;
  transform: rotate(180deg);
}
.pulse {
  box-shadow: 0 0 0 rgba(4, 61, 117, 0.4);
  border-radius: 6px;
  animation: pulse 2s infinite;
}
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(4, 61, 117);
  }
  70% {
    -webkit-box-shadow: 0 0 0 20px rgba(4, 61, 117, 23);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(4, 61, 117);
    box-shadow: 0 0 0 0 rgba(4, 61, 117);
  }
  70% {
    -moz-box-shadow: 0 0 0 20px rgba(4, 61, 117, 0);
    box-shadow: 0 0 0 20px rgba(4, 61, 117, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
    box-shadow: 0 0 0 0 rgba(4, 61, 117, 0);
  }
}

.pulse-negative {
  box-shadow: 0 0 0 rgb(193, 0, 23, 1);
  border-radius: 10px;
  animation: pulse-negative 4s infinite;
}
//bu demek oluyor ki; 2sn işlemi yap 2 sn bekle.
@-webkit-keyframes pulse-negative {
  35% {
    //70
    -webkit-box-shadow: 0 0 0 20px rgba(193, 0, 23, 0);
  }
  40%,
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}
@keyframes pulse-negative {
  35% {
    -moz-box-shadow: 0 0 0 20px rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 20px rgba(193, 0, 23, 0);
  }
  40%,
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}

.pulse-negative-button {
  box-shadow: 0 0 0 rgb(193, 0, 23, 1);
  border-radius: 10px;
  animation: pulse-negative-button 2s infinite;
}
@-webkit-keyframes pulse-negative-button {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(193, 0, 23);
  }
  70% {
    -webkit-box-shadow: 0 0 0 5px rgba(193, 0, 23, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}
@keyframes pulse-negative-button {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(193, 0, 23);
    box-shadow: 0 0 0 0 rgba(193, 0, 23);
  }
  70% {
    -moz-box-shadow: 0 0 0 5px rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 5px rgba(193, 0, 23, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
    box-shadow: 0 0 0 0 rgba(193, 0, 23, 0);
  }
}
.no-selected-text {
  transition: background-color 300ms linear;
  background-color: #000000a9;
  span,
  p {
    font-size: 16px;
    color: $myCol1 !important;
    font-size: 32px !important;
  }
  .q-icon {
    font-size: 100px !important;
    color: $myCol1 !important;
  }
}

.accounts-panel {
  transition: box-shadow 300ms linear;
  margin-left: auto;
  margin-right: auto;

  border-radius: 10px;

  .ap-header {
    border-bottom: 5px solid $text-color;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    span {
      font-size: 20px;
    }
    z-index: 2;
  }
  .ap-accounts-util-row {
    max-height: 56px;
    z-index: 2;
  }
  .ap-accounts-add-account {
    z-index: 1;
    max-height: 0;
    background-color: $myCol;
    border-left: white solid 5px;
    border-right: white solid 5px;
    transition: max-height 200ms linear;
  }
  .ap-accounts-add-account__max_height {
    max-height: 600px !important;
  }
  .ap-accounts {
    height: 400px;
    max-height: 515px;
    background-color: white;
    border: transparent solid 2px;
    border-radius: 10px;
    transition: border 300ms linear, margin 300ms linear;
    z-index: 1;
  }
  .ap-process-header {
    // color: $text-color;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1280' height='64' preserveAspectRatio='none' viewBox='0 0 1280 64'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1096%26quot%3b)' fill='none'%3e%3crect width='1280' height='64' x='0' y='0' fill='rgba(239%2c 244%2c 250%2c 1)'%3e%3c/rect%3e%3cpath d='M21 64L85 0L314.5 0L250.5 64z' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/path%3e%3cpath d='M228.20000000000002 64L292.20000000000005 0L476.70000000000005 0L412.70000000000005 64z' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/path%3e%3cpath d='M459.40000000000003 64L523.4000000000001 0L793.4000000000001 0L729.4000000000001 64z' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/path%3e%3cpath d='M662.6 64L726.6 0L1038.6 0L974.6 64z' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/path%3e%3cpath d='M1250 64L1186 0L1024 0L1088 64z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M1027.8 64L963.8 0L824.3 0L888.3 64z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M827.5999999999999 64L763.5999999999999 0L649.5999999999999 0L713.5999999999999 64z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M630.4 64L566.4 0L446.4 0L510.4 64z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M1231.8621422918748 64L1280 15.862142291874683L1280 64z' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/path%3e%3cpath d='M0 64L48.13785770812532 64L 0 15.862142291874683z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1096'%3e%3crect width='1280' height='64' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1097'%3e%3cstop stop-color='rgba(204%2c 224%2c 248%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(204%2c 224%2c 248%2c 1)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1098'%3e%3cstop stop-color='rgba(204%2c 224%2c 248%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(204%2c 224%2c 248%2c 1)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    z-index: 1;
    span {
      color: $text-color;
      font-size: 36px;
    }
    border-top: $text-color solid 2px;
    border-bottom: $text-color solid 2px;
    .q-icon {
      font-size: 65px;
      color: $text-color;
    }
  }
  .ap-process-body {
    height: 350px;
  }
  .dot {
    height: 51px;
    width: 36px;
    border-top-right-radius: 10px;
    background-color: $text-color;
  }
}
.newAccountButton {
  color: $twitter-blue;
}
</style>
