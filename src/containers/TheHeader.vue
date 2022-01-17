<template>
  <CHeader class="headerStyle" with-subheader>
    <CToggler
      in-header
      class="ml-3 d-lg-none headerFont"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none headerFont"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    {{ show }}
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="/logo.png" class="c-sidebar-brand-minimized" style="width: 50%" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink class="headerFont"> </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink class="headerFont" exact> </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink class="headerFont"> </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav> <TheSelectBranchForm /></CHeaderNav>
    <CHeaderNav>
      <CHeaderNavItem class="px-3 c-d-legacy-none headerFont">
        <button
          @click="() => $store.commit('toggle', 'darkMode')"
          class="c-header-nav-btn headerFont"
        >
          <CIcon class="headerFont" v-if="$store.state.darkMode" name="cil-sun" />
          <CIcon class="headerFont" v-else name="cil-moon" />
        </button>
      </CHeaderNavItem>
      <!-- <TheHeaderDropdownNotif /> -->
      <TheHeaderDropdownAccnt />
      <CHeaderNavItem class="px-3"> </CHeaderNavItem>
    </CHeaderNav>

    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
// import TheHeaderDropdownNotif from "./TheHeaderDropdownNotif";
// import TheHeaderDropdownTasks from "./TheHeaderDropdownTasks";
// import TheHeaderDropdownMssgs from "./TheHeaderDropdownMssgs";
import TheSelectBranchForm from "@/containers/TheSelectBranchForm";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
    // TheHeaderDropdownNotif,
    TheSelectBranchForm,
    // TheHeaderDropdownTasks,
    // TheHeaderDropdownMssgs,
  },
  data() {
    return {
      iconflag: false,
    };
  },
  computed: {
    show() {
      if (this.$store.state.sidebarShow) {
        // this.iconflag = false;
        return "";
      }
      // this.iconflag = true;
      return "";
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/style";
</style>
