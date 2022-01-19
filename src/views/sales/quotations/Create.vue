<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Quotation </CCardHeader>
          <form @submit.prevent="formSubmit()">
            <CCardBody>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CustomerSearchField
                    @customerSelected="customerSelected($event)"
                    v-model="form.customer"
                    :class="{ error: $v.form.customer.$error }"
                    @input="$v.form.customer.$touch()"
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
                    label="Dated"
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
                  />
                  <div v-if="$v.form.sales_persons.$error">
                    <p v-if="!$v.form.sales_persons.required" class="errorMsg">
                      Sales person is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <SearchProduct
                    searchType="quotation"
                    :itemsData="form.items"
                  />
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

                  <div class="attachment-display">
                    <ul class="mt-5 d-flex">
                      <li
                        v-for="(img, index) in display_images"
                        v-bind:key="index"
                        class="display-attachment-row"
                      >
                        <div>
                          <span>
                            <img
                              v-bind:src="img.path"
                              class="name-attachment"
                              style="max-width: 80px"
                            />
                          </span>
                        </div>
                        <span
                          >{{ img.name }}
                          <a
                            @click.prevent="deleteAttachment(img.uuid)"
                            class="delete-attachment"
                          >
                            <CIcon :content="$options.cilTrash" /> </a
                        ></span>
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

export default {
  name: "CreateBrand",
  components: {
    CustomerSearchField,
    SearchProduct,
    SelectSalePerson,
    AppUpload,
  },
  data: () => ({
    form: {
      customer: "",
      dated: "",
      due_date: "",
      sales_persons: "",
      note: "",
      items: [],
    },
  }),
  validations() {
    return {
      form: {
        customer: { required },
        dated: { required },
        due_date: { required },
        sales_persons: { required },
      },
    };
  },

  created() {},
  computed: {
    receivingItems() {
      return this.$store.getters.getSearchProductItems;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_search_product_items", []);
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
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        let formData = new FormData();
        formData.append("customer", this.form.customer);
        formData.append("dated", this.form.dated);
        formData.append("due_date", this.form.due_date);
        formData.append("customer", this.form.customer);
        formData.append("sales_persons", this.form.sales_persons);
        formData.append("items", JSON.stringify(this.form.items));
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
      }
    },
    customerSelected(customer) {
      this.form.customer = customer;
    },
    salesPersonSelected(person) {
      this.form.sales_persons = person;
    },
  },
};
</script>

