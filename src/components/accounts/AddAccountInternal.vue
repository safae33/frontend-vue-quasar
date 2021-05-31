<template>
  <div class="relative-position column items-center fit">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md form column items-center justify-center q-py-md"
    >
      <q-input
        class="input"
        filled
        v-model="crediantials.username"
        label="Telefon, e-posta veya kullanıcı adı"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Boş Bırakılamaz']"
      />

      <q-input
        class="input"
        filled
        v-model="crediantials.password"
        type="password"
        label="Şifre"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Boş Bırakılamaz']"
      />

      <div>
        <q-btn label="Giriş Yap" type="submit" color="primary" />
      </div>
    </q-form>

    <!-- <q-form
      @submit="onSubmit"
      class="q-gutter-md form column items-center justify-center q-py-md"
    >
      <q-input
        filled
        v-model="name"
        label="Hesap ismi"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="username"
        label="Hesap kullanıcı adı"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Giriş Yap" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form> -->
    <q-btn
      class="absolute-top-right q-mr-sm q-mt-sm"
      color="negative"
      fab-mini
      icon="fas fa-times"
      @click="closeAddRow"
    />
    <q-inner-loading :showing="isNewAccountInitializing" color="primary">
      <q-spinner-hourglass color="teal-4" size="100px" />
      <span>Lütfen bekleyiniz.</span>
      <span>{{ loadingMessage }}</span>
    </q-inner-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import StoreClass from 'src/services/mockService';
import AxiosClass from 'src/services/axios';

export default defineComponent({
  name: 'AddAccountInternal',
  components: {},
  props: ['closeAddRow'],
  setup() {
    const Store = new StoreClass();
    const Api = new AxiosClass();

    const crediantials = ref({ username: '', password: '' });
    const loadingMessage = ref('');
    const isNewAccountInitializing = ref(false);

    // const account = new Account();
    // account.profilePicUrl = 'https://source.unsplash.com/random/200x200?sig=';
    // account.id = Store.getAccounts.value.slice(-1)[0].id + 1;
    // account.name = '';
    // account.username = '';

    async function onSubmit() {
      loadingMessage.value = '* Hesap bilgileri oluşturuluyor...';
      isNewAccountInitializing.value = true;
      await Api.add_new_account(crediantials.value).then(() => {
        loadingMessage.value = '* Hesaba Giriş yapılıyor...';
        var interval = setInterval(() => {
          Api.check_task_id_status(Store.getAddAccountTaskId.value).then(() => {
            if (Store.getAddAccountStatus.value == 'SUCCESS') {
              loadingMessage.value = '* Son işlemler yapılıyor...';
              isNewAccountInitializing.value = false;
              clearInterval(interval);
            }
          });
        }, 1500);
      });
    }

    // watch(Store.getSelectedAccountId, () => {
    //   if (Store.getSelectedAccountId != null)
    //     isNewAccountInitializing.value = false;
    // });

    return {
      onSubmit,
      loadingMessage,
      crediantials,
      isNewAccountInitializing,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-height: 35%;
}
.input {
  width: 40%;
}
</style>
