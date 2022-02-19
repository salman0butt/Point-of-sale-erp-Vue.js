<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.005 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input1" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.010 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input2" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.025 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input3" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.050 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input4" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.100 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input5" @change="calculate()" />
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 0.500 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input6" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 1.000 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input7" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 5.000 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input8" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 10.000 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input9" @change="calculate()" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> 20.000 </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput type="number" v-model="form.input10" @change="calculate()" />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <!-- <CRow>
            <CCol sm="12" md="12" class="pt-2"> <h3>Total 0 .000 BD</h3> </CCol>
          </CRow> -->

          <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import SupplierServices from "@/services/contacts/supplier/SupplierServices";
// import { required } from "vuelidate/lib/validators";

export default {
  name: "OpeningForm",
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      total: 0,
    },
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
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
    // this.getDependenices();
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        // this.saveData();
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
      let total = parseFloat("0.00");
      if (this.form.input1) total += parseFloat(this.form.input1) * 0.005;
      if (this.form.input2) total += parseFloat(this.form.input2) * 0.01;
      if (this.form.input3) total += parseFloat(this.form.input3) * 0.025;
      if (this.form.input4) total += parseFloat(this.form.input4) * 0.05;
      if (this.form.input5) total += parseFloat(this.form.input5) * 0.1;
      if (this.form.input6) total += parseFloat(this.form.input6) * 0.5;
      if (this.form.input7) total += parseFloat(this.form.input7) * 1.0;
      if (this.form.input8) total += parseFloat(this.form.input8) * 5.0;
      if (this.form.input9) total += parseFloat(this.form.input9) * 10.0;
      if (this.form.input10) total += parseFloat(this.form.input10) * 20.0;
      this.form.total = total.toFixed(2);
      this.$emit("total", this.form.total);
    },
    // getDependenices() {
    //   // Customer Types
    //   let type = "supplier";
    //   CustomerSettingService.getAll(type)
    //     .then(({ data }) => {
    //       let type = this.options.type;
    //       data.map(function (val) {
    //         // Customer Types
    //         if (val.key == "supplier_types") {
    //           let supplier_types = JSON.parse(val.value);
    //           supplier_types.forEach((element) => {
    //             type.push({
    //               value: element,
    //             });
    //           });
    //         }
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
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
