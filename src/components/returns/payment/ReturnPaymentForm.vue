<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="isEditing ? updatePayment() : savePayment()">
              <CRow>
                <!-- <CCol sm="12" md="12" class="pt-2">
                  <label> Select Return </label>
                  <multiselect
                    v-model="form.product_return_id"
                    :options="options.returns"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Search..."
                    label="label"
                    track-by="label"
                    @input="[invoiceChange(), $v.form.product_return_id.$touch()]"
                    :class="{ error: $v.form.product_return_id.$error }"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                  <div v-if="$v.form.product_return_id.$error">
                    <p v-if="!$v.form.product_return_id.required" class="errorMsg">
                      Return is required
                    </p>
                  </div>
                </CCol> -->
                <CCol sm="12" md="12" class="pt-2">
                  <Label> Payment Method</Label>
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
                    type="number"
                    label="Amount"
                    v-model="form.amount"
                    placeholder="0.000"
                    :class="{ error: $v.form.amount.$error }"
                    @input="$v.form.amount.$touch()"
                  />
                  <div v-if="$v.form.amount.$error">
                    <p v-if="!$v.form.amount.required" class="errorMsg">
                      Amount is required
                    </p>
                    <p v-if="!$v.form.amount.minValue" class="errorMsg">
                      Amount Should be greater then 0.
                    </p>
                  </div>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput
                    type="date"
                    label="Dated"
                    v-model="form.dated"
                    :class="{ error: $v.form.dated.$error }"
                    @input="$v.form.dated.$touch()"
                  />
                  <div v-if="$v.form.dated.$error">
                    <p v-if="!$v.form.dated.required" class="errorMsg">
                      Date is required
                    </p>
                  </div>
                </CCol>
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import Loader from "@/components/layouts/Loader.vue";
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import ReturnByProductService from "@/services/returns/ReturnByProductService";
import ProductReturnPaymentService from "@/services/returns/ProductReturnPaymentService";
import { required, minValue } from "vuelidate/lib/validators";
// import Multiselect from "vue-multiselect";
// import InvoiceService from "@/services/sale/InvoiceService";
import { globalMixin } from "@/mixins/globalMixin";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "ReturnPaymentForm",
  mixins: [globalMixin],
  components: {
    Loader,
    // Multiselect,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => ({}),
    },
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      product_return_id: "",
      payment_method_id: "",
      amount: "",
      dated: "",
      previousValue: Object,
    },
    // display_images: null,
    options: {
      paymentMethods: [{ label: "Choose Payment Method", value: "" }],
      invoice: [],
    },
    sales_persons: [],
    previousSalesPersons: [],
  }),
  validations() {
    return {
      form: {
        // product_return_id: { required },
        payment_method_id: { required },
        amount: { required, minValue: minValue(1) },
        dated: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.form.dated = this.calculateTodayDate();
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

    // this.getReturns();
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        if (this.isEditing) {
          this.updatePayment();
        } else {
          this.savePayment();
        }
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
    editData(val) {
      console.log(val);
      if (val && val.uuid) {
        this.isEditing = true;
        this.form.id = val.uuid;
        // if (val.invoice) {
        //   this.form.invoice_id = {
        //     label: val.invoice.invoice_ref_no,
        //     value: val.invoice.uuid,
        //   };
        // }

        this.form.payment_method_id = val.payment_method.uuid;
        this.form.amount = val.amount;
        this.form.dated = val.dated;

        this.$nextTick(() => {
          this.$v.$touch();
        });
      } else {
        this.isEditing = false;
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    getReturns() {
      this.options.returns = [];
      ReturnByProductService.getAll(1, 100)
        .then(({ data }) => {
          // console.log(data);

          let returns = this.options.returns;
          data.data.map((value, index) => {
            returns.push(value);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    invoiceChange() {
      const { invoice } = this.form.invoice_id;
      // console.log(invoice);
      if (invoice) {
        // this.resetForm();
        // console.log(invoice);
        // if (invoice.customer) {
        //   let number = invoice.customer.contact?.number?.en ?? "";
        //   this.form.customer = invoice.customer.uuid;
        //   this.form.previousValue = {
        //     label: invoice.customer.full_name + " (mobile: " + number + ")",
        //     value: invoice.customer.uuid,
        //   };
        // }
        // this.form.amount = invoice.balance;
      }
    },
    resetForm() {
      this.form.product_return_id = "";
      // this.form.sales_persons = [];
      this.form.payment_method_id = "";
      this.form.amount = "";
      this.form.dated = "";
      this.form.previousValue = Object;
      this.$v.$reset();
      this.form.dated = this.calculateTodayDate();
    },
    savePayment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");

        let data = this.form;
        ProductReturnPaymentService.store(data)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Added Successfully",
                timer: 3600,
              });

              this.resetForm();
              this.getInvoices();
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
    },
    updatePayment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.form.product_return_id = this.$route.params.id;
        let data = this.form;
        ProductReturnPaymentService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Updated Successfully",
                timer: 3600,
              });
              this.resetForm();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
  },
};
</script>
