<template>
  <div class="relative-position column items-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md form column items-center justify-center q-py-md"
    >
      <q-input
        filled
        v-model="username"
        prefix="@"
        label="Eklenecek Twitter Hesabı"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <span class="q-ma-none"
        >Zorunlu değildir. Girilirse gönderilen mail içeriği daha detaylı
        olacaktır.</span
      >
      <q-input
        filled
        v-model="mail"
        label="Hedef Mail Adresi"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <span class="q-ma-none"
        >Giriş yapacak kişinin mail adresi. Yazılan adrese hesabını sizin
        sisteminize eklemesi için bir link gönderilecektir.</span
      >

      <div>
        <q-btn label="Giriş Yap" type="submit" color="primary" />
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
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'AddAccountExternal',
  components: {},
  props: ['closeAddRow'],
  setup() {
    const q = useQuasar();

    const username = ref('');
    const mail = ref('');

    return {
      username,
      mail,
      onSubmit() {
        q.notify({
          type: 'positive',
          message:
            '@' +
            username.value +
            ' hesabına giriş yapması için ' +
            mail.value +
            ' adresine link gönderildi.',
          timeout: 800,
          position: 'top-right',
        });
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
