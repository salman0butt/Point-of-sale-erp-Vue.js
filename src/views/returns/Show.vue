<template>
  <div class="row">
    <Loader />

    <div class="col-3">
      <div>
        <CCard>
          <CCardHeader> Payment </CCardHeader>
          <CCardBody>
            <form @submit.prevent="paymentSubmit()">
              <CCol sm="12" md="12" class="pt-2">
                <Label
                  ><CIcon style="color: green" :content="$options.cisWallet" /> Payment
                  Method</Label
                >
                <CSelect
                  :options="options.paymentMethods"
                  :value.sync="form.payment_method_id"
                  :class="{ error: $v.form.payment_method_id.$error }"
                  @input="$v.form.payment_method_id.$touch()"
                />
                <div v-if="$v.form.payment_method_id.$error">
                  <p v-if="!$v.form.payment_method_id.required" class="errorMsg">
                    Payment Method is required
                  </p>
                </div>
              </CCol>
              <CCol sm="12" md="12" class="pt-2">
                <CInput
                  label="Amount"
                  type="number"
                  step="any"
                  placeholder="0.000"
                  v-model="form.amount"
                  :class="{ error: $v.form.amount.$error }"
                  @input="$v.form.amount.$touch()"
                />
              </CCol>
              <div v-if="$v.form.amount.$error">
                <p v-if="!$v.form.amount.required" class="errorMsg">Amount is required</p>
              </div>
              <CButton
                progress
                timeout="2000"
                block
                color="success"
                style="width: 200px; margin-left: 20px"
                type="submit"
                >Pay</CButton
              >
            </form>
          </CCardBody>
        </CCard>
      </div>
    </div>
    <div class="col-9">
      <div>
        <CCard>
          <CCardHeader>
            <strong>Show Return</strong>
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
              filename="returns"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width="100%"
              ref="html2Pdf"
            >
              <section slot="pdf-content" md="12" style="padding: 0 20px">
                <form @submit.prevent="saveData()">
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
                          <!-- <th class="right">Discount</th> -->
                          <th class="right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(product, index) in returns.products"
                          :key="product.uuid"
                        >
                          <td class="center">{{ index + 1 }}</td>
                          <td class="left">{{ product.name }}</td>
                          <td class="left">{{ product.description }}</td>
                          <td class="center">{{ product.qty }}</td>
                          <td class="right">{{ product.selling_price }}</td>
                          <td class="right">{{ product.tax }}</td>
                          <!-- <td class="right">
                          {{
                            product.discount_per
                              ? product.discount + "%"
                              : product.discount
                          }}
                        </td> -->
                          <td class="right">{{ product.total }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <CRow>
                    <CCol lg="4" sm="5">
                      <table class="table table-clear">
                        <tbody>
                          <tr v-if="returns.date">
                            <td class="left"><strong>Date</strong></td>
                            <td class="right">{{ returns.date }}</td>
                          </tr>
                          <tr v-if="returns.status">
                            <td class="left"><strong>Status</strong></td>
                            <td class="right">{{ returns.status }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CCol>
                    <CCol lg="4" sm="5" class="ml-auto">
                      <table class="table table-clear">
                        <tbody>
                          <tr v-if="returns.return_price">
                            <td class="left"><strong>Return</strong></td>
                            <td class="right">{{ returns.return_price }}</td>
                          </tr>
                          <tr>
                            <td class="left"><strong>Subtotal</strong></td>
                            <td class="right">{{ returns.sub_total }}</td>
                          </tr>
                          <tr>
                            <td class="left"><strong>VAT </strong></td>
                            <td class="right">{{ returns.total_tax }}</td>
                          </tr>
                          <!-- <tr>
                          <td class="left"><strong>Discount </strong></td>
                          <td class="right">{{ returns.total_discount }}</td>
                        </tr> -->

                          <tr>
                            <td class="left"><strong>Total</strong></td>
                            <td class="right">
                              <strong>{{ returns.grand_total }}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- <a href="#" class="btn btn-success">
            <CIcon name="cil-dollar" /> Proceed to Payment
          </a> -->
                    </CCol>
                  </CRow>
                </form>
              </section>
            </vue-html2pdf>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader> <strong>Payment List</strong> </CCardHeader>
          <CCardBody>
            <CDataTable
              :items="payments"
              :fields="fields"
              table-filter
              sorter
              hover
              ref="externalAgent"
            >
              <template #created_by="{ item }">
                <td>
                  {{ item.created_by.username }}
                </td>
              </template>
              <template #payment_no="{ item }">
                <td>
                  {{ item.payment_no ? item.payment_no : "-" }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    >
                    <!-- <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton> -->
                    <CButton @click="deleteRow(item.uuid)" class="btn-sm" color="danger">
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
</template>
<script>
// import QuotationService from "@/services/sale/QuotationService";
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";

import ProductReturnPaymentService from "@/services/returns/ProductReturnPaymentService";
import { cisWallet } from "@coreui/icons-pro";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import VueHtml2pdf from "vue-html2pdf";
import ReturnByProductService from "@/services/returns/ReturnByProductService";

const fields = [
  { key: "created_by", label: "Created By", _style: "min-width:15%;" },
  { key: "payment_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "total_amount", label: "Total Amount", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "ShowReturn",
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
      fields,
      openInvoice: {},
      product_id: "",
      uuid: "",
      returns: {
        product_price: 0,
        return_price: 0,
        date: "",
        status: "",
        items: [],
        sub_total: "",
        total_tax: "",
        total_discount: "",
        grand_total: "",
        note: "",
        products: [],
      },
      form: {
        payment_method_id: "",
        amount: "",
        customer_id: "",
        invoice: "",
        product_Return_id: "",
        items: [],
      },
      options: {
        paymentMethods: [{ label: "Choose Payment Method", value: "" }],
        contacts: [{ label: "Choose Contact", value: "" }],
      },
      payments: [],
    };
  },

  validations() {
    return {
      form: {
        payment_method_id: { required },
        amount: { required },
      },
    };
  },
  computed: {},

  watch: {},
  created() {
    // this.product_id = this.$route.params.id;
    this.return_id = this.$route.params.id;
    this.form.product_return_id = this.return_id;

    if (this.return_id) {
      this.getReturn();
    }

    this.getPaymentMethods();
    this.getAllPayments();
  },
  methods: {
    setProductPrice(val) {
      this.invoice.product_price = val;
    },
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },

    // getServerData() {
    //   this.$store.commit("set_loader");
    //   QuotationService.get(this.invoice_id)
    //     .then(({ data }) => {
    //       this.invoice.quotation_ref_no = data.quotation_ref_no;
    //       this.invoice.invoice_ref_no = data.invoice_ref_no;

    //       // customer
    //       this.form.customer_id = data.customer.uuid;
    //       this.customer.uuid = data.customer.uuid;
    //       this.customer.name = data.customer.full_name;
    //       this.customer.address = data.customer.default_address;
    //       this.customer.contact_number = data.customer.default_contact;
    //       this.customer.email = data.customer.default_email;
    //       // let serverproducts = this.invoice.products;
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((err) => {
    //       this.$store.commit("close_loader");
    //       console.log(err);
    //     });
    // },
    getPaymentMethods() {
      // Payment Methods display
      let paymentMethods = this.options.paymentMethods;
      this.$store.commit("set_loader");
      PaymentInvoiceService.create()
        .then(({ data }) => {
          if (data && data.paymentMethods) {
            data.paymentMethods.map((value, index) => {
              paymentMethods.push({ label: value.name, value: value.uuid });
            });
            this.$store.commit("close_loader");
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    getAllPayments() {
      // All Payments of Returns
      this.$store.commit("set_loader");
      let payments = this.payments;
      ProductReturnPaymentService.getReturnPayments(this.return_id)
        .then(({ data }) => {
          if (data) {
            data.map((value, index) => {
              payments.push(value);
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
        });
    },
    getReturn() {
      this.$store.commit("set_loader");
      ReturnByProductService.get(this.return_id)
        .then(({ data }) => {
          if (data) {
            this.returns.return_price = data.return_cash;
            this.returns.grand_total = data.total_price;
            this.returns.date = data.date;
            this.returns.status = data.status;
            this.returns.total_tax = data.item.inventable?.price?.tax?.percentage;
            this.returns.sub_total = data.item.inventable?.price?.selling_price_with_tax;

            if (data.item) {
              let item = data.item;
              let products = this.returns.products;
              if (item.inventable) {
                this.product_id = item.inventable.uuid;
                products.push({
                  name: item.inventable.name,
                  uuid: item.inventable.uuid,
                  description: item.inventable.description,
                  selling_price: item.inventable.price.selling_price_with_tax,
                  qty: Math.abs(item.qty),
                  tax: item.inventable.price.tax.percentage,
                  total: item.total,
                });
              }
            }
            console.log(this.returns);
          }

          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.isEditing = false;
          this.$store.commit("close_loader");
          console.log(err);
        });

      this.$store.commit("close_loader");
    },

    paymentSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let payments = this.payments;
        this.$store.commit("set_loader");
        ProductReturnPaymentService.store(this.form)
          .then(({ data }) => {
            payments.unshift(data);
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Payment Added Successfully",
              timer: 3600,
            });
            this.resetForm();

            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
    },
    resetForm() {
      this.$v.$reset();
      // for (let index in this.form) {
      //   this.form[index] = "";
      // }
      this.form.payment_method_id = "";
      this.form.amount = "";
    },
    viewRow(uuid) {
      this.$router.push({ path: "/returns/payment/reciept/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/sales/invoices/edit/" + uuid });
    },
    addReturn(k) {
      this.openInvoice = this.invoice.products[k];
      this.$store.commit("set_return_by_invoice_model", true);
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            ProductReturnPaymentService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Payment Deleted Successfully",
                    timer: 3600,
                  });
                  this.payments = this.payments.filter((item) => item.uuid != uuid);
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
            this.deleteRows = [];
          }
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
