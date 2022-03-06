<template>
  <div class="row">
    <Loader />
    <div class="col-12">
      <div>
        <CCard>
          <CCardHeader>
            Invoice <strong># {{ invoice.invoice_ref_no }}</strong>
            <div class="float-right">
              <!-- <CButton
                v-if="showWhatsappButton"
                color="success"
                class="btn mr-2"
                @click="sendWhatsapp()"
              >
                Send WhatsApp</CButton
              > -->
              <CButton color="success" class="btn mr-2"> Pay</CButton>
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
              filename="invoice"
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
                      v-bind:src="business.logo"
                      block
                      class="mb-2 imger"
                      width="100%"
                    />
                    <h6 class="mb-3">To:</h6>
                    <div>
                      <strong>{{ customer.name }}</strong>
                    </div>
                    <div v-if="customer.address">
                      Address : {{ customer.address.street }}
                    </div>
                    <div v-if="customer.email">Email: {{ customer.email.email }}</div>
                    <div v-if="customer.contact_number">
                      Phone: {{ customer.contact_number.number }}
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
                      <tr
                        v-for="(product, index) in invoice.products"
                        :key="product.uuid"
                      >
                        <td class="center">{{ index + 1 }}</td>
                        <td class="left">{{ product.product.name.en }}</td>
                        <td class="left">{{ product.description }}</td>
                        <td class="center">{{ product.qty }}</td>
                        <td class="right">{{ product.selling_price }}</td>
                        <td class="right">{{ product.tax }}</td>
                        <td class="right">
                          {{
                            product.discount_per
                              ? product.discount + "%"
                              : product.discount
                          }}
                        </td>
                        <td class="right">{{ product.total }}</td>
                      </tr>
                      <tr v-if="invoice.delivery">
                        <td></td>
                        <td><b>Delivery</b></td>
                        <td>
                          <b>
                            {{
                              invoice.delivery.name.en ? invoice.delivery.name.en : "-"
                            }}
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
                          <td class="left">
                            <strong>Delivery charges</strong>
                          </td>
                          <td class="right">
                            <strong>{{ invoice.delivery_method_price }}</strong>
                          </td>
                        </tr>
                        <tr v-if="invoice.delivery">
                          <td class="left">
                            <strong>Total With Delivery</strong>
                          </td>
                          <td class="right">
                            <strong>{{ invoice.total_price_with_delivery }}</strong>
                          </td>
                        </tr>
                        <!-- <tr>
                      <td class="left"><strong>Payment </strong></td>
                      <td class="right">
                        <strong>{{ invoice.grand_total }}</strong>
                      </td>
                    </tr> -->
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
        </CCard>
      </div>
    </div>
  </div>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";

import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
// import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
import VueHtml2pdf from "vue-html2pdf";

const fields = [
  { key: "created_by", label: "Created By", _style: "min-width:15%;" },
  { key: "payment_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "total_amount", label: "Total Amount", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "Invoice",
  cisWallet,
  components: {
    Loader,
    VueHtml2pdf,
  },
  // mixins: [whatsappMixin],
  data() {
    return {
      fields,
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
        uuid: "",
        address: "",
        contact_number: "",
        email: "",
      },
      form: {
        paymentMethod: "",
        amount: "",
        customer: "",
        invoice: "",
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
      this.$store.commit("set_loader");

      // Quotation Data
      this.uuid = this.$route.params.id;
      QuotationService.get(this.uuid)
        .then(({ data }) => {
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
          this.invoice.invoice_ref_no = data.invoice_ref_no;

          // customer
          this.customer.uuid = data.customer.uuid;
          this.customer.name = data.customer.full_name.en;
          this.customer.address = data.customer.default_address;
          this.customer.contact_number = data.customer.default_contact;
          this.customer.email = data.customer.default_email;
          let serverproducts = this.invoice.products;

          // if (data.customer && data.customer.contact) {
          //   const number =
          //     data.customer.contact.country.dialCode + data.customer.contact.number.en;
          //   this.customer.contact_number = number;

          // this.whatsapp.name = data.customer.full_name.en;
          // this.whatsapp.number = number;
          // }

          // delivery
          this.invoice.delivery = data.delivery;
          this.invoice.delivery_method_price = data.delivery_method_price;
          this.invoice.address_for_delivery = data.address_for_delivery;
          this.invoice.total_price_with_delivery = data.total_price_with_delivery;

          data.products.map((item) => {
            serverproducts.push(item);
          });
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$router.push({ path: "/not-found" });
          this.$store.commit("close_loader");
          console.log(err);
        });

      // Business logo
      this.$store.commit("set_loader");
      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data.logo && data.logo.path) {
            this.business.logo = data.logo.path;
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      this.$store.commit("close_loader");
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
