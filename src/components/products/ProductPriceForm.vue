<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Prices </CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateProductPrice() : saveProductPrice()">
              <CRow>
                <Loader />
                <CCol sm="6" md="6" class="pt-2">
                  <AccountDropdown
                    :labelText="'While Purchase Account'"
                    :previousValue="product.purchase_account_id"
                    :isCreate="isEditing ? false : true"
                    defaultSelect="-- Cost Of Goods Sold"
                    @getAccountDropdown="getAccountDropdown($event, 'purchase')"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput
                    label="Cost Price"
                    type="number"
                    step="any"
                    placeholder="0.00"
                    v-model="product.cost_price"
                    :class="{ error: $v.product.cost_price.$error }"
                    @input="[$v.product.cost_price.$touch(), calculateTotal()]"
                  />
                  <div v-if="$v.product.cost_price.$error">
                    <p v-if="!$v.product.cost_price.required" class="errorMsg">
                      Cost Price is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <AccountDropdown
                    :labelText="'While Sale Account'"
                    defaultSelect="-- Sales"
                    :isCreate="isEditing ? false : true"
                    :previousValue="product.sale_account_id"
                    @getAccountDropdown="getAccountDropdown($event, 'sale')"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput
                    label="Selling Price"
                    type="number"
                    step="any"
                    placeholder="0.00"
                    v-model="product.selling_price_without_tax"
                    :class="{
                      error: $v.product.selling_price_without_tax.$error,
                    }"
                    @input="
                      [$v.product.selling_price_without_tax.$touch(), calculateTotal()]
                    "
                  />
                  <div v-if="$v.product.selling_price_without_tax.$error">
                    <p
                      v-if="!$v.product.selling_price_without_tax.required"
                      class="errorMsg"
                    >
                      Selling Price is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="3" md="3" class="pt-2">
                  <CSelect
                    label="Tax Type"
                    :options="tax_type"
                    :value.sync="product.tax"
                    :class="{ error: $v.product.tax.$error }"
                    @change="[calculateTotal()]"
                    @input="$v.product.tax.$touch()"
                  />
                  <div v-if="$v.product.tax.$error">
                    <p v-if="!$v.product.tax.required" class="errorMsg">
                      Tax is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="2" md="2" class="pt-2 mt-4">
                  <CInputCheckbox
                    custom
                    :checked="product.inclusive_tax"
                    label="Inclusive"
                    @change="[toggleIsVat(), calculateTotal()]"
                  />
                </CCol>
                <CCol v-if="product.inclusive_tax" sm="2" md="2" class="pt-2">
                  <CInput
                    label="Original Selling"
                    type="number"
                    step="any"
                    placeholder="0.00"
                    v-model="product.org_selling"
                    disabled
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInput
                    label="Total Price"
                    type="number"
                    step="any"
                    placeholder="0.00"
                    v-model="product.selling_price_with_tax"
                    disabled
                  />
                </CCol>
              </CRow>

              <p v-if="$v.product.$anyError" class="errorMsg">
                Please Fill the required data
              </p>
              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  :disabled="loading"
                  >{{ loading ? "loading..." : "Save" }}</CButton
                >
              </CRow>
            </form>
            <br />
            <div v-if="variations && variations.length > 0">
              <CCardHeader> Variations </CCardHeader>
              <form
                @submit.prevent="
                  isVariationEditing
                    ? updateProductVariationPrice()
                    : saveProductVariationPrice()
                "
              >
                <CRow>
                  <CCol sm="12" md="12" class="pt-2">
                    <div class="form-group" v-for="(input, k) in variations" :key="k">
                      <CRow>
                        <CCol sm="6" md="3" class="pt-2">
                          <CInput label="Name" readonly :value.sync="input.name" />
                        </CCol>
                        <!-- <CCol sm="6" md="3" class="pt-2">
                        <CInput label="Attributes" readonly :value.sync="input.values" />
                      </CCol> -->
                        <CCol sm="6" md="3" class="pt-2">
                          <CInput
                            label="Cost Price"
                            type="number"
                            placeholder="0.00"
                            v-model="input.cost_price"
                            :class="{
                              error: $v.variations.$each[k].cost_price.$error,
                            }"
                            @input="$v.variations.$each[k].cost_price.$touch()"
                          />
                          <div v-if="$v.variations.$each[k].cost_price.$error">
                            <p
                              v-if="!$v.variations.$each[k].cost_price.required"
                              class="errorMsg"
                            >
                              Cost Price is required
                            </p>
                          </div>
                        </CCol>
                        <CCol sm="6" md="3" class="pt-2">
                          <CInput
                            label="Selling Price"
                            type="number"
                            placeholder="0.00"
                            v-model="input.selling_price_without_tax"
                            :class="{
                              error:
                                $v.variations.$each[k].selling_price_without_tax.$error,
                            }"
                            @input="
                              $v.variations.$each[k].selling_price_without_tax.$touch()
                            "
                          />
                          <div
                            v-if="$v.variations.$each[k].selling_price_without_tax.$error"
                          >
                            <p
                              v-if="
                                !$v.variations.$each[k].selling_price_without_tax.required
                              "
                              class="errorMsg"
                            >
                              Selling Price is required
                            </p>
                          </div>
                        </CCol>
                        <CCol sm="3" md="3" class="pt-2 mt-4">
                          <CInputCheckbox
                            custom
                            :checked="input.inclusive_tax"
                            label="Is Vat Include"
                            @change="toggleVariationIsVat(k)"
                          />
                        </CCol>
                      </CRow>
                    </div>
                  </CCol>
                </CRow>

                <p v-if="$v.variations.$anyError" class="errorMsg">
                  Please Fill the required data
                </p>
                <CRow class="mt-4 d-block">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="float: right; width: 150px; margin-right: 20px"
                    type="submit"
                    :disabled="loading"
                    >{{ loading ? "loading..." : "Save" }}</CButton
                  >
                </CRow>
              </form>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductPriceService from "@/services/products/ProductPriceService";
