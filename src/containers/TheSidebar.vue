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
    <transition name="fade">
      <CRenderFunction
        v-if="renderIt"
        class="headerFont"
        flat
        :contentToRender="sidebarItems"
      />
    </transition>

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
  data() {
    return {
      renderIt: true,
    };
  },
  extends: SidebarItems,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    language() {
      return this.$store.getters.getLanguage;
    },
  },
  watch: {
    language() {
      // reredner
      this.renderIt = false;

      setTimeout(() => {
        this.renderIt = true;
      }, 0);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/style";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
