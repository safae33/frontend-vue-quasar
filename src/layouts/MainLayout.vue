<template>
  <q-layout view="lhh Lpr lff">
    <q-header class="mobile-only"
      ><q-btn
        class="fixed-top-left no-border no-border-radius"
        color="primary"
        icon="menu"
        @click="drawer = !drawer"
        style="transform: skew(-15deg); margin-left: -5px"
    /></q-header>
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      :mini-width="56"
      elevated
      :width="256"
    >
      <div
        class="row items-center justify-center content-center q-py-md"
        style="background-color: rgb(0, 76, 151)"
      >
        <div v-if="!miniState" class="col-10 q-pl-sm u-text-ellipsis">
          <span class="user-text">Safa Emre YILDIRIM</span>
        </div>
        <div :class="toggleButton" class="desktop-only">
          <q-btn
            flat
            dense
            round
            icon="menu"
            color="light-blue-1"
            aria-label="Menu"
            @click="toggleAlwaysNotMini()"
          />
        </div>
      </div>

      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        :style="menuScrollArea"
        class="scrollArea"
        @mouseenter="toggleMini()"
        @mouseleave="toggleMini()"
      >
        <Menu class="q-py-xs" />
      </q-scroll-area>
      <div
        class="column fixed-bottom"
        style="width: auto; height: 65px; background-color: #c5ddf3"
      ></div>
    </q-drawer>

    <q-page-container class="animated-bg-right">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import Menu from 'components/layout/Menu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { Menu },

  setup() {
    const drawer = ref(true);
    const alwaysNotMini = ref(false);
    const toggleButton = ref('');
    const menuScrollArea = ref('width: 56px;');
    const miniState = ref(true);

    const thumbStyle = reactive({
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      width: '5px',
      opacity: 0.75,
    });
    const barStyle = reactive({
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2,
    });
    const $q = useQuasar();

    onMounted(() => {
      if ($q.platform.is.mobile) drawer.value = false;
      if ($q.screen.name == 'md') miniState.value = true;
    });
    return {
      alwaysNotMini,
      drawer,
      menuScrollArea,
      miniState,
      toggleButton,
      toggleMini(): void {
        if (!alwaysNotMini.value) {
          miniState.value = !miniState.value;
          if (miniState.value) {
            toggleButton.value = '';
            menuScrollArea.value = 'width: 56px;';
          } else {
            toggleButton.value = 'col-2 q-pr-lg';
            menuScrollArea.value = 'width: 256px;';
          }
        }
      },
      pass(): void {
        return;
      },
      toggleAlwaysNotMini() {
        alwaysNotMini.value = !alwaysNotMini.value;
        miniState.value = !miniState.value;
        if (miniState.value) {
          toggleButton.value = '';
          menuScrollArea.value = 'width: 56px;';
        } else {
          toggleButton.value = 'col-2 q-pr-lg';
          menuScrollArea.value = 'width: 256px;';
        }
      },
      thumbStyle,
      barStyle,
    };
  },
});
</script>

<style lang="scss">
.animated-bg-right {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1859%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%23SvgjsLinearGradient1860)'%3e%3c/rect%3e%3cpath d='M171.7 687.46 a297.58 297.58 0 1 0 595.16 0 a297.58 297.58 0 1 0 -595.16 0z' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M874.6811805463972 215.07272526056892L1048.6655874513135 161.88035397434794 995.4732161650925-12.104052930568315 821.4888092601763 41.08831835565266z' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1682.8270316254561 806.5073552080056L1857.864068971797 958.6647303998233 2010.0214441636147 783.6276930534824 1834.9844068172738 631.4703178616647z' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M808.1124000730024 379.13045694917906L842.2661795923129 554.8364205358125 1017.9721431789465 520.6826410165021 983.8183636596359 344.9766774298686z' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M527.9289377246552 955.157646995001L493.7953163585791 677.1616097483625 215.79927911194056 711.2952311144385 249.93290047801662 989.291268361077z' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1501.593%2c602.139C1600.18%2c604.927%2c1687.857%2c544.042%2c1737.55%2c458.85C1787.653%2c372.955%2c1796.104%2c267.399%2c1747.426%2c180.688C1697.762%2c92.221%2c1602.915%2c33.362%2c1501.593%2c38.536C1407.406%2c43.346%2c1339.54%2c120.248%2c1295.712%2c203.755C1255.449%2c280.47%2c1247.894%2c369.16%2c1287.671%2c446.128C1331.099%2c530.162%2c1407.039%2c599.465%2c1501.593%2c602.139' fill='rgba(70%2c 121%2c 175%2c 0.07)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1859'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='89.06%25' y1='119.44%25' x2='10.94%25' y2='-19.44%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1860'%3e%3cstop stop-color='rgba(25%2c 118%2c 210%2c 0.24)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(255%2c 255%2c 255%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
}

.user-text {
  font-size: 1.3em;
  font-weight: 700;
  color: whitesmoke;
}
.u-text-ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scrollArea {
  height: calc(100vh - 128px);
  background-color: whitesmoke;
}
</style>
