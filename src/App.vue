<template>
  <div>
    <router-view :key="componentKey"></router-view>
    <BranchModel />
  </div>
</template>

<script>
import BranchModel from "@/components/model/BranchModel";
export default {
  name: "App",
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    BranchModel,
  },
  computed: {
    languageChanged() {
      return this.$store.getters.getLanguage;
    },
    selectedBranches() {
      return this.$store.getters.getBranches;
    },
  },
  watch: {
    async languageChanged() {
      this.forceRerender();
    },
    selectedBranches() {
      this.forceRerender();
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
