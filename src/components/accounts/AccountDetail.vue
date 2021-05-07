<template>
  <q-card class="detail-card full-height inset-shadow-down" flat>
    <q-card-section
      class="dc-tweet-info q-pb-none"
      v-for="account in account()"
      :key="account.id"
    >
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
    <q-card-section class="dc-process-info row">
      <div class="col-6">
        <div class="row justify-center align-center">Tamamlanmış İşlem</div>
        <div class="row justify-center align-center aldrich-font text-h2">
          22
        </div>
      </div>
      <div class="col-6">
        <div class="row justify-center align-center">Aktif İşlem</div>
        <div class="row justify-center align-center aldrich-font text-h2">
          2
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StoreClass from 'src/services/mockService';
export default defineComponent({
  name: 'AccountDetail',
  components: {},
  setup() {
    const Store = new StoreClass();

    const account = () =>
      Store.getAccounts.value.filter(
        (account) => account.id == Store.getSelectedAccountId.value
      );
    return { account };
  },
});
</script>

<style lang="scss" scoped>
.detail-card {
  font-size: 1.3rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='426' height='350' preserveAspectRatio='none' viewBox='0 0 426 350'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1059%26quot%3b)' fill='none'%3e%3crect width='426' height='350' x='0' y='0' fill='rgba(255%2c 255%2c 255%2c 1)'%3e%3c/rect%3e%3cpath d='M -6.3110591936915625%2c194 C 36.29%2c185 121.49%2c151.6 206.68894080630844%2c149 C 291.89%2c146.4 334.49%2c185 419.68894080630844%2c181 C 504.89%2c177 631.43%2c128.4 632.6889408063084%2c129 C 633.95%2c129.6 467.34%2c173 426%2c184' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -229.42323313286863%2c135 C -186.82%2c145.6 -101.62%2c184.8 -16.423233132868635%2c188 C 68.78%2c191.2 111.38%2c143.8 196.57676686713137%2c151 C 281.78%2c158.2 363.69%2c230 409.57676686713137%2c224 C 455.46%2c218 422.72%2c141.6 426%2c121' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -403.869932215225%2c220 C -361.27%2c202 -276.07%2c138 -190.869932215225%2c130 C -105.67%2c122 -63.07%2c179.2 22.130067784775008%2c180 C 107.33%2c180.8 154.36%2c133.2 235.130067784775%2c134 C 315.9%2c134.8 387.83%2c174 426%2c184' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -239.93763384474133%2c196 C -197.34%2c183.6 -112.14%2c127.6 -26.93763384474132%2c134 C 58.26%2c140.4 100.86%2c223.6 186.06236615525867%2c228 C 271.26%2c232.4 351.07%2c157.2 399.0623661552587%2c156 C 447.05%2c154.8 420.61%2c208.8 426%2c222' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -356.89294357018764%2c140 C -314.29%2c149 -229.09%2c188 -143.89294357018767%2c185 C -58.69%2c182 -16.09%2c121 69.10705642981233%2c125 C 154.31%2c129 210.73%2c201.4 282.10705642981236%2c205 C 353.49%2c208.6 397.22%2c155.4 426%2c143' stroke='rgba(239%2c 244%2c 250%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1059'%3e%3crect width='426' height='350' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
.dc-tweet-info {
  background-color: $myCol1;
}
</style>
