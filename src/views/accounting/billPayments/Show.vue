<template>
  <div>
    <CCard>
      <Loader />
      <CCardHeader>
        BIll Payment #
        <strong> {{ payment.payment_no ? payment.payment_no : "-" }}</strong>
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
          filename="BillPayment"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content" md="12" style="padding: 0 20px">
            <CRow class="mb-4">
              <CCol sm="4">
                <CImg
                  v-if="businessLogo"
                  :src="businessLogo"
                  block
                  class="mb-2 imger"
                  width="100%"
                  style="max-width: 150px"
                />
                <div>
                  <strong>{{ branch.name }}</strong>
                </div>
                <div>{{ branch.address }}</div>
                <div>Phone :{{ branch.mob }}</div>
                <div v-if="branch.cr">Cr #{{ branch.cr }}</div>
              </CCol>
            </CRow>
            <div class="table-responsive-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="right">Dated</th>
                    <th class="center">Payment No</th>
                    <th class="right">Supplier</th>
                    <th class="center">Bill No</th>
                    <th>Payment Method</th>
                    <th class="right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="center">
                      {{ payment.dated ? payment.dated : "-" }}
                    </td>
                    <td class="left">
                      {{ payment.payment_no ? payment.payment_no : "-" }}
                    </td>
                    <td class="left" v-if="payment.supplier">
                      {{ payment.supplier ? payment.supplier.name : "-" }}
                    </td>
                    <td class="center" v-if="payment.bill">
                      {{ payment.bill ? payment.bill.bill_no : "-" }}
                    </td>
                    <td class="right" v-if="payment.payment_method">
                      {{
                        payment.payment_method.name ? payment.payment_method.name : "-"
                      }}
                    </td>
                    <td class="right">
                      {{ payment.amount ? payment.amount : "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CRow>
              <CCol lg="4" sm="5" class="ml-auto">
                <table class="table table-clear">
                  <tbody>
                    <tr v-if="payment.bill">
                      <td class="left">
                        <strong>Bill Amount</strong>
                      </td>
                      <td class="right">
                        {{ payment.bill.grand_total }}
                      </td>
                    </tr>

                    <tr>
                      <td class="left"><strong>Total Amount Paid</strong></td>
                      <td class="right">
                        {{ payment.amount ? payment.amount : "-" }}
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><strong>Balance</strong></td>
                      <td class="right">
                        {{
                          payment.amount ? payment.bill.grand_total - payment.amount : "-"
                        }}
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
import BillPaymentService from "@/services/accounting/bill/BillPaymentService";
import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "ShowBillPayment",
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
      output: null,
      uuid: "",
      branch: Object,
      payment: Object,
      // options: {
      //   contacts: [{ label: "Choose Contact", value: "" }],
      // },
    };
  },

  created() {
    this.getServerData();
  },
  computed: {
    businessLogo() {
      return this.$store.getters.getBusinessLogo;
    },
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
        BillPaymentService.get(this.uuid)
          .then(({ data }) => {
            this.payment = data;
            this.branch = data.bill.branch;
            // if (
            //   data.customer &&
            //   data.customer.all_contacts &&
            //   data.customer.all_contacts.length > 0
            // ) {
            //   if (data.customer.all_contacts.length === 1) {
            //     const number =
            //       data.customer.contact.country.dialCode +
            //       data.customer.contact.number.en;
            //     this.customer.contact_number = number;
            //     this.whatsapp.name = data.customer.full_name;
            //     this.whatsapp.number = number;

            //     this.sms.name = data.customer.full_name;
            //     this.sms.number = number;
            //   } else {
            //     let contacts = this.options.contacts;
            //     data.customer.all_contacts.map(function (item) {
            //       contacts.push({
            //         label:
            //           item.country.dialCode + item.number.en + " (" + item.name.en + ")",
            //         value: JSON.stringify({
            //           uuid: item.uuid,
            //           name: data.customer.full_name,
            //           number: item.country.dialCode + item.number.en,
            //         }),
            //       });
            //     });
            //   }
            // }

            this.$store.commit("close_loader");
            resolve();
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      });
    },
    changeWhatsappContact() {
      if (this.contact) {
        const contact = JSON.parse(this.contact);
        this.whatsapp.name = contact.name;
        this.whatsapp.number = contact.number;
      } else {
        this.whatsapp.name = "";
        this.whatsapp.number = "";
      }
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
