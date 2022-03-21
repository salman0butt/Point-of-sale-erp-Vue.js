<template>
  <div>
    <CCard>
      <Loader />
      <CCardHeader> Opening </CCardHeader>
      <CCardBody>
        <div>
          <strong>Terminal: </strong>{{ opening.terminal ? opening.terminal.name : "" }}
        </div>
        <br />
        <div class="table-responsive-sm">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="right">Date</th>
                <th class="center">Denomination</th>
                <th class="right">Value</th>
                <th class="center">Total number</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in opening.details" :key="index">
                <td class="center">
                  {{ item.created_at ? item.created_at : "-" }}
                </td>
                <td class="left">
                  {{ item.denomination ? item.denomination : "-" }}
                </td>
                <td class="left">
                  {{ item.value ? item.value : "-" }}
                </td>
                <td class="center">
                  {{ item.total_number ? item.total_number : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CRow>
          <CCol lg="4" sm="5" class="ml-auto">
            <table class="table table-clear">
              <tbody>
                <tr>
                  <td class="left"><strong>Total</strong></td>
                  <td class="right">
                    {{ opening.total ? opening.total : "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
// import BillPaymentService from "@/services/accounting/bill/BillPaymentService";
import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import OpeningReportService from "@/services/reports/OpeningReportService";

export default {
  name: "ShowBillPayment",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
  },

  data() {
    return {
      uuid: "",
      opening: Object,
    };
  },

  created() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      this.$store.commit("set_loader");
      this.uuid = this.$route.params.id;
      OpeningReportService.get(this.uuid)
        .then(({ data }) => {
          if (data) {
            this.opening = data;
          }

          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
  },
};
</script>
<style>
.vue-html2pdf .layout-container {
  position: inherit !important;
  width: auto !important;
  height: auto !important;
  background: initial !important;
}
.buttons-box {
  display: flex;
  width: auto;
  align-items: center;
}
</style>