import TaxService from "@/services/TaxService";
import ProductVariationService from "@/services/products/ProductVariationService";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";
import AccountDropdown from "@/components/general/AccountDropdown";

export default {
  name: "ProductPriceForm",
  components: { Loader, AccountDropdown },
  data: () => ({
    isEditing: false,
    isVariationEditing: false,
    product: {
      id: "",
      product_id: "",
      purchase_account_id: "",
      sale_account_id: "",
      type: "product",
      cost_price: "",
      selling_price_without_tax: "",
      tax: null,
      inclusive_tax: false,
      selling_price_with_tax: "0.000",
      org_selling: "",
    },
    product_tax_percentage: "",
    variations: [
      // {
      //   id: "",
      //   name: "",
      //   type: "variation",
      //   serial_number: "",
      //   barcode: "",
      //   values: [],
      //   cost_price: "",
      //   selling_price_without_tax: "",
      //   inclusive_tax: false,
      // },
    ],
    productId: "",

    tax_type: [{ label: "Select Tax", value: "" }],
  }),
  validations() {
    return {
      product: {
        product_id: { required },
        cost_price: { required },
        selling_price_without_tax: { required },
        tax: { required },
      },
      variations: {
        required: true,
        $each: {
          cost_price: { required },
          selling_price_without_tax: { required },
        },
      },
    };
  },
  created() {
    this.getAllTaxes();
    this.productId = this.$route.params.id;
    this.product.product_id = this.$route.params.id;
    if (this.productId) {
      this.getProductPrice();
      // this.getProductVariation();
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    toggleIsVat() {
      this.product.inclusive_tax = !this.product.inclusive_tax;
    },
    toggleVariationIsVat(key) {
      this.variations[key].inclusive_tax = !this.variations[key].inclusive_tax;
    },
    getProductPrice() {
      this.$store.commit("set_loader");
      ProductPriceService.get(this.productId)
        .then(({ data }) => {
          this.displayProductPrice(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$store.commit("close_loader");
          this.$router.push({ path: "/products" });
        });
    },
    displayProductPrice(data = null) {
      if (data !== "" && data !== null && data !== undefined && data.uuid) {
        this.isEditing = true;
        this.product.id = data.uuid;
        this.product.cost_price = data.cost_price ?? 0;
        this.product.inclusive_tax = data.inclusive_tax === 1 ? true : false;
        this.product.tax = data.tax?.uuid;
        if (data.inclusive_tax) {
          this.product.org_selling = data.selling_price_without_tax?.toFixed(3) ?? 0;
          this.product.selling_price_without_tax = data.selling_price_with_tax ?? 0;
          this.calculateTotal();
        } else {
          this.product.selling_price_without_tax = data.selling_price_without_tax ?? 0;
          this.calculateTotal();
        }

        if (data.purchase_account) {
          this.product.purchase_account_id = {
            label: data.purchase_account.name,
            value: data.purchase_account.uuid,
          };
        }
        if (data.sale_account) {
          this.product.sale_account_id = {
            label: data.sale_account.name,
            value: data.sale_account.uuid,
          };
        }
      }
    },
    getProductVariation() {
      this.$store.commit("set_loader");
      ProductVariationService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== null && data !== undefined && data.length) {
            this.isVariationEditing = true;
            this.variations = [];
            data.forEach((element) => {
              this.variations.unshift({
                uuid: element.uuid,
                name: JSON.parse(element.name).en,
                cost_price: element.price?.cost_price ?? 0,
                selling_price_without_tax: element.price?.selling_price_without_tax ?? 0,
                inclusive_tax: element.price?.inclusive_tax === 1 ? true : false,
              });
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.isVariationEditing = false;
          this.$store.commit("close_loader");
          this.$router.push({ path: "/products" });
        });
    },
    getAccountDropdown(value, type) {
      if (type === "purchase") {
        this.product.purchase_account_id = value.value;
      } else {
        this.product.sale_account_id = value.value;
      }
    },
    saveProductPrice() {
      this.$v.product.$touch();
      if (!this.$v.product.$invalid) {
        let formData = this.product;
        this.$store.commit("set_loader");
        ProductPriceService.create(formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              this.displayProductPrice(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Price Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
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
    saveProductVariationPrice() {
      this.$v.variations.$touch();
      if (!this.$v.variations.$invalid) {
        let formData = {
          type: "variation",
          variations: this.variations,
        };
        this.$store.commit("set_loader");
        ProductPriceService.create(formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              this.displayProductPrice(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Variation Prices Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateProductPrice() {
      this.$v.product.$touch();
      if (!this.$v.product.$invalid) {
        let formData = this.product;
        this.$store.commit("set_loader");
        ProductPriceService.update(this.productId, formData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Price Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
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
    updateProductVariationPrice() {
      this.$v.variations.$touch();
      if (!this.$v.variations.$invalid) {
        let formData = {
          type: "variation",
          variations: this.variations,
          product_id: this.productId,
        };
        this.$store.commit("set_loader");
        ProductPriceService.update(this.productId, formData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Variation Prices Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    getAllTaxes() {
      TaxService.getAll()
        .then((res) => {
          if (res.status == 200) {
            let test = res.data.data;
            test.forEach((item) => {
              this.tax_type.push({
                label: item.name,
                value: item.uuid,
                percentage: item.percentage,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculateTotal() {
      let selling_price_without_tax = this.product.selling_price_without_tax;
      let product_tax = this.product.tax;
      let tax = null;
      if (product_tax) {
        tax = this.tax_type.find((item) => item.value == product_tax);
      }
      let percentage = null;
      if (tax) {
        percentage = tax.percentage;
      }
      let inclusive_tax = this.product.inclusive_tax;

      if (inclusive_tax) {
        if (percentage) {
          let org_selling =
            selling_price_without_tax / (1 + parseFloat(percentage) / 100);
          this.product.org_selling = org_selling?.toFixed(3);
          let total_price_with_tax = parseFloat(selling_price_without_tax);
          this.product.selling_price_with_tax = total_price_with_tax
            ? total_price_with_tax.toFixed(3)
            : 0;
        } else {
          let total_price_with_tax = parseFloat(selling_price_without_tax);
          this.product.selling_price_with_tax = total_price_with_tax
            ? total_price_with_tax.toFixed(3)
            : 0;
        }
      } else {
        if (percentage) {
          let total_price_with_tax =
            parseFloat(selling_price_without_tax) +
            (parseFloat(selling_price_without_tax) * parseFloat(percentage)) / 100;
          this.product.selling_price_with_tax = total_price_with_tax
            ? total_price_with_tax.toFixed(3)
            : 0;
        } else {
          this.product.selling_price_with_tax = selling_price_without_tax
            ? selling_price_without_tax.toFixed(3)
            : 0;
        }
        // let total_price_with_tax =
        //   parseFloat(selling_price_without_tax * (parseFloat(percentage) / 100)) +
        //   parseFloat(selling_price_without_tax);
        // this.product.selling_price_with_tax = total_price_with_tax;
      }
    },
  },
};
</script>
