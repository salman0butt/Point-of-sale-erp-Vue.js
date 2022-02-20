<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader v-if="!isEditing">
            {{ isEditing ? "Edit" : "New" }} Quotation
          </CCardHeader>
          <form @submit.prevent="formSubmit()">
            <CCardBody>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CustomerSearchField
                    @customerSelected="customerSelected($event)"
                    v-model="form.customer"
                    :class="{ error: $v.form.customer.$error }"
                    @input="$v.form.customer.$touch()"
                    :previousValueCustomer="previousValueCustomer"
                  />
                  <div v-if="$v.form.customer.$error">
                    <p v-if="!$v.form.customer.required" class="errorMsg">
                      Customer is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Dated"
                    type="date"
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
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Due Date"
                    type="date"
                    v-model="form.due_date"
                    :class="{ error: $v.form.due_date.$error }"
                    @input="$v.form.due_date.$touch()"
                  />
                  <div v-if="$v.form.due_date.$error">
                    <p v-if="!$v.form.due_date.required" class="errorMsg">
                      Due Date is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <SelectSalePerson
                    @salesPersonSelected="salesPersonSelected($event)"
                    v-model="form.sales_persons"
                    :class="{ error: $v.form.sales_persons.$error }"
                    @input="$v.form.sales_persons.$touch()"
                    :previousSalesPersons="previousSalesPersons"
                  />
                  <div v-if="$v.form.sales_persons.$error">
                    <p v-if="!$v.form.sales_persons.required" class="errorMsg">
                      Sales person is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Payment Terms"
                    :options="options.payment_terms"
                    :value.sync="form.payment_terms"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2" v-if="isEditing">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                    @change="$v.form.status.$touch()"
                    :class="{ error: $v.form.status.$error }"
                  />
                  <div v-if="$v.form.status.$error">
                    <p v-if="!$v.form.status.required" class="errorMsg">
                      Status is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <SearchProduct
                    searchType="quotation"
                    :itemsData="form.items"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInput label="Sub Total" readonly :value="subTotal" />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInput label="Tax Total" readonly :value="taxTotal" />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInput
                    label="Total Discount"
                    readonly
                    :value="totalDiscount"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInput label="Total" readonly :value="allTotal" />
                </CCol>

                <CCol sm="12" md="12" class="pt-2">
                  <Label>Payment Terms </Label>
                  <vue-editor
                    v-model="form.payment_terms"
                    :editor-toolbar="customToolbar"
                  ></vue-editor>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <CTextarea
                    label="Note"
                    placeholder="Content..."
                    v-model="form.note"
                  />
                </CCol>

                <CCol sm="12" md="12" class="pt-2">
                  <app-upload ref="fileUpload" @file:changed="handleFile" />

                  <div
                    v-if="display_images && display_images.length"
                    class="attachment-display"
                  >
                    <ul class="mt-5">
                      <li
                        v-for="(img, index) in display_images"
                        v-bind:key="index"
                        class="display-attachment-row"
                      >
                        <CIcon :content="$options.cisFile" />
                        <a
                          v-bind:href="img.path"
                          target="_blank"
                          class="name-attachment"
                        >
                          {{ img.name }}</a
                        >
                        <a
                          @click.prevent="deleteAttachment(img.uuid)"
                          class="delete-attachment"
                        >
                          <CIcon :content="$options.cilTrash" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </CCol>

                <CRow class="mt-4">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="float: right; width: 200px; margin-left: 20px"
                    type="submit"
                    >Save & Exit</CButton
                  >
                </CRow>
              </CRow>
            </CCardBody>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CustomerSearchField from "@/components/general/CustomerSearchField";
import SearchProduct from "@/components/layouts/SearchProduct";
import SelectSalePerson from "@/components/general/SelectSalePerson";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import QuotationService from "@/services/sale/QuotationService";
import { cilTrash, cisFile } from "@coreui/icons-pro";
import { globalMixin } from "@/mixins/globalMixin";
import PaymentTermService from "@/services/paymentTerms/PaymentTermService";
import { VueEditor } from "vue2-editor";

