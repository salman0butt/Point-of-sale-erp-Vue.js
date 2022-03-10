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
                      />
                    </td>
                    <td>
                      {{
                        product.price
                          ? (
                              parseFloat(product.price.selling_price_without_tax) *
                              parseFloat(form.qty)
                            ).toFixed(3)
                          : 0
                      }}
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

                <div class="form-check m-1">
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
                </div>
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
              <CInput v-if="showCash" class="col-md-4" readonly v-model="form.total" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Return Note"
                placeholder="content.."
                v-model="form.return_note"
              />
            </CCol>
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import ReturnByProductService from "@/services/catalogs/ReturnByProducts/ReturnByProductService";
// import { required } from "vuelidate/lib/validators";
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
      qty: 1,
      expiry: "",
      return_note: "",
      total: 0,
    },
  }),
  // validations() {
  //   return {
  //     form: {
  //       name: { required },
  //     },
  //   };
  // },
  created() {
    this.form.id = this.$route.params.id;
    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getReturnByProduct();
    // }
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
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveReturnByProduct() {
      alert("Return Saved");
    },
    changeReplacement() {
      // this.showReplacement = true;
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
      this.form.total = (
        parseFloat(this.form.qty) *
        parseFloat(this.product.price.selling_price_without_tax)
      ).toFixed(3);
    },
  },
};
</script>
