<template>
  <div>
    <CCard>
      <Loader />
      <CCardHeader>
        Receiving Show
        <div class="float-right buttons-box">
          <a href="#" class="btn btn-sm btn-info" @click.prevent="savePdf()">
            <CIcon name="cil-save" /> Download
          </a>
          <a
            class="btn btn-sm btn-info ml-1"
            style="color: #fff"
            @click.prevent="print()"
          >
            <CIcon name="cil-print" class="mr-1" /> Print Me
          </a>
        </div>
      </CCardHeader>
      <CCardBody id="printMe">
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="receiving"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content" md="12" style="padding: 0 20px">
            <CRow class="mt-2 mb-2">
              <CCol md="6" sm="6">
                <div>
                  <strong>Supplier: </strong>
                  {{ receiving.supplier ? receiving.supplier.name : "-" }}
                </div>
              </CCol>
              <CCol md="6" sm="6">
                <div style="text-align: end">
                  <strong>Date: </strong>
                  {{ receiving.date ? receiving.date : "-" }}
                </div>
              </CCol>
            </CRow>
            <div class="table-responsive-sm mt-2">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="right">Item</th>
                    <th class="center">Qty</th>
                    <th class="right">Cost Price</th>
                    <th class="right">Selling Price</th>
                    <th class="right">Total Cost</th>
                    <th class="right">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in receiving.items" :key="index">
                    <td class="center">
                      {{ item.inventable ? item.inventable.name : "-" }}
                    </td>
                    <td class="left">
                      {{ item.qty ? Math.abs(item.qty) : "-" }}
                    </td>

                    <td class="center">
                      {{ item.cost_price ? item.cost_price : "-" }}
                    </td>
                    <td class="center">
                      {{ item.selling_price ? item.selling_price : "-" }}
                    </td>
                    <td class="center">
                      {{ item.cost_price ? item.qty * item.cost_price : "-" }}
                    </td>
                    <td class="center">
                      {{ item.expiry_date ? item.expiry_date : "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CRow>
              <CCol lg="4" sm="5">
                <div>
                  <strong>Note: </strong>
                  {{ receiving.note ? receiving.note : "-" }}
                </div>
                <div class="mt-2">
                  <strong>Delevery Notes: </strong>
                  {{ receiving.reference_id ? receiving.reference_id : "-" }}
                </div>
              </CCol>
              <CCol lg="4" sm="5" class="ml-auto">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left"><strong>Total Cost</strong></td>
                      <td class="right">
                        {{ receiving.total_cost ? receiving.total_cost : "-" }}
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><strong>Status</strong></td>
                      <td class="right">
                        {{ receiving.status ? receiving.status : "-" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </section>
        </vue-html2pdf>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import ReceivingService from "@/services/receivings/ReceivingService";
import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "ShowReceivings",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
    VueHtml2pdf,
  },

  data() {
    return {
      receiving: Object,
    };
  },

  created() {
    this.getServerData();
  },
  methods: {
    async print() {
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    async getServerData() {
      this.$store.commit("set_loader");
      await new Promise((resolve, reject) => {
        this.uuid = this.$route.params.id;
        ReceivingService.get(this.uuid)
          .then(({ data }) => {
            if (data) {
              this.receiving = data;
            }
            this.$store.commit("close_loader");
            resolve();
          })
          .catch((err) => {
            this.$router.push({ path: "/catalogs/receivings/index" });
            this.$store.commit("close_loader");
            console.log(err);
          });
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
