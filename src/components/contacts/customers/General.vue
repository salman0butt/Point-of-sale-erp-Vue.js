<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>General</CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateData() : saveData()">
              <CRow>
                <Loader />
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.type"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    v-on:change="CustomerType"
                    @input="$v.form.type.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">
                      Customer Type is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Serial No"
                    type="number"
                    v-model="form.serial_no"
                    :class="{ error: $v.form.serial_no.$error }"
                    @input="$v.form.serial_no.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.serial_no.$error">
                    <p v-if="!$v.form.serial_no.required" class="errorMsg">
                      Serial Number is required
                    </p>
                    <p v-if="!$v.form.serial_no.numeric" class="errorMsg">
                      Serial Number must be Numeric
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Fullname"
                    v-model="form.full_name"
                    :class="{ error: $v.form.full_name.$error }"
                    @input="$v.form.full_name.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.full_name.$error">
                    <p v-if="!$v.form.full_name.required" class="errorMsg">
                      Fullname is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Group"
                    :options="options.group"
                    :value.sync="form.group"
                    :class="{ error: $v.form.group.$error }"
                    @input="$v.form.group.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.group.$error">
                    <p v-if="!$v.form.group.required" class="errorMsg">
                      Group is required
                    </p>
                  </div>
                </CCol>
                <CCol v-show="type_selected" sm="6" md="4" class="pt-2">
                  <CInput
                    label="Vat Number"
                    v-model="form.vat_no"
                    v-bind:disabled="readOnly"
                  />
                </CCol>
                <CCol v-show="type_selected" sm="6" md="4" class="pt-2">
                  <CInput
                    label="License Number"
                    v-model="form.license_no"
                    v-bind:disabled="readOnly"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Birthday Date"
                    type="date"
                    v-model="form.birthday_date"
                    v-bind:disabled="readOnly"
                  />
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
              <CRow class="mt-4" v-if="!readOnly">
                <!-- <CLoadingButton
                  progress
                  timeout="2000"
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  >Save</CLoadingButton
                > -->
                <CLoadingButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  >Save</CLoadingButton
                >
                <!--<CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                  @click="saveAndExit = true"
                  type="submit"
                  >Save & Exit</CButton
                > -->
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CustomerSettingService from "@/services/settings/CustomerSettingService";
import GroupServices from "@/services/groups/GroupServices";
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import { required, numeric } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";
export default {
  name: "CustomerGeneralForm",
  components: { Loader },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    saveAndExit: false,
    isEditing: false,
    form: {
      serial_no: "",
      full_name: "",
      type: "",
      group: "",
      vat_no: "",
      license_no: "",
      birthday_date: "",
    },

    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      group: [{ value: "", label: "Choose Group", disabled: true, selected: "" }],
    },
    type_selected: false,
  }),
  validations() {
    return {
      form: {
        full_name: { required },
        serial_no: { required, numeric },
        type: { required },
        group: { required },
      },
    };
  },
  created() {
    this.getDependenices();
    this.checkUpdateOrCreate();
  },
  methods: {
    CustomerType() {
      if (this.form.type != "individual") {
        this.type_selected = true;
      } else {
        this.type_selected = false;
      }
    },
    getDependenices() {
      // Customer Types
      let type = "customer";
      CustomerSettingService.getAll(type)
        .then(({ data }) => {
          let type = this.options.type;
          data.map(function (val) {
            // Customer Types
            if (val.key == "customer_types") {
              let customer_types = JSON.parse(val.value);
              customer_types.forEach((element) => {
                type.push({
                  value: element,
                });
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // Customer Groups
      let active = "active";
      let module_type = "customer";
      GroupServices.getActivegroups(active, module_type)
        .then(({ data }) => {
          let group = this.options.group;
          data.map(function (val) {
            group.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        CustomerServices.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Customer Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/customers" });
              } else {
                this.$router.push({ path: "/customers/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
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
      }
    },
    updateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        this.$store.commit("set_loader");
        CustomerServices.update(this.$route.params.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Customer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // if (this.saveAndExit) {
              //   this.$router.push({ path: "/customers" });
              // }
              //  else {
              //   this.$router.push({ path: "/customers/edit/" + res.data.uuid });
              // }
            }
            this.$store.commit("close_loader");
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
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            }
          });
      }
    },

    checkUpdateOrCreate() {
      if (this.$route.params.id) {
        this.isEditing = true;
        this.$store.commit("set_loader");
        CustomerServices.get(this.$route.params.id)
          .then((res) => {
            if (res.data) {
              this.form.full_name = res.data.full_name;
              this.form.serial_no = res.data.serial_no;
              this.form.type = res.data.type;
              if (res.data.type == "company") {
                this.type_selected = true;
              }
              this.form.vat_no = res.data.vat_no;
              this.form.birthday_date = res.data.birthday_date;
              this.form.license_no = res.data.license_no;
              this.form.group = res.data.group.uuid;
            }
            this.$store.commit("close_loader");
          })
          .catch((error) => {
            this.$store.commit("close_loader");
            this.$router.push({ path: "/customers" });
          });
      }
    },
  },
};
</script>
