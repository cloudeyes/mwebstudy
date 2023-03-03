<script setup lang="ts">
import MainMap from './components/MainMap.vue';
import SideBar from './components/SideBar.vue';
</script>

<template>
  <v-app full-height theme="dark">
    <MainMap />
    <SideBar class="side-bar" />
  </v-app>
</template>

<style lang="scss">
.side-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
