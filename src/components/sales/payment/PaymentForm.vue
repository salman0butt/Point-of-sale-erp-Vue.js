<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="isEditing ? updatePayment() : savePayment()">
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <label> Select Invoice </label>
                  <multiselect
                    v-model="form.invoice_id"
                    :options="options.invoice"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Search..."
                    label="label"
                    track-by="label"
                    @input="[invoiceChange(), $v.form.invoice_id.$touch()]"
                    :class="{ error: $v.form.invoice_id.$error }"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                  <div v-if="$v.form.invoice_id.$error">
                    <p v-if="!$v.form.invoice_id.required" class="errorMsg">
                      Invoice is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <Label> Payment Method</Label>
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
                  <CustomerSearch
                    :isDisabled="true"
                    :previousValue="form.previousValue"
                    @customer-change="customerSelected($event)"
                    :createOnly="isEditing ? false : true"
                    @input="$v.form.customer.$touch()"
                  />
                  <div v-if="$v.form.customer.$error">
                    <p v-if="!$v.form.customer.required" class="errorMsg">
                      Customer is required
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
                <CCol sm="12" md="12" class="pt-2">
                  <SelectSalePerson
                    :createOnly="isEditing ? false : true"
                    @salesPersonSelected="salesPersonSelected($event)"
                    v-model="form.sales_persons"
                    :class="{ error: $v.form.sales_persons.$error }"
                    @input="$v.form.sales_persons.$touch()"
                    :previousSalesPersons="previousSalesPersons"
                    label="Recieved By"
                  />
                  <div v-if="$v.form.sales_persons.$error">
                    <p v-if="!$v.form.sales_persons.required" class="errorMsg">
                      Sales person is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <!-- <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <label for="brand_logo">{{ $t("brands.form.logo") }}</label>
                  <app-upload
                    ref="fileUpload"
                    class="col-md-12"
                    :max="1"
                    fileType="image/jpg,image/jpeg,image/png"
                    @file:changed="handleFile"
                  />

                  <div
                    v-if="display_images && isEditing"
                    class="attachment-display"
                  >
                    <ul class="mt-5 d-flex">
                      <li class="display-attachment-row">
                        <div>
                          <span>
                            <img
                              v-bind:src="display_images.path"
                              class="name-attachment"
                              style="max-width: 80px"
                            />
                          </span>
                        </div>
                        <span
                          >{{ display_images.name }}
                          <a
                            @click.prevent="
                              deleteAttachment(display_images.uuid)
                            "
                            class="delete-attachment"
                          >
                            <CIcon :content="$options.cilTrash" /> </a
                        ></span>
                      </li>
                    </ul>
                  </div>
                </CCol>
              </CRow> -->
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
import { required, minValue } from "vuelidate/lib/validators";
import CustomerSearch from "@/components/general/search/CustomerSearch";
import SelectSalePerson from "@/components/general/SelectSalePerson";
import Multiselect from "vue-multiselect";
import InvoiceService from "@/services/sale/InvoiceService";
import { globalMixin } from "@/mixins/globalMixin";
// import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "PaymentForm",
  mixins: [globalMixin],
  components: {
    Loader,
    CustomerSearch,
    SelectSalePerson,
    Multiselect,
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
      invoice_id: "",
      paymentMethod: "",
      // image: "",
      customer: "",
      amount: "",
      dated: "",
      sales_persons: "",
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
        invoice_id: { required },
        customer: { required },
        sales_persons: { required },
        paymentMethod: { required },
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

    this.getInvoices();

    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getBrand();
    // }
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
      if (val && val.uuid) {
        this.isEditing = true;
        this.form.id = val.uuid;
        if (val.invoice) {
          this.form.invoice_id = {
            label: val.invoice.invoice_ref_no,
            value: val.invoice.uuid,
          };
        }
        if (val.customer) {
          let number = val.customer.contact?.number?.en ?? "";
          this.form.customer = val.customer.uuid;
          this.form.previousValue = {
            label: val.customer.full_name + " (mobile: " + number + ")",
            value: val.customer.uuid,
          };
        }

        if (val.invoice && val.invoice.salespersons) {
          this.form.sales_persons = val.invoice.salespersons.map((value) => {
            return value.uuid;
          });
        }

        this.form.paymentMethod = val.paymentMethod.uuid;
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
    getInvoices() {
      this.options.invoice = [];
      InvoiceService.getAll(1, 100)
        .then(({ data }) => {
          let invoice = this.options.invoice;
          data.data.map((value, index) => {
            invoice.push({
              label: value.invoice_ref_no,
              value: value.uuid,
              invoice: value,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    customerSelected(customer) {
      this.form.customer = customer.value;
    },
    salesPersonSelected(person) {
      this.form.sales_persons = person;
    },
    invoiceChange() {
      const { invoice } = this.form.invoice_id;
      console.log(invoice);
      if (invoice) {
        // this.resetForm();
        console.log(invoice);
        if (invoice.customer) {
          let number = invoice.customer.contact?.number?.en ?? "";
          this.form.customer = invoice.customer.uuid;
          this.form.previousValue = {
            label: invoice.customer.full_name + " (mobile: " + number + ")",
            value: invoice.customer.uuid,
          };
        }

        if (invoice.salespersons) {
          this.form.sales_persons = invoice.salespersons.map((value) => {
            return value.uuid;
          });
        }

        this.form.amount = invoice.balance;
      }
      // else {
      // this.resetForm();
      // }
    },
    resetForm() {
      this.form.invoice_id = "";
      this.form.customer = "";
      // this.form.sales_persons = [];
      this.form.paymentMethod = "";
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
        PaymentInvoiceService.store(data)
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
        let data = this.form;
        PaymentInvoiceService.update(this.form.id, data)
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
