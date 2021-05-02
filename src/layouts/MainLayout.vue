<template>
  <q-layout view="lhh Lpr lff">
    <q-header class="mobile-only"
      ><q-btn
        class="fixed-top-left no-border no-border-radius text-color-bg"
        icon="menu"
        @click="mobileToggle"
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
        class="row items-center justify-center content-center q-py-md text-color-bg"
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
      if ($q.platform.is.mobile) {
        drawer.value = false;
        miniState.value = false;
      }
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
      mobileToggle() {
        drawer.value = !drawer.value;

        menuScrollArea.value = 'width: 256px;';
      },
      thumbStyle,
      barStyle,
    };
  },
});
</script>

<style lang="scss">
.animated-bg-right {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1230%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(239%2c 244%2c 250%2c 1)'%3e%3c/rect%3e%3cpath d='M -944.8343568684777%2c225 C -848.83%2c248.8 -656.83%2c342.8 -464.83435686847764%2c344 C -272.83%2c345.2 -176.83%2c220.4 15.165643131522359%2c231 C 207.17%2c241.6 303.17%2c387.6 495.16564313152236%2c397 C 687.17%2c406.4 786.2%2c284.4 975.1656431315223%2c278 C 1164.13%2c271.6 1347.03%2c347.6 1440%2c365' stroke='rgba(214%2c 224%2c 237%2c 0.72)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -209.37218625581892%2c315 C -113.37%2c290.6 78.63%2c173.2 270.6278137441811%2c193 C 462.63%2c212.8 558.63%2c409 750.6278137441811%2c414 C 942.63%2c419 1038.63%2c218.4 1230.6278137441811%2c218 C 1422.63%2c217.6 1668.75%2c401 1710.6278137441811%2c412 C 1752.5%2c423 1494.13%2c300.8 1440%2c273' stroke='rgba(214%2c 224%2c 237%2c 0.72)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -139.7956635821315%2c416 C -43.8%2c380.4 148.2%2c258.8 340.2043364178685%2c238 C 532.2%2c217.2 628.2%2c304.6 820.2043364178685%2c312 C 1012.2%2c319.4 1108.2%2c278.2 1300.2043364178685%2c275 C 1492.2%2c271.8 1752.25%2c306.8 1780.2043364178685%2c296 C 1808.16%2c285.2 1508.04%2c236 1440%2c221' stroke='rgba(214%2c 224%2c 237%2c 0.72)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1230'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
.text-color-bg {
  background: $text-color;
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