export default {
  name: "CreateBrand",
  mixins: [globalMixin],
  components: {
    CustomerSearchField,
    SearchProduct,
    SelectSalePerson,
    AppUpload,
    VueEditor,
  },
  cilTrash,
  cisFile,
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      customer: "",
      dated: "",
      due_date: "",
      sales_persons: "",
      note: "",
      items: [],
      images: [],
      status: "pending",
      payment_terms: "",
    },
    options: {
      status: [
        { label: "Pending", value: "pending", selected: true },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      payment_terms: [
        {
          label: "Choose Payment Term",
          value: "",
          selected: true,
          disabled: "",
        },
      ],
    },
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    sales_persons: [],
    display_images: [],
    previousValueCustomer: Object,
    previousSalesPersons: Array,
  }),
  validations() {
    return {
      form: {
        customer: { required },
        dated: { required },
        due_date: { required },
        sales_persons: { required },
        status: { required },
      },
    };
  },
  created() {
    this.createMethod();
  },
  computed: {
    receivingItems() {
      return this.$store.getters.getSearchProductItems;
    },
    subTotal() {
      return this.$store.getters.getQuotationSubTotal;
    },
    taxTotal() {
      return this.$store.getters.getQuotationTaxTotal;
    },
    totalDiscount() {
      return this.$store.getters.getQuotationDiscount;
    },
    allTotal() {
      return this.$store.getters.getQuotationTotal;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_search_product_items", []);
    this.$store.commit("set_quotation_sub_total", 0);
    this.$store.commit("set_quotation_tax_total", 0);
    this.$store.commit("set_quotation_total_discount", 0);
    this.$store.commit("set_quotation_total", 0);
  },
  watch: {
    // total_cost(val) {
    //   this.form.total_cost = val;
    // },
    receivingItems(val) {
      this.form.items = val;
    },
  },
  methods: {
    createMethod() {
      this.form.id = this.$route.params.id;
      this.form.dated = this.calculateTodayDate();
      this.form.due_date = this.calculateDueDate();
      if (this.form.id !== "" && this.form.id !== undefined) {
        this.isEditing = true;
        this.getEditData();
      }

      // Payment Terms
      PaymentTermService.getAll(1, 1000)
        .then(({ data }) => {
          let paymentTerms = this.options.payment_terms;
          data.data.map((value, index) => {
            paymentTerms.push({ label: value.name, value: value.description });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("dated", this.form.dated);
        formData.append("due_date", this.form.due_date);
        formData.append("customer", this.form.customer);
        formData.append("sales_persons", this.form.sales_persons);
        formData.append("note", this.form.note);
        formData.append("status", this.form.status);
        formData.append("payment_terms", this.form.payment_terms);
        formData.append("items", JSON.stringify(this.form.items));
        formData.append("sub_total", this.$store.getters.getQuotationSubTotal);
        formData.append("total_tax", this.$store.getters.getQuotationTaxTotal);
        formData.append(
          "total_discount",
          this.$store.getters.getQuotationDiscount
        );
        formData.append("grand_total", this.$store.getters.getQuotationTotal);

        if (this.form.images && this.form.images.length > 0) {
          this.form.images.map((image) => {
            formData.append("images[]", image);
          });
        }

        if (!this.isEditing) {
          QuotationService.create(formData, config)
            .then((res) => {
              if (res.status == 201) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Quotation Added Successfully",
                  timer: 3600,
                });
                // this.$v.$reset();
                // this.resetForm();
                this.$store.commit("close_loader");
                this.$router.push({ path: "/sales/quotations/index" });
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
        } else {
          formData.append("_method", "PUT");

          QuotationService.update(this.form.id, formData, config)
            .then((res) => {
              // console.log(res);
              if (res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Quotation Updated Successfully",
                  timer: 3600,
                });
                this.$store.commit("close_loader");
                this.$router.push({ path: "/sales/quotations/index" });
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
      }
    },
    customerSelected(customer) {
      this.form.customer = customer;
    },
    salesPersonSelected(person) {
      this.form.sales_persons = person;
    },
    handleFile(files) {
      this.form.images = Object.values(files);
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
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_images = this.display_images.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                console.log(err);
              });
          }
        });
    },
    getEditData() {
      QuotationService.get(this.form.id)
        .then((res) => {
          if (res.status == 200) {
            this.isEditing = true;
            this.form.customer = res.data.customer.uuid;
            this.form.dated = res.data.dated;
            this.form.due_date = res.data.due_date;
            this.form.note = res.data.note;
            this.form.status = res.data.status;
            this.form.payment_terms = res.data.payment_terms;

            this.form.sales_persons = [];
            if (res.data.salespersons && res.data.salespersons.length > 0) {
              let sales_persons = this.form.sales_persons;
              res.data.salespersons.map(function (item) {
                sales_persons.push(item.uuid);
              });
            }

            // this.form.sales_persons
            this.display_images = [];
            if (res.data.attachments && res.data.attachments.length > 0) {
              let display_images = this.display_images;
              res.data.attachments.map(function (item) {
                display_images.push(item);
              });
            }

            if (res.data.products && res.data.products.length > 0) {
              res.data.products.map((item) => {
                let total_each = 0;
                if (!item.discount_per) {
                  total_each =
                    (parseFloat(item.selling_price) + parseFloat(item.tax)) *
                      parseInt(item.qty) -
                    parseFloat(item.discount);
                } else {
                  total_each =
                    (parseFloat(item.selling_price) + parseFloat(item.tax)) *
                    parseInt(item.qty);
                  total_each = total_each - total_each * (item.discount / 100);
                }

                this.form.items.push({
                  uuid: item.product.uuid,
                  type: "product",
                  name: item.product.name.en,
                  unit_price: item.selling_price ?? 0,
                  tax_price: item.tax ?? 0,
                  qty: item.qty,
                  description: item.description,
                  weight_unit: item.product.weight_unit,
                  discount: item.discount_per
                    ? item.discount + "%"
                    : item.discount,
                  total: total_each,
                });
              });
              // this.$store.commit("set_search_product_items", itemsData);
            }

            this.$store.commit("set_quotation_sub_total", res.data.sub_total);
            this.$store.commit("set_quotation_tax_total", res.data.total_tax);
            this.$store.commit(
              "set_quotation_total_discount",
              res.data.total_discount
            );
            this.$store.commit("set_quotation_total", res.data.grand_total);

            this.previousValueCustomer = res.data.customer;
            this.previousSalesPersons = res.data.salespersons;
          }
        })
        .catch((error) => {
          console.log(error);
          // this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
    },
  },
};
</script>
