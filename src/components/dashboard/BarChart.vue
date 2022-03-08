<template>
  <CChartBar
    :datasets="dashboardDefaultDataset"
    :labels="dashboardMonths"
    style="height: 300px"
    :options="{ maintainAspectRatio: false }"
  />
</template>

<script>
import { CChartBar } from "@coreui/vue-chartjs";

export default {
  name: "BarChart",
  props: {
    dashboardMonths: Array,
    dashboardDefaultDataset: Array,
  },
  components: { CChartBar },
  computed: {
    // defaultDatasets() {
    //   return [
    //     {
    //       label: "GitHub Commits",
    //       backgroundColor: "#f87979",
    //       data: [40, 20, 12, 39, 10, 40, 20, 12, 39, 10, 40, 20],
    //     },
    //   ];
    // },
  },
};
</script>
