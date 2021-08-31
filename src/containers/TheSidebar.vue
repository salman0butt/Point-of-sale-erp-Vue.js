<template>
  <CSidebar
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img
        src="/logo.png"
        v-if="!minimize"
        class="c-sidebar-brand-full"
        style="width: 70%"
      />
      <img src="/icon.png" v-if="minimize" />
    </CSidebarBrand>

    <CRenderFunction class="headerFont" flat :contentToRender="sidebarItems" />

    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from "./menu";
export default {
  name: "TheSidebar",
  extends: SidebarItems,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/style";
</style>
