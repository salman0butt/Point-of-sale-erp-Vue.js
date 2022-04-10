<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>{{ isEditing ? "Edit" : "Create" }} Offer </CCardHeader>
          <CCardBody>
            <CRow>
              <Loader />
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updateOffer() : saveOffer()">
                  <CRow>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="Name"
                        v-model="form.name"
                        :class="{ error: $v.form.name.$error }"
                        @input="$v.form.name.$touch()"
                      />
                      <div v-if="$v.form.name.$error">
                        <p v-if="!$v.form.name.required" class="errorMsg">
                          Name is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CSelect
                        label="Type"
                        :value.sync="form.type"
                        :options="options.types"
                        :class="{ error: $v.form.type.$error }"
                        @input="$v.form.type.$touch()"
                      />
                      <div v-if="$v.form.type.$error">
                        <p v-if="!$v.form.type.required" class="errorMsg">
                          Type is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="Allowed Per Sale"
                        type="number"
                        placeholder="0"
                        v-model="form.allowed_per_sale"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="12" md="12" class="pt-2">
                      <label class="typo__label">Description</label>
                      <vue-editor v-model="form.description"></vue-editor>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="Start Date"
                        type="date"
                        v-model="form.start_date"
                        :class="{ error: $v.form.start_date.$error }"
                        @input="$v.form.start_date.$touch()"
                      />
                      <div v-if="$v.form.start_date.$error">
                        <p v-if="!$v.form.start_date.required" class="errorMsg">
                          Start Date is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="End Date"
                        type="date"
                        v-model="form.end_date"
                        :class="{ error: $v.form.end_date.$error }"
                        @input="$v.form.end_date.$touch()"
                      />
                      <div v-if="$v.form.end_date.$error">
                        <p v-if="!$v.form.end_date.required" class="errorMsg">
                          End Date is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CSelect
                        label="Status"
                        :options="options.status"
                        :value.sync="form.status"
                        :class="{ error: $v.form.status.$error }"
                        @input="$v.form.status.$touch()"
                      />
                      <div v-if="$v.form.status.$error">
                        <p v-if="!$v.form.status.required" class="errorMsg">
                          Status is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol
                      v-if="
                        form.type === 'offer_buy_x_get_discount' ||
                        form.type === 'offer_x_get_y_free'
                      "
                      sm="6"
                      md="4"
                      class="pt-2"
                    >
                      <CInput
                        label="Quantity to Buy"
                        type="number"
                        placeholder="0"
                        min="0"
                        v-model="form.quantity_to_buy"
                        :class="{ error: $v.form.quantity_to_buy.$error }"
                        @input="$v.form.quantity_to_buy.$touch()"
                      />
                      <div v-if="$v.form.quantity_to_buy.$error">
                        <p v-if="!$v.form.quantity_to_buy.required" class="errorMsg">
                          Quantity to Buy is required
                        </p>
                      </div>
                    </CCol>
                    <CCol
                      v-if="form.type === 'offer_x_get_y_free'"
                      sm="6"
                      md="4"
                      class="pt-2"
                    >
                      <CInput
                        label="Quantity to Get"
                        type="number"
                        placeholder="0"
                        min="0"
                        v-model="form.quantity_to_get"
                        :class="{ error: $v.form.quantity_to_get.$error }"
                        @input="$v.form.quantity_to_get.$touch()"
                      />
                      <div v-if="$v.form.quantity_to_get.$error">
                        <p v-if="!$v.form.quantity_to_get.required" class="errorMsg">
                          Quantity to Get is required
                        </p>
                      </div>
                    </CCol>
                    <CCol
                      v-if="form.type === 'offer_spend_x_get_discount'"
                      sm="6"
                      md="4"
                      class="pt-2"
                    >
                      <CInput
                        label="Spend Amount"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        v-model="form.spend_amount"
                        :class="{ error: $v.form.spend_amount.$error }"
                        @input="$v.form.spend_amount.$touch()"
                      />
                      <div v-if="$v.form.spend_amount.$error">
                        <p v-if="!$v.form.spend_amount.required" class="errorMsg">
                          Spend Amount is required
                        </p>
                      </div>
                    </CCol>
                    <CCol
                      v-if="
                        form.type === 'offer_buy_x_get_discount' ||
                        form.type === 'offer_discount' ||
                        form.type === 'offer_spend_x_get_discount'
                      "
                      sm="6"
                      md="4"
                      class="pt-2"
                    >
                      <CSelect
                        label="Discount Type"
                        :value.sync="form.discount_type"
                        :options="options.discount_type"
                        :class="{ error: $v.form.discount_type.$error }"
                        @input="$v.form.discount_type.$touch()"
                      />
                      <div v-if="$v.form.discount_type.$error">
                        <p v-if="!$v.form.discount_type.required" class="errorMsg">
                          Discount Type is required
                        </p>
                      </div>
                    </CCol>
                    <CCol
                      v-if="
                        form.type === 'offer_buy_x_get_discount' ||
                        form.type === 'offer_discount' ||
                        form.type === 'offer_spend_x_get_discount'
                      "
                      sm="6"
                      md="4"
                      class="pt-2"
                    >
                      <CInput
                        label="Discount Amount"
                        type="number"
                        placeholder="0.00"
                        min="0"
                        v-model="form.discount_amount"
                        :class="{ error: $v.form.discount_amount.$error }"
                        @input="$v.form.discount_amount.$touch()"
                      />
                      <div v-if="$v.form.discount_amount.$error">
                        <p v-if="!$v.form.discount_amount.required" class="errorMsg">
                          Discount Amount is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm="6" md="4" class="pt-2" id="categories">
                      <label class="typo__label">Categories</label>
                      <multiselect
                        v-model="form.categories"
                        :options="options.categories"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Categories"
                        label="label"
                        track-by="label"
                        :preselect-first="true"
                        :class="{ error: $v.form.categories.$error }"
                        @input="$v.form.categories.$touch()"
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
                      <div v-if="$v.form.categories.$error">
                        <p v-if="!$v.form.categories.required" class="errorMsg">
                          Categories is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <label class="typo__label">Branches</label>
                      <multiselect
                        v-model="form.branches"
                        :options="options.branches"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Branches"
                        label="label"
                        track-by="label"
                        :preselect-first="true"
                        :class="{ error: $v.form.branches.$error }"
                        @input="$v.form.branches.$touch()"
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
                      <div v-if="$v.form.branches.$error">
                        <p v-if="!$v.form.branches.required" class="errorMsg">
                          Branches is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <label class="typo__label">Products</label>
                      <multiselect
                        v-model="form.products"
                        :options="options.products"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Products"
                        label="label"
                        track-by="label"
                        :preselect-first="true"
                        :class="{ error: $v.form.products.$error }"
                        @input="$v.form.products.$touch()"
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
                      <div v-if="$v.form.products.$error">
                        <p v-if="!$v.form.products.required" class="errorMsg">
                          Products is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <label class="typo__label">Brands</label>
                      <multiselect
                        v-model="form.brands"
                        :options="options.brands"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select Brands"
                        label="label"
                        track-by="label"
                        :preselect-first="true"
                        :class="{ error: $v.form.brands.$error }"
                        @input="$v.form.brands.$touch()"
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
                      <div v-if="$v.form.brands.$error">
                        <p v-if="!$v.form.brands.required" class="errorMsg">
                          Brands is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <label class="typo__label">Tags</label>
                      <vue-tags-input
                        v-model="form.tag"
                        placeholder="Tags"
                        :tags="form.tags"
                        @tags-changed="(newTags) => (form.tags = newTags)"
                      />
                    </CCol>
                  </CRow>

                  <p v-if="$v.$anyError" class="errorMsg">
                    Please Fill the required data
                  </p>
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
                      style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                      @click="saveAndExit = true"
                      type="submit"
                      >Save & Exit</CButton
                    >
                  </CRow>
                </form>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import OfferService from "@/services/catalogs/offers/OfferService";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import { VueTagsInput } from "@johmun/vue-tags-input";
