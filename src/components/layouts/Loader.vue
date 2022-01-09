<template>
  <loading :active.sync="loading" :can-cancel="false" :is-full-page="false"></loading>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Loader",
  components: { Loading },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
