<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveReturnByProduct()">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ product.name }}</td>
                    <td>
                      <CInput
                        type="number"
                        style="max-width: 100px"
                        min="1"
                        v-model="form.qty"
                        @change="updateQty()"
                        :class="{ error: $v.form.qty.$error }"
                        @input="$v.form.qty.$touch()"
                      />
                      <div v-if="$v.form.qty.$error">
                        <p v-if="!$v.form.qty.required" class="errorMsg">
                          Qty is required
                        </p>
                      </div>
                    </td>
                    <td>
                      {{ form.unit_price }}
                      <div v-if="$v.form.unit_price.$error">
                        <p v-if="!$v.form.unit_price.required" class="errorMsg">
                          Unit Price is required
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex">
                <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="exchange"
                    v-model="exchange_return"
                    id="exchange"
                    name="return_type"
                    @change="changeReplacement()"
                  />
                  <label class="form-check-label" for="exchange"> Replacement </label>
                </div>

                <!--<div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="damage"
                    v-model="exchange_return"
                    id="damage"
                    name="return_type"
                    @change="changeDamage()"
                  />
                  <label class="form-check-label" for="damage"> Damage </label>
                </div> -->
                <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="return_cash"
                    @change="changeReturnCash()"
                    name="return_type"
                    id="return_cash"

                  />
                  <label class="form-check-label" for="return_cash"> Return Cash </label>
                </div>
              </div>
              <CInput
                v-if="showCash"
                class="col-md-4"
                readonly
                v-model="form.return_cash"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Return Note"
                placeholder="content.."
                v-model="form.note"
              />
            </CCol>
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ReturnByProductService from "@/services/returns/ReturnByProductService";
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdateReturnByProduct",
  components: {
    Loader,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    showCash: false,
    showReplacement: false,
    exchange_return: "",
    form: {
      id: "",
      product_id: "",
      unit_price: "",
      qty: 1,
      return_cash: "",
      note: "",
      total_price: 0,
    },
  }),
  validations() {
    return {
      form: {
        product_id: { required },
        unit_price: { required },
        qty: { required },
        // return_cash: { required },
        total_price: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
  },
  watch: {
    submitForm() {
      // this.$v.$touch();
      if (this.submit) {
        this.saveReturnByProduct();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
    product() {
      this.form.product_id = this.product.uuid;
      this.form.unit_price = this.product.price?.selling_price_with_tax ?? 0;
      this.form.total_price = this.form.qty * this.form.unit_price;
      this.form.cash_return = this.form.qty * this.form.unit_price;

      this.updateQty();
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveReturnByProduct() {
      ReturnByProductService.create(this.form)
        .then((res) => {
          if (res.status === 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Return Added Successfully",
              timer: 3600,
            });
            // this.$v.$reset();
            // this.resetForm();
          }
        })
        .catch((error) => {
          this.isEditing = false;
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          }
        });
    },
    changeReplacement() {
      this.showReplacement = true;
      this.$emit("replacement-change", true);
      this.showCash = false;
    },
    changeDamage() {
      this.$emit("replacement-change", false);
      this.showReplacement = false;
      this.$store.commit("set_return_by_product_model", false);
      this.$router.push({ path: "/catalogs/damages/create" });
    },
    changeReturnCash() {
      this.$emit("replacement-change", false);
      this.showCash = true;
      this.showReplacement = false;
      this.updateQty();
    },
    updateQty() {
      this.form.total_price = (
        parseFloat(this.form.qty) * parseFloat(this.product.price.selling_price_with_tax)
      ).toFixed(3);
      this.form.return_cash = this.form.total_price;
    },
  },
};
</script>