import { VueEditor } from "vue2-editor";
import Loader from "@/components/layouts/Loader";
export default {
  name: "CreateOrUpdateOffer",
  components: { Multiselect, VueTagsInput, VueEditor, Loader },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      name: "",
      type: "offer_discount",
      description: "",
      start_date: "",
      end_date: "",
      allowed_per_sale: "",
      status: "",
      quantity_to_buy: "",
      discount_type: "",
      discount_amount: "",
      spend_amount: "",
      quantity_to_get: "",
      branches: [],
      brands: [],
      products: [],
      categories: [],
      tags: [],
      tag: "",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      types: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        // { value: "offer_buy_x_get_discount", label: "Offer Buy X Get Discount" },
        // { value: "offer_spend_x_get_discount", label: "Offer Spend X Get Discount" },
        // { value: "offer_x_get_y_free", label: "Offer X Get Y Free" },
        { value: "offer_discount", label: "Offer Discount" },
      ],
      discount_type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "percentage", label: "Percentage" },
        { value: "fixed", label: "Fixed" },
      ],
      branches: [],
      brands: [],
      products: [],
      categories: [],
    },
  }),
  validations() {
    if (this.form.type === "offer_buy_x_get_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          status: { required },
          quantity_to_buy: { required },
          discount_type: { required },
          discount_amount: { required },
          branches: { required },
          brands: { required },
          products: { required },
          categories: { required },
        },
      };
    } else if (this.form.type === "offer_spend_x_get_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          status: { required },
          spend_amount: { required },
          discount_type: { required },
          discount_amount: { required },
          branches: { required },
          brands: { required },
          products: { required },
          categories: { required },
        },
      };
    } else if (this.form.type === "offer_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          status: { required },
          discount_type: { required },
          discount_amount: { required },
          branches: { required },
          brands: { required },
          products: { required },
          categories: { required },
        },
      };
    } else if (this.form.type === "offer_x_get_y_free") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          status: { required },
          quantity_to_buy: { required },
          quantity_to_get: { required },
          branches: { required },
          brands: { required },
          products: { required },
          categories: { required },
        },
      };
    } else {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          status: { required },
          branches: { required },
          brands: { required },
          products: { required },
          categories: { required },
        },
      };
    }
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllOfferOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getOffer();
    }
  },
  methods: {
    saveOffer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.formData();
        OfferService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Offer Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              // this.displayData(data);

              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/offers/index" });
              } else {
                this.$router.push({
                  path: "/catalogs/offers/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
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
    updateOffer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.formData(true);
        OfferService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Offer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.displayData(res.data);
              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/offers/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/catalogs/offers/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
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
    getAllOfferOptions() {
      this.$store.commit("set_loader");
      OfferService.getAllOfferOptions()
        .then((res) => {
          if (res.status == 200) {
            if (res.data !== "" && res.data != undefined) {
              if (res.data.branches) {
                this.options.branches = res.data.branches?.map((item) => {
                  return { value: item.uuid, label: item.name };
                });
              }
              if (res.data.brands) {
                this.options.brands = res.data.brands?.map((item) => {
                  return { value: item.uuid, label: item.name };
                });
              }
              if (res.data.products) {
                this.options.products = res.data.products?.map((item) => {
                  return { value: item.uuid, label: item.name };
                });
              }
              if (res.data.categories) {
                this.options.categories = res.data.categories?.map((item) => {
                  return { value: item.uuid, label: item.name };
                });
              }
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    getOffer() {
      this.$store.commit("set_loader");
      OfferService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$store.commit("close_loader");
          this.$router.push({ path: "/catalogs/offers/index" });
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.name = data.name;
        this.form.type = data.type;
        this.form.description = data.description;
        this.form.start_date = data.start_date;
        this.form.end_date = data.end_date;
        this.form.allowed_per_sale = data.allowed_per_sale;
        this.form.status = data.status;
        if (data.detail) {
          if (data.type == "offer_buy_x_get_discount") {
            this.form.quantity_to_buy = data.detail.quantity_to_buy;
            this.form.discount_type = data.detail.discount_type;
            this.form.discount_amount = data.detail.discount_amount;
          }
          if (data.type == "offer_spend_x_get_discount") {
            this.form.spend_amount = data.detail.spend_amount;
            // this.form.quantity_to_get = data.detail.quantity_to_get;
            this.form.discount_type = data.detail.discount_type;
            this.form.discount_amount = data.detail.discount_amount;
          }
          if (data.type == "offer_x_get_y_free") {
            this.form.quantity_to_buy = data.detail.quantity_to_buy;
            this.form.quantity_to_get = data.detail.quantity_to_get;
          }
          if (data.type == "offer_discount") {
            this.form.discount_type = data.detail.discount_type;
            this.form.discount_amount = data.detail.discount_amount;
          }
        }

        if (data.branches) {
          this.form.branches = data.branches?.map((item) => {
            return { value: item.uuid, label: item.name };
          });
        }
        if (data.brands) {
          this.form.brands = data.brands?.map((item) => {
            return { value: item.uuid, label: item.name };
          });
        }
        if (data.products) {
          this.form.products = data.products?.map((item) => {
            return { value: item.uuid, label: item.name };
          });
        }
        if (data.categories) {
          this.form.categories = data.categories?.map((item) => {
            return { value: item.uuid, label: item.name };
          });
        }
        this.form.tags = [];
        if (data.tags && data.tags.length > 0) {
          data.tags.forEach((element) => {
            this.form.tags.push({ text: element.name, tiClasses: ["ti-valid"] });
          });
        }
      }
    },
    formData(update = false) {
      let data = new FormData();
      for (const index in this.form) {
        if (index === "branches") {
          const branches = this.form.branches;
          if (branches !== "" && branches.length > 0) {
            const get_branchs = branches?.map(function (item) {
              return item.value;
            });

            for (const brnch of get_branchs) {
              console.log(brnch);
              data.append("branches[]", brnch);
            }
          }
        } else if (index === "brands") {
          const brands = this.form.brands;
          if (brands !== "" && brands.length > 0) {
            const get_brands = brands?.map(function (item) {
              return item.value;
            });

            for (const brand of get_brands) {
              data.append("brands[]", brand);
            }
          }
        } else if (index === "products") {
          const products = this.form.products;
          if (products !== "" && products.length > 0) {
            const get_products = products?.map(function (item) {
              return item.value;
            });

            for (const product of get_products) {
              data.append("products[]", product);
            }
          }
        } else if (index === "categories") {
          const categories = this.form.categories;
          if (categories !== "" && categories.length > 0) {
            const get_categories = categories?.map(function (item) {
              return item.value;
            });

            for (const category of get_categories) {
              data.append("categories[]", category);
            }
          }
        } else if (index === "tags") {
          const tags = this.form.tags;
          if (tags !== "" && tags.length > 0) {
            const get_tags = tags?.map(function (item) {
              return item.text;
            });

            for (const tag of get_tags) {
              data.append("tags[]", tag);
            }
          }
        } else {
          data.append(index, this.form[index]);
        }
      }
      if (update) {
        data.append("_method", "patch");
      }
      return data;
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
