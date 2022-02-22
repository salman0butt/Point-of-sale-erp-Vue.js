<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow v-for="(value, index) in form.serverValues" :key="index">
                <CCol sm="6" md="4" class="pt-2 bolder">
                  {{ value.denominations }}
                </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput
                    type="number"
                    v-model="form.formValues[index].input"
                    @change="calculate()"
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CurrencyDenominationService from "@/services/currency/CurrencyDenominationService";
export default {
  name: "OpeningForm",
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
    },
    form: {
      serverValues: [],
      formValues: [],
    },
  }),
  created() {
    this.createMethod();
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.$emit("reset-model");
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    calculate() {
      let total = parseFloat("0.000");
      let formValues = this.form.formValues;
      formValues.map((value) => {
        total += parseFloat(value.input) * parseFloat(value.value);
      });

      this.$emit("total", total.toFixed(3));
    },
    createMethod() {
      let denominations = this.form.serverValues;
      let formValues = this.form.formValues;
      CurrencyDenominationService.getAll()
        .then(({ data }) => {
          data.map((value) => {
            denominations.push(value);
            formValues.push({ input: 0, value: value.value });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // saveData() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     let data = this.form;
    //     SupplierServices.quickAdd(data)
    //       .then((res) => {
    //         if (res.status === 201 || res.status === 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Supplier Created Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.resetForm();
    //         }
    //       })
    //       .catch((error) => {
    //         if (error.response.status == 422) {
    //           let errors = error.response.data.errors;
    //           this.$swal.fire({
    //             icon: "error",
    //             title: "Serial No",
    //             text: errors.serial_no,
    //             timer: 3600,
    //           });
    //         } else {
    //           this.$swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "Something Went Wrong",
    //             timer: 3600,
    //           });
    //         }
    //       });
    //   }
    // },
    // resetForm() {
    //   for (let key in this.form) {
    //     this.form[key] = "";
    //   }
    // },
  },
};
</script>

<style scoped>
.bolder {
  font-weight: bold;
}
</style>
