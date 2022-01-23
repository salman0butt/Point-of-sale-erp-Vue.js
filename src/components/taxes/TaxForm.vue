<template>
  <CRow>
    <CCol xs="12" lg="12">
      <CCardHeader> Taxes </CCardHeader>
      <form @submit.prevent="isEditingTax ? updateTax() : createTax()">
        <CRow>
          <CCol sm="4" md="4" class="pt-2">
            <div class="form-group">
              <label for="tax_name">Name</label>
              <input
                type="text"
                class="form-control"
                id="tax_name"
                placeholder="Name"
                v-model="tax_form.name"
                @input="$v.tax_form.name.$touch()"
              />
            </div>
            <div v-if="$v.tax_form.name.$error">
              <p v-if="!$v.tax_form.name.required" class="errorMsg">Name is required</p>
            </div>
          </CCol>
          <CCol sm="4" md="4" class="pt-2">
            <div class="form-group">
              <label for="tax_percentage"> Rate %</label>
              <input
                type="number"
                class="form-control"
                id="tax_percentage"
                placeholder="0"
                v-model="tax_form.percentage"
                @input="$v.tax_form.percentage.$touch()"
              />
            </div>
            <div v-if="$v.tax_form.percentage.$error">
              <p v-if="!$v.tax_form.percentage.required" class="errorMsg">
                Rate % is required
              </p>
            </div>
          </CCol>
          <CCol sm="2" md="2" class="pt-2">
            <CButton
              class="pt-2"
              progress
              timeout="2000"
              block
              color="success"
              style="float: left; margin-top: 27px"
              type="submit"
              >{{ this.isEditingTax ? "Save" : "+" }}</CButton
            >
          </CCol>
        </CRow>
      </form>
      <TaxIndex @edit-tax="editTax($event)" :updatedObj="updatedObj" />
    </CCol>
  </CRow>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import TaxService from "@/services/taxes/TaxService";
import TaxIndex from "./TaxIndex.vue";

export default {
  name: "TaxForm",
  components: {
    TaxIndex,
  },
  data: () => ({
    updatedObj: "",
    tax_form: {
      id: "",
      name: "",
      percentage: "",
    },
    isEditingTax: false,
  }),
  validations() {
    return {
      tax_form: {
        name: { required },
        percentage: { required },
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    getTax(uuid) {
      this.$store.commit("set_loader");
      TaxService.get(uuid)
        .then(({ data }) => {
          if (data) {
            this.tax_form.id = data.uuid;
            this.tax_form.name = data.name;
            this.tax_form.percentage = data.percentage;
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.isEditingTax = false;
          console.log(error);
        });
    },
    editTax(uuid) {
      this.isEditingTax = true;
      this.getTax(uuid);
    },
    createTax() {
      this.$v.tax_form.$touch();
      if (!this.$v.tax_form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.tax_form;
        TaxService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Tax Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.tax_form = {
                name: "",
                percentage: "",
              };
              this.$store.commit("close_loader");
              // this.getTaxes();
              this.updatedObj = { type: "store", payload: res.data };
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
    updateTax() {
      this.$v.tax_form.$touch();
      if (!this.$v.tax_form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.tax_form;
        if (this.tax_form.id === "" || this.tax_form.id === undefined) {
          this.createTax();
        }
        TaxService.update(this.tax_form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Tax Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.tax_form = {
                name: "",
                percentage: "",
              };
              this.tax_form.id = "";
              this.isEditingTax = false;
              this.$store.commit("close_loader");
              // this.getTaxes();
              this.updatedObj = { type: "update", payload: res.data };
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
  },
};
</script>
