<template>
  <CCard>
    <Loader />
    <CCardHeader>
      Quotation <strong># {{ invoice.quotation_ref_no }}</strong>
      <div class="float-right buttons-box">
        <a
          v-if="showSmsButton"
          color="success"
          class="btn btn-sm btn-warning"
          style="color: #fff; margin-right: 5px; text-align: center"
          @click.prevent="
            options.contacts && options.contacts.length > 1
              ? openSmsModel()
              : sendSms('quotation')
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
              : sendWhatsapp('quotation')
          "
        >
          <CIcon name="cib-whatsapp" /> Send WhatsApp</a
        >

        <a href="#" class="btn btn-sm btn-info" @click.prevent="savePdf()">
          <CIcon name="cil-save" /> Download
        </a>
        <a class="btn btn-sm btn-info ml-1" @click.prevent="print" style="color: #fff">
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
        filename="quotation"
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
              <CImg v-bind:src="business.logo" block class="mb-2 imger" width="100%" />
              <h6 class="mb-3">To:</h6>
              <div>
                <strong>{{ customer.name }}</strong>
              </div>
              <div v-if="customer.address">
                Address : {{ customer.address.street.en }}
              </div>
              <div v-if="customer.email">Email: {{ customer.email.email }}</div>
              <div v-if="customer.contact_number">
                Phone: {{ customer.contact_number.number.en }}
              </div>
            </CCol>
            <CCol sm="8" class="mt-5" style="text-align: right">
              <div>
                Dated :<strong># {{ invoice.dated }}</strong>
              </div>
              <div>
                Due Date :<strong># {{ invoice.due_date }}</strong>
              </div>
            </CCol>
          </CRow>
          <div class="table-responsive-sm">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="center">#</th>
                  <th>Item</th>
                  <th>Description</th>
                  <th class="center">Quantity</th>
                  <th class="right">Unit Cost</th>
                  <th class="right">Tax</th>
                  <th class="right">Discount</th>
                  <th class="right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in invoice.products" :key="product.uuid">
                  <td class="center">{{ index + 1 }}</td>
                  <td class="left">{{ product.product.name.en }}</td>
                  <td class="left">{{ product.description }}</td>
                  <td class="center">{{ product.qty }}</td>
                  <td class="right">{{ product.selling_price }}</td>
                  <td class="right">{{ product.tax }}</td>
                  <td class="right">
                    {{ product.discount_per ? product.discount + "%" : product.discount }}
                  </td>
                  <td class="right">{{ product.total }}</td>
                </tr>
                <tr v-if="invoice.delivery">
                  <td></td>
                  <td><b>Delivery</b></td>
                  <td>
                    <b>
                      {{ invoice.delivery.name.en ? invoice.delivery.name.en : "-" }}
                    </b>
                  </td>
                  <td colspan="4">
                    <b>Address : </b> {{ invoice.address_for_delivery }}
                  </td>
                  <td>{{ invoice.delivery_method_price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <CRow>
            <CCol lg="4" sm="5">
              <div>
                <label><b> Payment Terms :</b></label>

                <span v-html="invoice.payment_terms"></span>
              </div>
              <div>
                <label><b>Terms & Conditions :</b></label>

                <span v-html="invoice.terms_and_conditions"></span>
              </div>
              <div>
                <label><b> Note : </b></label>
                {{ invoice.note }}
              </div>
            </CCol>

            <CCol lg="4" sm="5" class="ml-auto">
              <table class="table table-clear">
                <tbody>
                  <tr>
                    <td class="left"><strong>Subtotal</strong></td>
                    <td class="right">{{ invoice.sub_total }}</td>
                  </tr>
                  <tr>
                    <td class="left"><strong>VAT </strong></td>
                    <td class="right">{{ invoice.total_tax }}</td>
                  </tr>
                  <tr>
                    <td class="left"><strong>Discount </strong></td>
                    <td class="right">{{ invoice.total_discount }}</td>
                  </tr>

                  <tr>
                    <td class="left"><strong>Total</strong></td>
                    <td class="right">
                      <strong>{{ invoice.grand_total }}</strong>
                    </td>
                  </tr>
                  <tr v-if="invoice.delivery">
                    <td class="left"><strong>Delivery charges</strong></td>
                    <td class="right">
                      <strong>{{ invoice.delivery_method_price }}</strong>
                    </td>
                  </tr>
                  <tr v-if="invoice.delivery">
                    <td class="left"><strong>Total With Delivery</strong></td>
                    <td class="right">
                      <strong>{{ invoice.total_price_with_delivery }}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <a href="#" class="btn btn-success">
            <CIcon name="cil-dollar" /> Proceed to Payment
          </a> -->
            </CCol>
          </CRow>
        </section>
      </vue-html2pdf>
    </CCardBody>
    <WhatsappPluginModel :contacts="options.contacts" type="quotation" />
    <SmsPluginModel :contacts="options.contacts" type="quotation" />
  </CCard>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";
import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
import { smsMixin } from "@/mixins/plugins/smsMixin";
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";
import WhatsappPluginModel from "@/components/plugins/whatsapp/WhatsappPluginModel";
import SmsPluginModel from "@/components/plugins/sms/SmsPluginModel";

export default {
  name: "Invoice",
  components: { Loader, VueHtml2pdf, WhatsappPluginModel, SmsPluginModel },
  mixins: [whatsappMixin, smsMixin],
  data() {
    return {
      output: null,
      uuid: "",

      invoice: {
        dated: "",
        due_date: "",
        sub_total: "",
        total_tax: "",
        total_discount: "",
        grand_total: "",
        quotation_ref_no: "",
        invoice_ref_no: "",
        payment_terms: "",
        terms_and_conditions: "",
        note: "",
        products: [],
        // delivery
        delivery: "",
        address_for_delivery: "",
        delivery_method_price: "",
        total_price_with_delivery: "",
      },
      business: {
        logo: "",
      },
      customer: {
        name: "",
        address: "",
        contact_number: "",
        email: "",
      },
      options: {
        contacts: [{ label: "Choose Contact", value: "" }],
      },
    };
  },
  created() {
    this.getServerData();
  },
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    getServerData() {
      // Quotation Data
      this.uuid = this.$route.params.id;
      QuotationService.get(this.uuid)
        .then(({ data }) => {
          // invoice
          this.invoice.quotation_ref_no = data.quotation_ref_no;
          this.invoice.dated = data.dated;
          this.invoice.due_date = data.due_date;
          this.invoice.sub_total = data.sub_total;
          this.invoice.total_tax = data.total_tax;
          this.invoice.total_discount = data.total_discount;
          this.invoice.grand_total = data.grand_total;
          this.invoice.note = data.note;
          this.invoice.payment_terms = data.payment_terms;
          this.invoice.terms_and_conditions = data.terms_and_conditions;

          // customer
          this.customer.name = data.customer.full_name;
          this.customer.address = data.customer.default_address;
          this.customer.email = data.customer.default_email;
          let serverproducts = this.invoice.products;
          if (
            data.customer &&
            data.customer.all_contacts &&
            data.customer.all_contacts.length > 0
          ) {
            if (data.customer.all_contacts.length === 1) {
              const number =
                data.customer.contact.country.dialCode + data.customer.contact.number.en;
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
          data.products.map((item, id) => {
            serverproducts.push(item);
          });

          // delivery
          this.invoice.delivery = data.delivery;
          this.invoice.delivery_method_price = data.delivery_method_price;
          this.invoice.address_for_delivery = data.address_for_delivery;
          this.invoice.total_price_with_delivery = data.total_price_with_delivery;
        })

        .catch((err) => {
          console.log(err);
          this.$router.push({ path: "/not-found" });
        });

      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data && data.logo && data.logo.path) {
            this.business.logo = data.logo.path;
          }
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
</style>
