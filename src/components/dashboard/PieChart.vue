<template>
  <CChartDoughnut
    :datasets="dashboardDefaultDataset"
    :labels="dashboardLabels"
  />
</template>

<script>
import { CChartDoughnut } from "@coreui/vue-chartjs";

export default {
  name: "PieChart",
  components: { CChartDoughnut },
  props: {
    dashboardLabels: Array,
    dashboardDefaultDataset: Array,
  },
  computed: {
    // defaultDatasets() {
    //   return [
    //     {
    //       backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
    //       data: [40, 20, 80, 10],
    //     },
    //   ];
    // },
  },
};
</script>
