<template>
  <div>
    <Loader />

    <div>
      <CCard>
        <CCardHeader>
          {{ $t("payments.show.receiptNo") }}
          <strong> {{ payment.payment_no ? payment.payment_no : "-" }}</strong>
          <div class="float-right buttons-box">
            <a
              v-if="showSmsButton"
              color="success"
              class="btn btn-sm btn-warning"
              style="color: #fff; margin-right: 5px; text-align: center"
              @click.prevent="
                options.contacts && options.contacts.length > 1
                  ? openSmsModel()
                  : sendSms('payment')
              "
            >
              <CIcon name="cis-mobile-sms" /> Send Sms</a
            >
            <a
              v-if="showWhatsappButton"
              color="success"
              class="btn btn-sm btn-success"
              style="color: #fff; margin-right: 5px; text-align: center"
              @click.prevent="
                options.contacts && options.contacts.length > 1
                  ? openWhatsappModel()
                  : sendWhatsapp('payment')
              "
            >
              <CIcon name="cib-whatsapp" /> Send WhatsApp</a
            >

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
            filename="payment"
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
                  <div>Cr #{{ branch.cr }}</div>
                </CCol>
              </CRow>
              <div class="table-responsive-sm">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th class="right">
                        {{ $t("payments.index.table.dated") }}
                      </th>
                      <th class="center">
                        {{ $t("payments.index.table.paymentNo") }}
                      </th>
                      <th class="right">
                        {{ $t("payments.index.table.customer") }}
                      </th>
                      <th class="center">
                        {{ $t("payments.index.table.invoiceNo") }}
                      </th>
                      <th>{{ $t("payments.index.table.paymentMethod") }}</th>
                      <th class="right">
                        {{ $t("payments.index.table.amount") }}
                      </th>
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
                      <td class="left" v-if="payment.customer">
                        {{
                          payment.customer.full_name ? payment.customer.full_name : "-"
                        }}
                      </td>
                      <td class="center" v-if="payment.invoice">
                        {{
                          payment.invoice.invoice_ref_no
                            ? payment.invoice.invoice_ref_no
                            : "-"
                        }}
                      </td>
                      <td class="right" v-if="payment.paymentMethod">
                        {{
                          payment.paymentMethod.name ? payment.paymentMethod.name : "-"
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
                <CCol lg="4" sm="5">
                  <div>
                    <label><b>Payment Terms :</b></label>
                    <span v-html="terms[0].data"></span>
                  </div>
                </CCol>

                <CCol lg="4" sm="5" class="ml-auto">
                  <table class="table table-clear">
                    <tbody>
                      <span v-if="payment.invoice">
                        <tr v-if="!payment.invoice.delivery">
                          <td class="left"><strong>Invoice Amount</strong></td>
                          <td class="right" v-if="payment.invoice">
                            {{ payment.invoice.grand_total }}
                          </td>
                        </tr>
                      </span>

                      <tr v-if="payment.invoice && payment.invoice.delivery">
                        <td class="left">
                          <strong>Invoice Amount</strong>
                        </td>
                        <td class="right" v-if="payment.invoice">
                          {{ payment.invoice.total_price_with_delivery }}
                        </td>
                      </tr>

                      <tr>
                        <td class="left"><strong>Total Amount Paid</strong></td>
                        <td class="right">
                          {{ payment.amount ? payment.amount : "-" }}
                        </td>
                      </tr>
                      <tr>
                        <td class="left"><strong>Balance </strong></td>
                        <td class="right">
                          {{ payment.invoice.total_price_with_delivery - payment.amount }}
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
      <WhatsappPluginModel :contacts="options.contacts" type="payment" />
      <SmsPluginModel :contacts="options.contacts" type="payment" />
    </div>
  </div>
</template>
<script>
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
import { smsMixin } from "@/mixins/plugins/smsMixin";
import VueHtml2pdf from "vue-html2pdf";
import WhatsappPluginModel from "@/components/plugins/whatsapp/WhatsappPluginModel";
import SmsPluginModel from "@/components/plugins/sms/SmsPluginModel";
import SettingService from "@/services/settings/SettingService";

export default {
  name: "Invoice",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
    VueHtml2pdf,
    WhatsappPluginModel,
    SmsPluginModel,
  },
  mixins: [whatsappMixin, smsMixin],
  data() {
    return {
      output: null,
      uuid: "",
      branch: Object,
      business: {
        logo: "",
      },
      payment: Object,
      options: {
        contacts: [{ label: "Choose Contact", value: "" }],
      },
      terms: [
        {
          key: "payment_term_and_conditon",
          label: "Payments",
          data: "",
        },
      ],
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
      await new Promise((resolve, reject) => {
        // Quotation Data
        this.uuid = this.$route.params.id;
        PaymentInvoiceService.get(this.uuid)
          .then(({ data }) => {
            this.payment = data;
            this.branch = data.invoice.branch;
            if (
              data.customer &&
              data.customer.all_contacts &&
              data.customer.all_contacts.length > 0
            ) {
              if (data.customer.all_contacts.length === 1) {
                const number =
                  data.customer.contact.country.dialCode +
                  data.customer.contact.number.en;
                this.customer.contact_number = number;
                this.whatsapp.name = data.customer.full_name;
                this.whatsapp.number = number;

                this.sms.name = data.customer.full_name;
                this.sms.number = number;
              } else {
                let contacts = this.options.contacts;
                data.customer.all_contacts.map(function (item) {
                  contacts.push({
                    label:
                      item.country.dialCode + item.number.en + " (" + item.name.en + ")",
                    value: JSON.stringify({
                      uuid: item.uuid,
                      name: data.customer.full_name,
                      number: item.country.dialCode + item.number.en,
                    }),
                  });
                });
              }
            }

            this.$store.commit("close_loader");
            resolve();
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      });
      this.$store.commit("set_loader");
      // Business logo
      // this.$store.commit("set_loader");
      // let business_id = localStorage.getItem("business_id");
      // this.$http
      //   .get("/business/" + business_id)
      //   .then(({ data }) => {
      //     if (data.logo && data.logo.path) {
      //       this.business.logo = data.logo.path;
      //     }
      //     this.$store.commit("close_loader");
      //   })
      //   .catch((err) => {
      //     this.$store.commit("close_loader");
      //     console.log(err);
      //   });

      // Payment Terms
      let type = "accounting";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              this.terms.map((term) => {
                if (term.key === item.key) {
                  term.data = item.value;
                }
              });
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
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
