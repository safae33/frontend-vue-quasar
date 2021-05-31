<template>
  <q-card class="account-card mitr-font fit">
    <q-card-section class="card-header" horizontal>
      <span class="v q-pa-sm">Giriş</span>
      <q-space />
      <div class="dot"></div>
    </q-card-section>
    <q-form>
      <q-card-section class="v row q-gutter-y-lg justify-center items-baseline">
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
          @click="login()"
          color="primary"
          class="q-mr-lg"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AxiosClass from 'src/services/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'Login',
  setup() {
    const Api = new AxiosClass();
    const router = useRouter();
    const q = useQuasar();
    const crediantials = ref({ username: '', password: '' });
    const remember = ref(false);
    function login() {
      q.loading.show({
        message: 'Yükleniyor...',
      });
      Api.login(crediantials.value)
        .then(() => {
          q.loading.hide();
          router.replace('/');
        })
        .catch(() => {
          q.loading.hide();
          q.notify({
            type: 'negative',
            message: 'API çalışmıyor.',
            position: 'top-right',
          });
        });
    }
    return { remember, crediantials, login };
  },
});
</script>
<style lang="scss">
.account-card {
  margin: 24px;
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
</style>
