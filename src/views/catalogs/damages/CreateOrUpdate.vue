<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>{{ isEditing ? "Edit" : "Create" }} Damage </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updateDamage() : saveDamage()">
                  <SearchProduct searchType="damage" :itemsData="form.items" />
                  <CRow>
                    <!-- <CCol sm="12" md="12" class="pt-2">
              <CTextarea label="Reason" placeholder="Content..." v-model="form.reason" />
            </CCol> -->
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="Date"
                        type="date"
                        v-model="form.date"
                        :class="{ error: $v.form.date.$error }"
                        @input="$v.form.date.$touch()"
                      />
                      <div v-if="$v.form.date.$error">
                        <p v-if="!$v.form.date.required" class="errorMsg">
                          Date is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>

                  <p v-if="$v.$anyError" class="errorMsg">
                    Damage Qty and Reason is required
                  </p>
                  <CRow class="mt-4">
                    <CButton
                      progress
                      timeout="2000"
                      color="success"
                      style="float: right; width: 200px; margin-left: 20px"
                      type="submit"
                      @click="toggleSaveAndExit(false)"
                      >Save & Continue</CButton
                    >
                    <CButton
                      timeout="2000"
                      color="danger"
                      style="float: right; width: 140px; margin-left: 20px"
                      @click="toggleSaveAndExit(true)"
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
import DamageService from "@/services/catalogs/damages/DamageService";
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import SearchProduct from "@/components/layouts/SearchProduct";
import { formMixin } from "@/mixins/formMixin";
import { globalMixin } from "@/mixins/globalMixin";

export default {
  name: "CreateOrUpdateDamage",
  components: {
    SearchProduct,
  },
  mixins: [formMixin, globalMixin],
  cilTrash,
  data: () => ({
    form: {
      id: "",
      date: "",
      // reason: "",
      items: [],
      product_id: "",
    },
  }),
  validations() {
    return {
      form: {
        date: { required },
        items: {
          required: true,
          $each: {
            qty: { required },
            reason: { required },
          },
        },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.form.date = this.calculateTodayDate();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getDamage();
    }
  },
  computed: {
    damageItems() {
      return this.$store.getters.getSearchProductItems;
    },
  },
  watch: {
    damageItems(val) {
      this.form.items = val;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_search_product_items", []);
  },
  methods: {
    saveDamage() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        DamageService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Damage Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/damages/index" });
              } else {
                this.$router.push({
                  path: "/catalogs/damages/edit/" + res.data.uuid,
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
    updateDamage() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        DamageService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Damage Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/damages/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/Damages/edit/" + res.data.uuid,
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
    getDamage() {
      DamageService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.date = data.date;
            // this.form.reason = data.reason;
            let itemsData = [];
            if (data.items && data.items.length > 0) {
              data.items.map((item) => {
                // if (item && item.product_variation && item.product_variation.uuid) {
                //   itemsData.push({
                //     uuid: item.product_variation.uuid,
                //     type: "variation",
                //     name:
                //       item.product.name +
                //       " (" +
                //       JSON.parse(item.product_variation.name).en +
                //       ")",
                //     qty: item.qty,
                //     reason: item.description,
                //   });
                // } else {
                itemsData.push({
                  uuid: item.inventable.uuid,
                  type: "product",
                  name: item.inventable.name,
                  qty: item.qty,
                  reason: item.description,
                });
                // }
              });
              this.$store.commit("set_search_product_items", itemsData);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          // this.$router.push({ path: "/catalogs/damages/index" });
        });
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
