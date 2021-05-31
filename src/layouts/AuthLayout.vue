<template>
  <q-layout view="lhh Lpr lff">
    <q-page-container class="animated-bg-right">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'AuthLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.animated-bg-right {
  width: 100vw;
  height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1150%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(239%2c 244%2c 250%2c 1)'%3e%3c/rect%3e%3cpath d='M -4.056499731215695%2c495 C 72.74%2c535 226.34%2c713.6 379.9435002687843%2c695 C 533.54%2c676.4 610.34%2c390.4 763.9435002687843%2c402 C 917.54%2c413.6 994.34%2c759.2 1147.9435002687842%2c753 C 1301.54%2c746.8 1378.34%2c401 1531.9435002687842%2c371 C 1685.54%2c341 1762.34%2c618.4 1915.9435002687842%2c603 C 2069.54%2c587.6 2299.13%2c303.8 2299.943500268784%2c294 C 2300.75%2c284.2 1995.99%2c502 1920%2c554' stroke='rgba(204%2c 224%2c 248%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -327.59335347081935%2c541 C -250.79%2c497.8 -97.19%2c279.2 56.40664652918068%2c325 C 210.01%2c370.8 286.81%2c739.4 440.40664652918065%2c770 C 594.01%2c800.6 670.81%2c477.2 824.4066465291806%2c478 C 978.01%2c478.8 1054.81%2c765.8 1208.4066465291808%2c774 C 1362.01%2c782.2 1438.81%2c519.8 1592.4066465291808%2c519 C 1746.01%2c518.2 1910.89%2c818.2 1976.4066465291808%2c770 C 2041.93%2c721.8 1931.28%2c376.4 1920%2c278' stroke='rgba(204%2c 224%2c 248%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -514.6561710477476%2c365 C -437.86%2c444.2 -284.26%2c751.8 -130.65617104774768%2c761 C 22.94%2c770.2 99.74%2c453.4 253.34382895225232%2c411 C 406.94%2c368.6 483.74%2c543 637.3438289522524%2c549 C 790.94%2c555 867.74%2c413.4 1021.3438289522524%2c441 C 1174.94%2c468.6 1251.74%2c676.6 1405.3438289522524%2c687 C 1558.94%2c697.4 1686.41%2c499.2 1789.3438289522524%2c493 C 1892.28%2c486.8 1893.87%2c623.4 1920%2c656' stroke='rgba(204%2c 224%2c 248%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M -648.07663372858%2c468 C -571.28%2c531.6 -417.68%2c776.2 -264.07663372857996%2c786 C -110.48%2c795.8 -33.68%2c530.8 119.92336627142004%2c517 C 273.52%2c503.2 350.32%2c751.2 503.92336627142004%2c717 C 657.52%2c682.8 734.32%2c337.8 887.92336627142%2c346 C 1041.52%2c354.2 1118.32%2c751.2 1271.92336627142%2c758 C 1425.52%2c764.8 1526.31%2c420.6 1655.92336627142%2c380 C 1785.54%2c339.4 1867.18%2c520 1920%2c555' stroke='rgba(204%2c 224%2c 248%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1150'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
</style>
