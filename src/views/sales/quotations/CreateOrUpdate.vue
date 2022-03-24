<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader v-if="!isEditing">
            {{ isEditing ? "Edit" : "New" }} Quotation
          </CCardHeader>
          <form @submit.prevent="formSubmit()">
            <CCardBody>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CustomerSearch
                    :previousValue="form.previousValue"
                    @customer-change="customerSelected($event)"
                    :createOnly="isEditing ? false : true"
                  />
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
                    :createOnly="isEditing ? false : true"
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
                <CCol
                  sm="6"
                  md="4"
                  class="pt-2"
                  v-if="show.show_payment_term_on_quotation"
                >
                  <CSelect
                    label="Payment Terms"
                    :options="options.payment_terms"
                    :value.sync="form.payment_terms"
                  />
                </CCol>

                <CCol sm="6" md="4" class="pt-2" v-if="isEditing">
                  <CSelect
                    label="Status"
                    :options="options.quotation_status"
                    :value.sync="form.quotation_status"
                    @change="$v.form.quotation_status.$touch()"
                    :class="{ error: $v.form.quotation_status.$error }"
                  />
                  <div v-if="$v.form.quotation_status.$error">
                    <p
                      v-if="!$v.form.quotation_status.required"
                      class="errorMsg"
                    >
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
                <CCol sm="12" md="12">
                  <div v-if="$v.form.items.$error">
                    <p v-if="!$v.form.items.required" class="errorMsg">
                      Please Select Atlease One Product
                    </p>
                  </div>
                </CCol>
                <CCol
                  :sm="delivery_check ? 6 : 12"
                  :md="delivery_check ? 6 : 12"
                  class="pt-2"
                  v-if="show.show_delivery_on_quotation"
                >
                  <CSelect
                    @change="changeDelivery($event)"
                    label="Delivery"
                    :options="options.delivery_methods"
                    :value.sync="form.delivery_method"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2" v-if="delivery_check">
                  <CInput label="Address" v-model="form.address_for_delivery" />
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

                <CCol sm="3" md="3" class="pt-2" v-if="delivery_check">
                  <CInput
                    label="Delivery"
                    readonly
                    :value="form.delivery_method_price"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2" v-if="delivery_check">
                  <CInput
                    label="Total Price With Delivery"
                    readonly
                    :value="form.total_price_with_delivery"
                  />
                </CCol>

                <CCol
                  sm="12"
                  md="12"
                  class="pt-2"
                  v-if="show.show_payment_term_on_quotation"
                >
                  <Label>Payment Terms </Label>
                  <vue-editor
                    id="editor1"
                    v-model="form.payment_terms"
                    :editor-toolbar="customToolbar"
                  ></vue-editor>
                </CCol>
                <CCol
                  sm="12"
                  md="12"
                  class="pt-2"
                  v-if="show.show_terms_and_conditions_on_quotation"
                >
                  <Label>Terms And Conditions </Label>
                  <vue-editor
                    id="editor2"
                    v-model="form.terms_and_conditions"
                    :editor-toolbar="customToolbar"
                  ></vue-editor>
                </CCol>
                <CCol
                  sm="12"
                  md="12"
                  class="pt-2"
                  v-if="show.show_note_on_quotation"
                >
                  <CTextarea
                    ref="Note"
                    label="Note"
                    placeholder="Content..."
                    v-model="form.note"
                  />
                </CCol>

                <CCol
                  sm="12"
                  md="12"
                  class="pt-2"
                  v-if="show.show_attachment_on_quotation"
                >
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
                    @click="saveAndExit = false"
                    >Save & Continue</CButton
                  >
                  <CButton
                    timeout="2000"
                    block
                    color="danger"
                    style="
                      float: right;
                      width: 140px;
                      margin-left: 20px;
                      margin-top: 0;
                    "
                    @click="saveAndExit = true"
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
import CustomerSearch from "@/components/general/search/CustomerSearch";
import SearchProduct from "@/components/layouts/SearchProduct";
import SelectSalePerson from "@/components/general/SelectSalePerson";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import QuotationService from "@/services/sale/QuotationService";
import { cilTrash, cisFile } from "@coreui/icons-pro";
import { globalMixin } from "@/mixins/globalMixin";
import PaymentTermService from "@/services/paymentTerms/PaymentTermService";
import { VueEditor } from "vue2-editor";
import SettingService from "@/services/settings/SettingService";
import DeliveryService from "@/services/delivery/DeliveryService";
import Loader from "@/components/layouts/Loader";
export default {
  name: "CreateOrUpdateQuotations",
  mixins: [globalMixin],
  components: {
    CustomerSearch,
    SearchProduct,
    SelectSalePerson,
    AppUpload,
    VueEditor,
    Loader,
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
      payment_terms: "",
      terms_and_conditions: "",
      previousCustomer: "",
      delivery_method: "",
      delivery_method_price: 0,
      total_price_with_delivery: 0,
      address_for_delivery: "",
      quotation_status: "pending",
    },
    options: {
      quotation_status: [
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
      delivery_methods: [
        {
          label: "Choose Delivery Method",
          value: "",
          selected: true,
        },
      ],
    },
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    terms: [
      {
        key: "invoice_term_and_condition",
        label: "Invoice",
        data: "",
      },
      {
        key: "quotation_term_and_condition",
        label: "Quotation ",
        data: "",
      },
      {
        key: "purchase_order_term_and_condition",
        label: "Purchase Orders",
        data: "",
      },
    ],
    sales_persons: [],
    display_images: [],
    previousSalesPersons: [],
    delivery_check: false,
    saveAndExit: false,
    show: {
      show_payment_term_on_quotation: false,
      show_terms_and_conditions_on_quotation: false,
      show_note_on_quotation: false,
      show_attachment_on_quotation: false,
      show_delivery_on_quotation: false,
    },
  }),
  validations() {
    return {
      form: {
        customer: { required },
        dated: { required },
        due_date: { required },
        sales_persons: { required },
        quotation_status: { required },
        items: { required },
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
    receivingItems(val) {
      this.form.items = val;
    },
  },
  mounted() {
    // this.$refs.Note.$el.focus();
    // this.focusInput();
  },
  methods: {
    // focusInput() {
    //   this.$refs.Note.focus();
    // },
    changeDelivery(e) {
      let rate_on_customer =
        e.target.selectedOptions[0].getAttribute("rate_on_customer");
      if (rate_on_customer == null) {
        rate_on_customer = 0;
      }
      this.delivery_check = true;
      this.form.delivery_method_price = rate_on_customer;
      let quotation_total = this.$store.getters.getQuotationTotal;
      let total_price_with_delivery =
        parseFloat(quotation_total) + parseFloat(rate_on_customer);
      this.form.total_price_with_delivery =
        total_price_with_delivery.toFixed(3);

      if (!e.target.selectedOptions[0].value) {
        this.delivery_check = false;
      }
    },
    async createMethod() {
      this.$store.commit("set_loader");

      await new Promise((resolve, reject) => {
        // Setting of Quotation
        SettingService.getAll("general")
          .then(({ data }) => {
            if (data) {
              data.forEach((item) => {
                if (item.key == "show_payment_term_on_quotation") {
                  this.show.show_payment_term_on_quotation =
                    item.value == "on" ? true : false;
                } else if (
                  item.key == "show_terms_and_conditions_on_quotation"
                ) {
                  this.show.show_terms_and_conditions_on_quotation =
                    item.value == "on" ? true : false;
                } else if (item.key == "show_note_on_quotation") {
                  this.show.show_note_on_quotation =
                    item.value == "on" ? true : false;
                } else if (item.key == "show_attachment_on_quotation") {
                  this.show.show_attachment_on_quotation =
                    item.value == "on" ? true : false;
                } else if (item.key == "show_delivery_on_quotation") {
                  this.show.show_delivery_on_quotation =
                    item.value == "on" ? true : false;
                }
              });
            }
          })
          .catch((error) => {
            this.$store.commit("close_loader");
            console.log(error);
          });

        // Payment Terms
        PaymentTermService.getAll(1, 1000)
          .then(({ data }) => {
            let paymentTerms = this.options.payment_terms;
            data.data.map((value, index) => {
              paymentTerms.push({
                label: value.name,
                value: value.description,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });

        // Terms And Conditions
        var terms_and_conditions = this.form.terms_and_conditions;
        SettingService.getAll("accounting")
          .then(({ data }) => {
            if (data) {
              data.map((item) => {
                this.terms.map((term) => {
                  if (term.key === item.key) {
                    if (item.key == "quotation_term_and_condition") {
                      let testing = item.value;
                      terms_and_conditions = testing;
                    }
                  }
                });
              });
            }
            this.$store.commit("close_loader");
            this.form.terms_and_conditions = terms_and_conditions;
          })
          .catch((error) => {
            this.$store.commit("close_loader");
            console.log(error);
          });

        // Delivery
        let delivery_methods = this.options.delivery_methods;
        this.$store.commit("set_loader");
        DeliveryService.getAll(1, 50)
          .then(({ data }) => {
            if (data && data.data && data.data.length > 0) {
              data.data.map((item, id) => {
                delivery_methods.push({
                  label: item.name,
                  value: item.uuid,
                  attrs: {
                    rate_on_customer: item.rate_on_customer,
                    id: item.uuid,
                  },
                });
              });
            }

            this.$store.commit("close_loader");
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
          });

        resolve();
      });

      this.form.id = this.$route.params.id;
      this.form.dated = this.calculateTodayDate();
      this.form.due_date = this.calculateDueDate();

      if (this.form.id !== "" && this.form.id !== undefined) {
        this.isEditing = true;
        this.getEditData();
      }
    },
    getEditData() {
      this.$store.commit("set_loader");
      QuotationService.get(this.form.id)
        .then((res) => {
          if (res.status == 200) {
            this.isEditing = true;
            this.form.previousValue = {
              value: res.data.customer.uuid,
              label:
                res.data.customer.full_name +
                " (mobile: " +
                res.data.customer.contact.number.en +
                ")",
              defaultAddress: res.data.address_for_delivery,
            };

            this.form.dated = res.data.dated;
            this.form.due_date = res.data.due_date;
            this.form.note = res.data.note;
            this.form.quotation_status = res.data.quotation_status;
            this.form.payment_terms = res.data.payment_terms;
            this.form.terms_and_conditions = res.data.terms_and_conditions;
            if (res.data.products && res.data.products.length > 0) {
              var Items = this.form.items;
              res.data.products.map((item) => {
                let total_each = 0;
                if (!item.discount_per) {
                  total_each =
                    (parseFloat(item.selling_price) + parseFloat(item.tax)) *
                      parseInt(Math.abs(item.qty)) -
                    parseFloat(item.discount);
                } else {
                  total_each =
                    (parseFloat(item.selling_price) + parseFloat(item.tax)) *
                    parseInt(Math.abs(item.qty));
                  total_each = total_each - total_each * (item.discount / 100);
                }

                Items.push({
                  uuid: item.product.uuid,
                  type: "product",
                  name: item.product.name.en,
                  unit_price: item.selling_price ?? 0,
                  tax_price: item.tax ?? 0,
                  qty: Math.abs(item.qty),
                  description: item.description,
                  weight_unit: item.product.weight_unit,
                  discount: item.discount_per
                    ? item.discount + "%"
                    : item.discount,
                  total: total_each,
                });
              });
            }

            if (res.data.delivery && res.data.delivery.uuid) {
              this.delivery_check = true;
              this.form.delivery_method = res.data.delivery.uuid;
              this.form.delivery_method_price = res.data.delivery_method_price;
              this.form.total_price_with_delivery =
                res.data.total_price_with_delivery;
            }

            this.form.sales_persons = [];
            if (res.data.salespersons && res.data.salespersons.length > 0) {
              let sales_persons = this.form.sales_persons;
              let previousSalesPersons = this.previousSalesPersons;
              res.data.salespersons.map(function (item) {
                sales_persons.push(item.uuid);
                previousSalesPersons.push(item);
              });
            }

            this.display_images = [];
            if (res.data.attachments && res.data.attachments.length > 0) {
              let display_images = this.display_images;
              res.data.attachments.map(function (item) {
                display_images.push(item);
              });
            }
            this.$store.commit("set_quotation_sub_total", res.data.sub_total);
            this.$store.commit("set_quotation_tax_total", res.data.total_tax);
            this.$store.commit(
              "set_quotation_total_discount",
              res.data.total_discount
            );
            this.$store.commit("set_quotation_total", res.data.grand_total);
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
    },
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("id", this.form.id);
        formData.append("dated", this.form.dated);
        formData.append("due_date", this.form.due_date);
        formData.append("customer", this.form.customer);
        formData.append("sales_persons", this.form.sales_persons);
        formData.append("note", this.form.note);
        formData.append("quotation_status", this.form.quotation_status);
        formData.append("payment_terms", this.form.payment_terms);
        formData.append("terms_and_conditions", this.form.terms_and_conditions);
        formData.append("items", JSON.stringify(this.form.items));
        formData.append("sub_total", this.$store.getters.getQuotationSubTotal);
        formData.append("total_tax", this.$store.getters.getQuotationTaxTotal);
        formData.append(
          "total_discount",
          this.$store.getters.getQuotationDiscount
        );
        formData.append("grand_total", this.$store.getters.getQuotationTotal);
        formData.append("address_for_delivery", this.form.address_for_delivery);
        formData.append("delivery_method", this.form.delivery_method);
        formData.append(
          "delivery_method_price",
          this.form.delivery_method_price
        );
        formData.append(
          "total_price_with_delivery",
          this.form.total_price_with_delivery
        );

        if (this.form.images && this.form.images.length > 0) {
          this.form.images.map((image) => {
            formData.append("images[]", image);
          });
        }
        this.$store.commit("set_loader");
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
                this.$store.commit("close_loader");
                if (this.saveAndExit) {
                  this.$router.push({ path: "/sales/quotations/index" });
                } else {
                  this.$router.push({
                    path: "/sales/quotations/show/" + res.data.uuid,
                  });
                }
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
          this.$store.commit("set_loader");
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
                if (this.saveAndExit) {
                  this.$router.push({ path: "/sales/quotations/index" });
                } else {
                  this.$router.push({
                    path: "/sales/quotations/show/" + res.data.uuid,
                  });
                }
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
      this.form.customer = customer.value;
      if (customer && customer.defaultAddress) {
        let address = "";
        if (customer.defaultAddress.flat) {
          address +=
            "Flat #" + customer.defaultAddress.flat.en + ", " ??
            customer.defaultAddress.flat + ", ";
        }
        if (customer.defaultAddress.floor) {
          address +=
            "Floor #" + customer.defaultAddress.floor.en + ", " ??
            customer.defaultAddress.floor + ", ";
        }
        if (customer.defaultAddress.building) {
          address +=
            "Building #" + customer.defaultAddress.building.en + ", " ??
            customer.defaultAddress.building + ", ";
        }
        if (customer.defaultAddress.street) {
          address +=
            "Street #" + customer.defaultAddress.street.en + ", " ??
            customer.defaultAddress.street + ", ";
        }
        if (customer.defaultAddress.block) {
          address +=
            "Block #" + customer.defaultAddress.block.en + ", " ??
            customer.defaultAddress.block + ", ";
        }
        if (customer.defaultAddress.area) {
          address +=
            "Area #" + customer.defaultAddress.area.en + ", " ??
            customer.defaultAddress.area + ", ";
        }
        //for previous address from invoice otherwise the default address for customer
        if (typeof customer.defaultAddress == "string") {
          this.form.address_for_delivery = customer.defaultAddress;
        } else {
          this.form.address_for_delivery = address;
        }
      } else {
        this.form.address_for_delivery = "";
      }
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
  },
};
</script>

<style>
#editor1 {
  height: 120px;
}
#editor2 {
  height: 120px;
}
</style>
