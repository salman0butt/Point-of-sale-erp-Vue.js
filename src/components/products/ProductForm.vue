<template>
  <div>
    <Loader />
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateProduct() : saveProduct()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                :label="$t('products.form.name')"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">
                  {{ $t("products.form.validations.name.required") }}
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput :label="$t('products.form.short_name')" v-model="form.short_name" />
            </CCol>
            <!-- <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Type"
                :options="options.types"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol> -->

            <!-- <CCol sm="6" md="4" class="pt-2">
              <label class="typo__label">{{
                $t("products.form.suppliers")
              }}</label>
              <multiselect
                v-model="form.suppliers"
                :options="options.suppliers"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('products.form.select_supplier')"
                label="label"
                track-by="label"
                :preselect-first="true"
                :class="{ error: $v.form.suppliers.$error }"
                @input="$v.form.suppliers.$touch()"
              >
                <template
                  slot="selection"
                  slot-scope="{ values, search, isOpen }"
                >
                  <span
                    class="multiselect__single"
                    v-if="values.value &amp;&amp; !isOpen"
                    >{{ values.length }}
                    {{ $t("products.form.options_selected") }}</span
                  ></template
                >
              </multiselect>
              <div v-if="$v.form.suppliers.$error">
                <p v-if="!$v.form.suppliers.required" class="errorMsg">
                  Supplier is required
                </p>
              </div>
            </CCol> -->
            <!-- </CRow>
          <CRow> -->
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                :label="$t('products.form.brand')"
                :options="options.brands"
                :value.sync="form.brand_id"
              />
              <!-- <div v-if="$v.form.brand_id.$error">
                <p v-if="!$v.form.brand_id.required" class="errorMsg">
                  {{ $t("products.form.validations.brand.required") }}
                </p>
              </div> -->
            </CCol>

            <CCol sm="6" md="4" class="pt-2" id="categories">
              <label class="typo__label"> {{ $t("products.form.category") }}</label>
              <multiselect
                v-model="form.categories"
                :options="options.categories"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('products.form.select_category')"
                label="label"
                track-by="label"
                :preselect-first="true"
                :class="{ error: $v.form.categories.$error }"
                @input="$v.form.categories.$touch()"
              >
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                  <span class="multiselect__single" v-if="values.value &amp;&amp; !isOpen"
                    >{{ values.length }} {{ $t("products.form.options_selected") }}</span
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
              <label class="typo__label">{{ $t("products.form.branches") }}</label>
              <multiselect
                v-model="form.branches"
                ref="branches"
                :options="options.branches"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('products.form.select_branch')"
                label="label"
                track-by="label"
                :preselect-first="true"
                :class="{ error: $v.form.branches.$error }"
                @input="$v.form.branches.$touch()"
              >
                <template slot="beforeList">
                  <span
                    class="multiselect__element"
                    @click="selectAllBranches()"
                    style="border-bottom: 1px solid #d7d7d7"
                  >
                    <span class="multiselect__option">
                      <span style="font-weight: bold">Select All</span></span
                    >
                  </span></template
                >
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                  <span class="multiselect__single" v-if="values.value &amp;&amp; !isOpen"
                    >{{ values.length }} {{ $t("products.form.options_selected") }}</span
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
              <CInput :label="$t('products.form.barcode')" :value.sync="form.barcode" />
            </CCol>
            <CCol sm="6" md="4" class="pt-2" v-if="isEdit">
              <CInput
                :label="$t('products.form.serial_number')"
                :value.sync="form.serial_number"
              />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                :label="$t('products.form.alert_qty')"
                type="number"
                placeholder="0"
                :value.sync="form.alert_qty"
                :class="{ error: $v.form.alert_qty.$error }"
                @input="$v.form.alert_qty.$touch()"
              />
              <div v-if="$v.form.alert_qty.$error">
                <p v-if="!$v.form.alert_qty.required" class="errorMsg">
                  Alert Qty is Required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                :label="$t('products.form.weight_unit')"
                :options="options.weight_units"
                :value.sync="form.weight_unit"
              />
            </CCol>
            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                :label="$t('products.form.status')"
                :options="options.status"
                :value.sync="form.status"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2 short_desc">
              <label class="typo__label"> {{ $t("products.form.description") }}</label>
              <vue-editor v-model="form.short_description"></vue-editor>
            </CCol>
            <!-- <CCol sm="12" md="12" class="pt-2">
              <label class="typo__label">Long Description</label>
              <vue-editor v-model="form.product_description"></vue-editor>
            </CCol> -->
          </CRow>

          <CRow>
            <CCol sm="3" md="3" class="pt-2">
              <CInputCheckbox
                custom
                :checked="form.is_favorite"
                :label="$t('products.form.is_favorite')"
                @change="toggleIsFavruite"
              />
            </CCol>
            <CCol sm="3" md="3" class="pt-2">
              <CInputCheckbox
                custom
                :checked="form.is_expiry"
                :label="$t('products.form.is_expiry')"
                @change="toggleIsExpiry"
              />
            </CCol>
          </CRow>

          <CRow class="mt-4">
            <vue-tags-input
              v-model="form.tag"
              class="col-md-12"
              :placeholder="$t('products.form.tags')"
              :tags="form.tags"
              @tags-changed="(newTags) => (form.tags = newTags)"
            />
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">
            {{ $t("general.validationError") }}
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
              >{{ $t("products.form.saveAndContinue") }}</CButton
            >
            <CButton
              timeout="2000"
              block
              color="danger"
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >{{ $t("products.form.saveAndExit") }}</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductService from "@/services/products/ProductService";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import { VueEditor } from "vue2-editor";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import { VueTagsInput } from "@johmun/vue-tags-input";
import Loader from "@/components/layouts/Loader";

