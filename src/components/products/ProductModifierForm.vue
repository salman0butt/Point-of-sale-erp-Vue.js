<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Modifiers </CCardHeader>
          <CCardBody>
            <Loader />
            <form
              v-if="form.modifiers && form.modifiers.length > 0"
              @submit.prevent="updateProductModifier()"
            >
              <CRow>
                <CCol
                  v-for="(input, k) in form.modifiers"
                  sm="3"
                  md="3"
                  class="pt-2"
                  :key="k"
                >
                  <CInputCheckbox
                    custom
                    :checked="input.checked"
                    :label="input.name"
                    @change="toggleModifier(k)"
                  />
                </CCol>
              </CRow>
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
            <div v-else>
              <p class="text-center">No modifiers found</p>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductModifierService from "@/services/products/ProductModifierService";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";

export default {
  name: "ProductModifierForm",
  components: {
    Loader,
  },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    form: {
      product_id: "",
      modifiers: [],
    },
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.form.product_id = this.$route.params.id;
    if (this.form.product_id !== "" && this.form.product_id !== undefined) {
      this.getProductModifier();
    }
  },
  methods: {
    getProductModifier() {
      this.$store.commit("set_loader");
      ProductModifierService.getAll()
        .then(({ data }) => {
          this.displayData(data.data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$store.commit("close_loader");
          this.$router.push({ path: "/products" });
        });
    },
    toggleModifier(index) {
      this.form.modifiers[index].checked = !this.form.modifiers[index].checked;
    },
    displayData(data = null) {
      if (data && data.length) {
        this.form.modifiers = [];
        let modifiers = this.form.modifiers;
        data.map((item) => {
          modifiers.push({
            uuid: item.uuid,
            name: item.name,
            checked: false,
          });
        });
      }
    },
    updateProductModifier() {
      let formData = this.form;
      this.$store.commit("set_loader");
      ProductModifierService.update(this.form.product_id, formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Modifier Updated Successfully",
              timer: 3600,
            });
            this.displayData(res.data);
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
    },
  },
};
</script>
