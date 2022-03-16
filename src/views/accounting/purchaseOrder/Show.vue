<template>
  <CCard>
    <Loader />
    <CCardHeader>
      Purchase Order <strong># {{ purchaseOrder.purchase_order_id }}</strong>
      <div class="float-right buttons-box">
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
        filename="purchaseOrder"
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
                style="max-width: 150px"
              />
              <div v-if="purchaseOrder.deliver_to === 'organization'">
                <div>
                  Branch: <strong>{{ purchaseOrder.branch.name }}</strong>
                </div>
                <div>Mobile : {{ purchaseOrder.branch.mobile }}</div>
                <div>Address : {{ purchaseOrder.branch.address }}</div>
              </div>
              <div v-else-if="purchaseOrder.customer">
                <div>
                  Customer: <strong>{{ purchaseOrder.customer }}</strong>
                </div>
              </div>
            </CCol>
            <CCol sm="8" class="mt-5" style="text-align: right">
              <div>
                Date :<strong>{{ purchaseOrder.date }}</strong>
              </div>
              <div>
                Expected Delivery Date :<strong>
                  {{ purchaseOrder.expected_delivery_date }}</strong
                >
              </div>
            </CCol>
          </CRow>
          <div class="table-responsive-sm">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="center">#</th>
                  <th>Item</th>
                  <th>Account</th>
                  <th class="center">Quantity</th>
                  <th class="right">Rate</th>
                  <th class="right">Tax</th>
                  <th class="right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in purchaseOrder.products" :key="index">
                  <td class="center">{{ index + 1 }}</td>
                  <td class="left">{{ product.name }}</td>
                  <td class="left">{{ product.account.name }}</td>
                  <td class="center">{{ product.qty }}</td>
                  <td class="right">{{ product.rate }}</td>
                  <td class="right">{{ product.tax ? product.tax.name : "" }}</td>
                  <td class="right">{{ product.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <CRow>
            <CCol lg="4" sm="5">
              <div>
                <label><b> Payment Terms :</b></label>

                <span v-html="purchaseOrder.payment_term"></span>
              </div>
              <div>
                <label><b>Terms & Conditions :</b></label>

                <span v-html="purchaseOrder.terms_and_conditions"></span>
              </div>
              <div>
                <label><b> Customer Note : </b></label>
                {{ purchaseOrder.customer_note }}
              </div>
            </CCol>

            <CCol lg="4" sm="5" class="ml-auto">
              <table class="table table-clear">
                <tbody>
                  <tr>
                    <td class="left"><strong>Subtotal</strong></td>
                    <td class="right">{{ purchaseOrder.sub_total }}</td>
                  </tr>
                  <!-- <tr>
                    <td class="left"><strong>VAT </strong></td>
                    <td class="right">{{ purchaseOrder.total_tax }}</td>
                  </tr> -->
                  <tr>
                    <td class="left"><strong>Discount </strong></td>
                    <td class="right">{{ purchaseOrder.total_discount }}</td>
                  </tr>

                  <tr>
                    <td class="left"><strong>Total</strong></td>
                    <td class="right">
                      <strong>{{ purchaseOrder.grand_total }}</strong>
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
</template>
<script>
import PurchaseOrderServices from "@/services/accounting/purchaseOrder/PurchaseOrderServices";
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "showPurchaseOrder",
  components: { Loader, VueHtml2pdf },
  data() {
    return {
      uuid: "",
      business: {
        logo: "",
      },
      purchaseOrder: {
        branch: {
          name: "",
          mobile: "",
          address: "",
        },
        supplier: "",
        deliver_to: "",
        customer: "",
        purchase_order_id: "",
        reference: "",
        date: "",
        expected_delivery_date: "",
        payment_term: "",
        shipment_preference: "",
        products: [],
        customer_note: "",
        terms_and_conditions: "",
        sub_total: "",
        total_discount: "",
        grand_total: "",
        attachment: [],
      },
      options: {},
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
      this.uuid = this.$route.params.id;
      PurchaseOrderServices.get(this.uuid)
        .then(({ data }) => {
          if (data) {
            this.purchaseOrder.date = data.date;
            this.purchaseOrder.expected_delivery_date = data.expected_delivery_date;
            this.purchaseOrder.payment_term = data.payment_term;
            this.purchaseOrder.shipment_preference = data.shipment_preference;
            this.purchaseOrder.customer_note = data.customer_note;
            this.purchaseOrder.terms_and_conditions = data.terms_and_conditions;
            this.purchaseOrder.sub_total = data.sub_total;
            // this.purchaseOrder.total_discount = data.discount;
            // if discount is percentage convert it to number else leave it as it is
            if (data.discount.includes("%")) {
              this.purchaseOrder.total_discount =
                parseFloat(data.discount.replace("%", "")) / 100;
            } else {
              this.purchaseOrder.total_discount = parseFloat(data.discount);
            }

            this.purchaseOrder.grand_total = data.total;
            this.purchaseOrder.attachment = data.attachment;
            this.purchaseOrder.supplier = data.supplier;
            this.purchaseOrder.deliver_to = data.deliver_to;
            this.purchaseOrder.customer = data.customer.full_name;
            this.purchaseOrder.purchase_order_id = data.purchase_order_id;

            this.purchaseOrder.branch.name = data.branch.name;
            this.purchaseOrder.branch.mobile = data.branch.mob;
            this.purchaseOrder.branch.address = data.branch.address;

            if (data.items) {
              data.items.forEach((item) => {
                this.purchaseOrder.products.push(item);
              });
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
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
