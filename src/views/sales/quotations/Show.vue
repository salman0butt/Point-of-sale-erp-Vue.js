<template>
  <CCard>
    <Loader />
    <CCardHeader>
      Quotation <strong># {{ invoice.quotation_ref_no }}</strong>
      <div class="float-right">
        <CButton
          v-if="showWhatsappButton"
          color="success"
          class="btn mr-2"
          @click="sendWhatsapp('quotation')"
        >
          Send WhatsApp</CButton
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
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";
import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "Invoice",
  components: { Loader, VueHtml2pdf },
  mixins: [whatsappMixin],
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
          if (data.customer && data.customer.contact) {
            const number =
              data.customer.contact.country.dialCode + data.customer.contact.number.en;
            this.customer.contact = number;
            this.whatsapp.name = data.customer.full_name;
            this.whatsapp.number = number;
          }
          data.products.map((item, id) => {
            serverproducts.push(item);
          });
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
