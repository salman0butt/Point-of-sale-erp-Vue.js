<template>
  <CCard>
    <Loader />
    <CCardHeader>
      BIll No<strong># {{ bill.bill_no }}</strong>
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
        filename="bill"
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
                <div>
                  Branch: <strong>{{ bill.branch.name }}</strong>
                </div>
                <div>Mobile : {{ bill.branch.mobile }}</div>
                <div>Address : {{ bill.branch.address }}</div>
              </div>
            </CCol>
            <CCol sm="8" class="mt-5" style="text-align: right">
              <div>
                Date :<strong>{{ bill.date }}</strong>
              </div>
              <div>
                Due Date :<strong> {{ bill.due_date }}</strong>
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
                <tr v-for="(product, index) in bill.products" :key="index">
                  <td class="center">{{ index + 1 }}</td>
                  <td class="left">{{ product.product_name }}</td>
                  <td class="left">{{ product.account ? product.account.name : "" }}</td>
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
                <label><b>Terms & Conditions :</b></label>

                <span v-html="bill.terms_and_conditions"></span>
              </div>
              <div>
                <label><b> Supplier Note : </b></label>
                {{ bill.note }}
              </div>
            </CCol>

            <CCol lg="4" sm="5" class="ml-auto">
              <table class="table table-clear">
                <tbody>
                  <tr>
                    <td class="left"><strong>Subtotal</strong></td>
                    <td class="right">{{ bill.sub_total }}</td>
                  </tr>
                  <tr v-if="bill.total_tax">
                    <td class="left"><strong>Total Tax </strong></td>
                    <td class="right">{{ bill.total_tax }}</td>
                  </tr>
                  <tr v-if="bill.total_discount">
                    <td class="left"><strong>Discount </strong></td>
                    <td class="right">{{ bill.total_discount }}</td>
                  </tr>

                  <tr>
                    <td class="left"><strong>Total</strong></td>
                    <td class="right">
                      <strong>{{ bill.grand_total }}</strong>
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
import BillService from "@/services/accounting/bill/BillService";
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "showBill",
  components: { Loader, VueHtml2pdf },
  data() {
    return {
      uuid: "",
      bill: {
        branch: {
          name: "",
          mobile: "",
          address: "",
        },
        supplier: "",
        date: "",
        due_date: "",
        products: [],
        note: "",
        terms_and_conditions: "",
        sub_total: "",
        total_discount: "",
        total_tax: "",
        grand_total: "",
        attachment: [],
        status: "",
      },
      options: {},
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
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    getServerData() {
      this.$store.commit("set_loader");
      this.uuid = this.$route.params.id;
      BillService.get(this.uuid)
        .then(({ data }) => {
          if (data) {
            console.log(data);
            this.bill.bill_no = data.bill_no;
            this.bill.date = data.date;
            this.bill.due_date = data.due_date;
            this.bill.note = data.note;
            this.bill.terms_and_conditions = data.terms_and_conditions;
            this.bill.sub_total = data.sub_total;
            // this.bill.total_discount = data.discount;
            // if discount is percentage convert it to number else leave it as it is
            if (data.total_discount && data.total_discount.includes("%")) {
              this.bill.total_discount =
                parseFloat(data.total_discount.replace("%", "")) / 100;
            } else {
              this.bill.total_discount = parseFloat(data.total_discount) ?? "";
            }

            this.bill.total_tax = data.total_tax;
            this.bill.grand_total = data.grand_total;
            this.bill.attachment = data.attachment;
            this.bill.supplier = data.supplier;

            this.bill.branch.name = data.branch.name;
            this.bill.branch.mobile = data.branch.mob;
            this.bill.branch.address = data.branch.address;

            if (data.items) {
              data.items.forEach((item) => {
                this.bill.products.push(item);
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