export default {
  name: "ProductForm",
  components: { Multiselect, VueEditor, VueTagsInput, Loader },
  cibAddthis,
  cisMinusSquare,
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      name: "",
      short_name: "",
      // suppliers: "",
      brand_id: "",
      barcode: "",
      serial_number: "",
      short_description: "",
      product_description: "",
      is_favorite: false,
      is_expiry: false,
      categories: "",
      branches: "",
      images: "",
      status: "",
      tags: [],
      tag: "",
      alert_qty: "",
      weight_unit: "",
    },
    productId: null,
    options: {
      //   suppliers: [],
      brands: [],
      weight_units: [],
      categories: [],
      branches: [],
      types: [
        {
          value: "",
          label: "Choose Type",
          disabled: true,
          selected: "",
        },
        {
          value: "product",
          label: "Product",
        },
        // {
        //   value: "service",
        //   label: "Service",
        // },
        // {
        //   value: "subscription",
        //   label: "Subscription",
        // },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        // brand_id: { required },
        //  suppliers: { required },
        categories: { required },
        branches: { required },
        alert_qty: { required },
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductOptions();
    this.setBrandOption();
    this.setWeightUnits();
    if (this.productId) {
      this.getProduct();
      this.isEditing = true;
    }
  },
  methods: {
    setBrandOption() {
      this.options.brands = [
        {
          value: "",
          label: this.$t("products.form.choose_brand"),
        },
      ];
    },
    selectAllBranches() {
      this.form.branches = this.options.branches;
      this.$refs.branches.deactivate();
    },
    setWeightUnits() {
      this.options.weight_units = [
        {
          value: "",
          label: this.$t("products.form.choose_weight_unit"),
          disabled: true,
          selected: "",
        },
        {
          value: "g",
          label: "Gram",
        },
        {
          value: "kg",
          label: "Kilogram",
        },
        {
          value: "ouance",
          label: "Ouance",
        },
        {
          value: "mg",
          label: "Milligram",
        },
        {
          value: "lb",
          label: "Pound",
        },
        {
          value: "oz",
          label: "Ounce",
        },
        {
          value: "ton",
          label: "Ton",
        },
        {
          value: "tonne",
          label: "Tonne",
        },
        {
          value: "carat",
          label: "Carat",
        },
        {
          value: "grain",
          label: "Grain",
        },
        {
          value: "each",
          label: "Each",
        },
        {
          value: "gallon",
          label: "Gallon",
        },
        {
          value: "hour",
          label: "Hour",
        },
        {
          value: "sheet",
          label: "Sheet",
        },
        {
          value: "piece",
          label: "Piece",
        },
        {
          value: "inch",
          label: "Inch",
        },
        {
          value: "centimeter",
          label: "Centimeter",
        },
        {
          value: "meter",
          label: "Meter",
        },
        {
          value: "foot",
          label: "Foot",
        },
        {
          value: "cm",
          label: "Centimeter",
        },
        {
          value: "m",
          label: "Meter",
        },
        {
          value: "qty",
          label: "Qty",
        },
      ];
    },
    getProductOptions() {
      ProductService.getProductOptions()
        .then(({ data }) => {
          //   let suppliers = this.options.suppliers;
          let brands = this.options.brands;
          let categories = this.options.categories;
          let branches = this.options.branches;

          // if (data.suppliers) {
          //   data.suppliers.map(function (val) {
          //     suppliers.push({ value: val.uuid, label: val.name });
          //   });
          // }

          if (data.brands) {
            data.brands.map(function (val) {
              brands.push({ value: val.uuid, label: val.name });
            });
          }

          if (data.categories) {
            data.categories.map(function (val) {
              categories.push({ value: val.uuid, label: val.name });
            });
          }

          if (data.branches) {
            data.branches.map(function (val) {
              branches.push({ value: val.uuid, label: val.name });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleIsFavruite() {
      this.form.is_favorite = !this.form.is_favorite;
    },
    toggleIsExpiry() {
      this.form.is_expiry = !this.form.is_expiry;
    },
    getProduct() {
      this.$store.commit("set_loader");
      ProductService.get(this.productId)
        .then(({ data }) => {
          this.displayData(data);
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
          this.$router.push("/products");
        });
    },
    displayData(data = null) {
      if (data) {
        this.form.name = data.name ?? "";
        this.form.short_name = data.short_name ?? "";
        this.form.type = data.type ?? "";
        this.form.serial_number = data.serial_number ?? "";
        this.form.brand_id = data.brand?.uuid ?? "";
        this.form.barcode = data.barcode ?? "";
        this.form.alert_qty = data.alert_qty ?? "";
        this.form.weight_unit = data.weight_unit ?? "";
        this.form.short_description = data.short_description ?? "";
        this.form.product_description = data.product_description ?? "";
        this.form.is_favorite = data.is_favorite == "yes" ? true : false;
        this.form.is_expiry = data.is_expiry == "yes" ? true : false;
        this.form.categories = data.categories.map(function (item) {
          return { label: item.name, value: item.uuid };
        });
        // this.form.suppliers = data.suppliers.map(function (item) {
        //   return { label: item.name, value: item.uuid };
        // });
        this.form.branches = data.branches.map(function (item) {
          return { label: item.name, value: item.uuid };
        });

        if (data.tags && data.tags.length > 0) {
          data.tags.forEach((element) => {
            this.form.tags.unshift({
              text: element.name,
              tiClasses: ["ti-valid"],
            });
          });
        }
        // this.form.images = data.images ?? "";
        this.form.status = data.status ?? "";
        this.$store.commit("close_loader");
      }
    },
    saveProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.form.status = "active";
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData();

        ProductService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: this.$t("general.swal.success"),
                text: this.$t("products.form.successMsg"),
                timer: 3600,
                timerProgressBar: true,
                confirmButtonText: this.$t("general.swal.ok"),
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/products/index" });
              } else {
                this.$router.push({ path: "/products/edit/" + res.data.uuid });
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
    updateProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData(true);
        ProductService.update(this.productId, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: this.$t("general.swal.success"),
                text: this.$t("products.form.updateMsg"),
                timer: 3600,
                timerProgressBar: true,
                confirmButtonText: this.$t("general.swal.ok"),
              });

              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/products/index" });
              }
              // else {
              //   this.$router.push({ path: "/products/edit/" + res.data.uuid });
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
    formData(update = false) {
      let formData = new FormData();
      for (const index in this.form) {
        if (index === "images") {
          for (const img of this.form.images) {
            formData.append("images[]", img);
          }
        } else if (index === "categories") {
          const cats = this.form.categories;
          if (cats !== "" && cats !== undefined) {
            const get_cats = cats?.map(function (item) {
              return item.value;
            });
            for (const cts of get_cats) {
              formData.append("categories[]", cts);
            }
          }
        }
        // else if (index === "suppliers") {
        //   const suppliers = this.form.suppliers;
        //   if (suppliers !== "" && suppliers !== undefined) {
        //     const get_suppliers = suppliers?.map(function (item) {
        //       return item.value;
        //     });
        //     for (const sup of get_suppliers) {
        //       formData.append("suppliers[]", sup);
        //     }
        //   }
        // }
        else if (index === "branches") {
          const branches = this.form.branches;
          if (branches !== "" && branches !== undefined) {
            const get_branchs = branches?.map(function (item) {
              return item.value;
            });

            for (const brnch of get_branchs) {
              formData.append("branches[]", brnch);
            }
          }
        } else if (index === "tags") {
          const tags = this.form.tags;
          if (tags !== "" && tags !== undefined) {
            for (const tag of tags) {
              formData.append("tags[]", tag.text);
            }
          }
        } else {
          formData.append(index, this.form[index]);
        }
      }
      if (update) {
        formData.append("_method", "patch");
      }

      return formData;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.thumb {
  cursor: pointer;
}
.short_desc .ql-editor {
  min-height: 110px !important;
}
</style>
