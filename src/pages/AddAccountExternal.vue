<template>
  <div class="row justify-center align-center items-center main">
    <div class="col-6 column items-center">Giriş yapın</div>

    <div class="col-6 form-div">
      <q-card class="card mitr-font">
        <q-card-section class="card-header" horizontal>
          <span class="v q-pa-sm">Giriş</span>
          <q-space />
          <div class="dot"></div>
        </q-card-section>
        <q-form @submit="onSubmit">
          <q-card-section
            class="v row q-gutter-y-lg justify-center items-baseline"
          >
            <q-input
              class="col-12"
              filled
              v-model="crediantials.username"
              label="Mail"
              hint="Kayıtlı mail adresiniz *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Kullanıcı adını giriniz',
              ]"
            />

            <q-input
              class="col-12"
              filled
              type="password"
              v-model="crediantials.password"
              label="Şifre"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Şifrenizi giriniz',
              ]"
            />
          </q-card-section>
          <q-card-actions>
            <q-toggle v-model="remember" label="Beni Hatırla" class="q-ml-lg" />
            <q-space />
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              class="q-mr-lg"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useQuasar } from 'quasar';
// import { useRoute } from 'vue-router';

import StoreClass from 'src/services/mockService';
import AxiosClass from 'src/services/axios';

export default defineComponent({
  name: 'AddAccountExternal',
  components: {},
  props: ['closeAddRow'],
  setup() {
    // const q = useQuasar();
    const Store = new StoreClass();
    const Api = new AxiosClass();
    // const Route = useRoute();

    // const taskId = Route.params.taskId;

    const crediantials = ref({ username: '', password: '' });
    const loadingMessage = ref('');
    const mail = ref('');
    const remember = ref(false);
    const isNewAccountInitializing = ref(false);

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

    return {
      mail,
      crediantials,
      onSubmit,
      remember,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 50%;
  height: 50%;
  border-radius: 10px;
  background-color: $teal-5;
}

.card-header {
  border-bottom: 5px solid $text-color;
}
.dot {
  height: 40px;
  width: 36px;
  background-color: $text-color;
}
.main {
  width: 100vw;
  height: 100vh;
}
</style>
