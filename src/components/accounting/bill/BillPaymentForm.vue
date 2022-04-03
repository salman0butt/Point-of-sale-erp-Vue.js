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
                  <label> Select Bill </label>
                  <multiselect
                    v-model="form.bill"
                    :options="options.bills"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Search..."
                    label="label"
                    track-by="label"
                    @input="[billChange(), $v.form.bill.$touch()]"
                    :class="{ error: $v.form.bill.$error }"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                  <div v-if="$v.form.bill.$error">
                    <p v-if="!$v.form.bill.required" class="errorMsg">Bill is required</p>
                  </div>
                </CCol>
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
                  <SupplierSearch
                    :isDisabled="true"
                    @supplier-change="supplierChange($event)"
                    :previousValue="form.previousValue"
                    @input="$v.form.supplier_id.$touch()"
                  />
                  <div v-if="$v.form.supplier_id.$error">
                    <p v-if="!$v.form.supplier_id.required" class="errorMsg">
                      Supplier is required
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
                    min="0"
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
                <!-- <CCol sm="12" md="12" class="pt-2">
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
                </CCol> -->
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
import BillPaymentService from "@/services/accounting/bill/BillPaymentService";
import { required, minValue } from "vuelidate/lib/validators";
import SupplierSearch from "@/components/general/search/SupplierSearch";
// import SelectSalePerson from "@/components/general/SelectSalePerson";
import Multiselect from "vue-multiselect";
import BillService from "@/services/accounting/bill/BillService";
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
// import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";
import { globalMixin } from "@/mixins/globalMixin";

export default {
  name: "BillPaymentForm",
  mixins: [globalMixin],
  components: {
    Loader,
    SupplierSearch,
    // SelectSalePerson,
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
      bill: "",
      payment_method_id: "",
      // image: "",
      supplier_id: "",
      amount: "",
      dated: "",
      sales_persons: "",
      previousValue: null,
    },
    // display_images: null,
    options: {
      paymentMethods: [{ label: "Choose Payment Method", value: "" }],
      bills: [],
    },
    sales_persons: [],
    previousSalesPersons: [],
  }),
  validations() {
    return {
      form: {
        bill: { required },
        supplier_id: { required },
        // sales_persons: { required },
        payment_method_id: { required },
        amount: { required, minValue: minValue(1) },
        dated: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    // Payment Methods display
    this.form.dated = this.calculateTodayDate();
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

    this.getBills();

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
        if (val.bill) {
          this.form.bill = {
            label: val.bill.bill_no,
            value: val.bill.uuid,
          };
        }
        if (val.supplier) {
          let serial = val.supplier.serial_no ?? "";
          this.form.supplier_id = val.supplier.uuid;
          this.form.previousValue = {
            label: val.supplier.name + " (serial: " + serial + ")",
            value: val.supplier.uuid,
          };
        } else {
          this.form.supplier_id = "";
          this.form.previousValue = {};
        }

        // if (val.bill && val.bill.salespersons) {
        //   this.form.sales_persons = val.bill.salespersons.map((value) => {
        //     return value.uuid;
        //   });
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
    getBills() {
      this.options.bills = [];
      BillService.getAll(1, 100)
        .then(({ data }) => {
          let bill = this.options.bills;
          data.data.map((value, index) => {
            bill.push({
              label: value.bill_no,
              value: value.uuid,
              bill: value,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    supplierChange(val) {
      this.form.supplier_id = val;
    },
    salesPersonSelected(person) {
      this.form.sales_persons = person;
    },
    // billChange() {
    //   let bill = this.form.bill;
    //   if (bill && bill.value) {
    //     // this.resetForm();
    //     // this.getEditData(bill.value);
    //   } else {
    //     // this.resetForm();
    //   }
    // },
    resetForm() {
      this.form.id = "";
      this.form.bill = "";
      this.form.supplier_id = null;
      // this.form.sales_persons = [];
      this.form.payment_method_id = "";
      this.form.amount = "";
      this.form.dated = "";
      this.form.previousValue = {};
      this.$v.$reset();
      this.form.dated = this.calculateTodayDate();
    },
    savePayment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");

        let data = this.formData();
        BillPaymentService.store(data)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Payment Added Successfully",
                timer: 3600,
              });

              this.resetForm();
              this.getBills();
            }
            this.$store.commit("close_loader");
          })
          .catch((error) => {
            this.$store.commit("close_loader");
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
    billChange() {
      const { bill } = this.form.bill;
      if (bill) {
        // this.resetForm();
        console.log(bill);
        if (bill.supplier) {
          let serial = bill.supplier.serial_no ?? "";
          this.form.supplier_id = bill.supplier.uuid;
          this.form.previousValue = {
            label: bill.supplier.name + " (serial: " + serial + ")",
            value: bill.supplier.uuid,
          };
        }

        this.form.amount = bill.balance;
      }
      //  else {
      //   this.resetForm();
      // }
    },
    formData(update = false) {
      let data = this.form;
      let formData = new FormData();
      formData.append("bill_id", data.bill.value);
      formData.append("supplier_id", data.supplier_id.value);
      formData.append("payment_method_id", data.payment_method_id);
      formData.append("amount", data.amount);
      formData.append("dated", data.dated);
      // formData.append("sales_persons", data.sales_persons);

      if (update) {
        formData.append("_method", "PATCH");
      }
      return formData;
    },
    updatePayment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let data = this.formData(true);
        BillPaymentService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Payment Updated Successfully",
                timer: 3600,
              });
              this.resetForm();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
  },
};
</script>
