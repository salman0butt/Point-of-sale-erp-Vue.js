<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Date: </CCol>
                <CCol sm="6" md="8" class="pt-2"> 00/00/2022 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Time: </CCol>
                <CCol sm="6" md="8" class="pt-2"> 00:00 AM </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Cash </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Card </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Benefits </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Amount </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Discount </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Tax </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Return </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Expense </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="8" class="pt-2">
              <CTextarea
                label="Note"
                placeholder="content.."
                type="textarea"
                v-model="form.note"
              />
            </CCol>
            <CCol sm="12" md="4" class="pt-2">
              <a
                v-if="showSmsButton"
                color="success"
                class="btn btn-sm btn-warning"
                style="color: #fff; margin-right: 5px; text-align: center"
                @click.prevent="
                  options.contacts && options.contacts.length > 1
                    ? openSmsModel()
                    : sendSms('quotation')
                "
              >
                <CIcon name="cis-mobile-sms" /> Send Sms</a
              >
              <CButton color="success" style="margin-top: 3rem">Closing</CButton>
            </CCol>
          </CRow>

          <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
        </form>
      </CCol>
    </CRow>
    <SmsPluginModel :contacts="options.contacts" type="invoice" />
  </div>
</template>
<script>
// import SupplierServices from "@/services/contacts/supplier/SupplierServices";
// import { required } from "vuelidate/lib/validators";
import { smsMixin } from "@/mixins/plugins/smsMixin";
import SmsPluginModel from "@/components/plugins/sms/SmsPluginModel";
export default {
  name: "OpeningForm",
  components: {
    SmsPluginModel,
  },
  mixins: [smsMixin],
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      name: "",
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
