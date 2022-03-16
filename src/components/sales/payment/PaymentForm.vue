<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="savePayment()">
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
                    @input="invoiceChange()"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <Label> Payment Method</Label>
                  <CSelect
                    :options="options.paymentMethods"
                    :value.sync="form.paymentMethod"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <CustomerSearch
                    :previousValue="form.previousValue"
                    @customer-change="customerSelected($event)"
                    :createOnly="isEditing ? false : true"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput
                    type="number"
                    label="Amount"
                    v-model="form.amount"
                    placeholder="0.000"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput type="date" label="Dated" v-model="form.dated" />
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
import { required } from "vuelidate/lib/validators";
import CustomerSearch from "@/components/general/search/CustomerSearch";
import SelectSalePerson from "@/components/general/SelectSalePerson";
import Multiselect from "vue-multiselect";
import InvoiceService from "@/services/sale/InvoiceService";

import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "CreateOrUpdatePayment",
  components: {
    AppUpload,
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
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      invoice_id: "",
      paymentMethod: "",
      image: "",
      customer: "",
      amount: "",
      dated: "",
      sales_persons: "",
      previousValue: Object,
    },
    display_images: null,
    options: {
      paymentMethods: [{ label: "Choose Payment Method", value: "" }],
      invoice: [
        {
          label: "Choose Invoice",
          value: "",
          selected: true,
        },
      ],
    },
    sales_persons: [],
    previousSalesPersons: [],
  }),
  validations() {
    return {
      form: {
        paymentMethod: { required },
        sales_persons: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
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

    InvoiceService.getAll(1, 100)
      .then(({ data }) => {
        let invoice = this.options.invoice;
        data.data.map((value, index) => {
          invoice.push({
            label: value.invoice_ref_no,
            value: value.uuid,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getBrand();
    // }
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.savePayment();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    customerSelected(customer) {
      this.form.customer = customer.value;
    },
    salesPersonSelected(person) {
      this.form.sales_persons = person;
    },
    invoiceChange() {
      let invoice_id = this.form.invoice_id;
      if (invoice_id && invoice_id.value) {
        // this.resetForm();
        // this.getEditData(invoice_id.value);
      } else {
        // this.resetForm();
      }
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.sales_persons = [];
    },
    savePayment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");

        let data = this.form;
        PaymentInvoiceService.store(data)
          .then(({ data }) => {
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
    // updateBrand() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let formData = new FormData();
    //     formData.append("name", this.form.name);
    //     formData.append("status", this.form.status);
    //     formData.append("image", this.form.image);
    //     formData.append("parent_id", this.form.parent_id);
    //     formData.append("_method", "PATCH");

    //     const config = {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     BrandService.update(this.form.id, formData, config)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.displayData(res.data);
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Brand Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.$store.commit("close_loader");
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/catalogs/brands/index" });
    //           }
    //           //  else {
    //           //   this.$router.push({
    //           //     path: "/catalogs/brands/edit/" + res.data.uuid,
    //           //   });
    //           // }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    // getBrand() {
    //   this.$store.commit("set_loader");
    //   BrandService.get(this.form.id)
    //     .then(({ data }) => {
    //       this.displayData(data);
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.$store.commit("close_loader");
    //       this.isEditing = false;
    //       this.$router.push({ path: "/catalogs/brands/index" });
    //     });
    // },
    // displayData(data = null) {
    //   if (data != null && data != "") {
    //     this.resetForm();
    //     this.isEditing = true;
    //     this.form.id = data.uuid;
    //     this.form.name = data.name;
    //     if (data.parent_id !== "" && data.parent_id !== null) {
    //       this.form.parent_id = data.parent_id ?? "";
    //     }
    //     this.form.status = data.status;
    //     this.display_images = data.image ?? "";
    //     this.form.image = "";
    //   }
    // },
    handleFile(files) {
      this.form.image = files[0];
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Do you want to delete this Attachment",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$store.commit("set_loader");
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_images = null;
                  this.$store.commit("close_loader");
                }
              })
              .catch((err) => {
                console.log(err);
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                this.$store.commit("close_loader");
                console.log(err);
              });
          }
        });
    },
  },
};
</script>
