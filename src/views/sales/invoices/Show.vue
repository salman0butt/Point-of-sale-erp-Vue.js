<template>
  <div class="row">
    <Loader />

    <div class="col-3">
      <div>
        <CCard>
          <CCardHeader>
            Invoice
            <strong style="text-align: center"
              ># {{ invoice.invoice_ref_no }}</strong
            >
          </CCardHeader>
          <CCardBody>
            <div class="float-center">
              Customer
              <div>
                <router-link
                  :to="`/customers/show/${customer.uuid}`"
                  v-if="$can('view customers')"
                >
                  <strong
                    class="margin:auto"
                    style="color: red; font-size: 22px"
                    >{{ customer.name }}</strong
                  ></router-link
                >
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader> Payment </CCardHeader>
          <CCardBody>
            <form @submit.prevent="paymentSubmit()">
              <CCol sm="12" md="12" class="pt-2">
                <Label
                  ><CIcon style="color: green" :content="$options.cisWallet" />
                  Payment Method</Label
                >
                <CSelect
                  :options="options.paymentMethods"
                  :value.sync="form.paymentMethod"
                  :class="{ error: $v.form.paymentMethod.$error }"
                  @input="$v.form.paymentMethod.$touch()"
                />
                <div v-if="$v.form.paymentMethod.$error">
                  <p v-if="!$v.form.paymentMethod.required" class="errorMsg">
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
                <p v-if="!$v.form.amount.required" class="errorMsg">
                  Amount is required
                </p>
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
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </div>

      <div>
        <CCard>
          <CCardHeader>
            Invoice <strong># {{ invoice.invoice_ref_no }}</strong>
            <div class="float-right">
              <a href="#" class="btn btn-sm btn-info">
                <CIcon name="cil-save" /> Save
              </a>
              <a class="btn btn-sm btn-info ml-1" @click="print">
                <CIcon name="cil-print" class="mr-1" /> Print Me
              </a>
            </div>
          </CCardHeader>
          <CCardBody id="printMe">
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
                  Address : {{ customer.address.street.en }}
                </div>
                <div v-if="customer.email">
                  Email: {{ customer.email.email }}
                </div>
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
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import { cisWallet } from "@coreui/icons-pro";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

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
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
  },
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
      options: {
        paymentMethods: [{ label: "Choose Payment Method", value: "" }],
      },
      payments: [],
    };
  },

  validations() {
    return {
      form: {
        paymentMethod: { required },
        amount: { required },
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
          data.products.map((item, id) => {
            serverproducts.push(item);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // Business logo
      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data.logo && data.logo.path) {
            this.business.logo = data.logo.path;
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      // Payment Methods display
      let paymentMethods = this.options.paymentMethods;
      PaymentInvoiceService.create()
        .then(({ data }) => {
          if (data && data.paymentMethods) {
            data.paymentMethods.map((value, index) => {
              paymentMethods.push({ label: value.name, value: value.uuid });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // All Payments of invoice
      let payments = this.payments;
      PaymentInvoiceService.getInvoicePayments(this.uuid)
        .then(({ data }) => {
          if (data) {
            data.map((value, index) => {
              payments.push(value);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.$store.commit("close_loader");
    },
    paymentSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let payments = this.payments;
        this.$store.commit("set_loader");
        this.form.customer = this.customer.uuid;
        this.form.invoice = this.uuid;
        PaymentInvoiceService.store(this.form)
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
      for (let index in this.form) {
        this.form[index] = "";
      }
    },
    viewRow(uuid) {
      this.$router.push({ path: "/sales/invoices/reciept/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/sales/invoices/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          // if (result.isConfirmed) {
          //   InvoiceService.delete(this.deleteRows)
          //     .then((res) => {
          //       if (res.status == 200) {
          //         this.$swal.fire({
          //           icon: "success",
          //           title: "Success",
          //           text: "Quotation Deleted Successfully",
          //           timer: 3600,
          //         });
          //         this.serverData = this.serverData.filter(
          //           (item) => item.uuid != uuid
          //         );
          //       }
          //     })
          //     .catch((error) => {
          //       this.$swal.fire({
          //         icon: "error",
          //         title: "Error",
          //         text: "Something went Wrong",
          //         timer: 3600,
          //       });
          //     });
          //   this.deleteRows = [];
          // }
        });
    },
  },
};
</script>
