<template>
  <div class="relative-position column items-center">
    <!-- <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        disable
        filled
        v-model="username"
        label="Telefon, e-posta veya kullanıcı adı"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        disable
        filled
        v-model="password"
        type="password"
        label="Şifre"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your age',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]"
      />

      <div>
        <q-btn disable label="Giriş Yap" type="submit" color="primary" />
      </div>
      <span
        >Buraya girilenlere göre backsideda giriş yapmaya çalışmalıyım. giriş
        yapılırsa Account objesine gerekli veriler döndürürdüm. Ancak test için
        tek tek girilmesini istiyfcem aşağıda.</span
      >
    </q-form> -->

    <q-form
      @submit="onSubmit"
      class="q-gutter-md form column items-center justify-center q-py-md"
    >
      <q-input
        filled
        v-model="account.name"
        label="Hesap ismi"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="account.username"
        label="Hesap kullanıcı adı"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <q-btn
      class="absolute-top-right q-mr-sm q-mt-sm"
      color="negative"
      fab-mini
      icon="fas fa-times"
      @click="closeAddRow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useQuasar } from 'quasar';

import Account from 'src/models/Account.model';
import StoreClass from 'src/services/mockService';

export default defineComponent({
  name: 'AddAccountInternal',
  components: {},
  props: ['closeAddRow'],
  setup() {
    const Store = new StoreClass();
    const username = ref('');
    const password = ref('');

    const account = new Account();
    account.profilePicUrl = 'https://source.unsplash.com/random/200x200?sig=';
    account.id = Store.getAccounts.value.slice(-1)[0].id + 1;

    return {
      username,
      password,
      account,

      onSubmit() {
        Store.addActionsForNewAccountAndPushToAccounts(account);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  width: 600px;
  max-height: 600px;
}
</style>
