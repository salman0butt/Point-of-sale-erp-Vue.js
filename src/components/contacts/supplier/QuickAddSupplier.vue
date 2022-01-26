<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Company Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Company Name is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Company Reference/Cr No"
                v-model="form.reference"
                :class="{ error: $v.form.reference.$error }"
                @input="$v.form.reference.$touch()"
              />
              <div v-if="$v.form.reference.$error">
                <p v-if="!$v.form.reference.required" class="errorMsg">
                  Company Reference is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Group"
                :options="options.group"
                :value.sync="form.group"
                :class="{ error: $v.form.group.$error }"
                @input="$v.form.group.$touch()"
              />
              <div v-if="$v.form.group.$error">
                <p v-if="!$v.form.group.required" class="errorMsg">Group is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Contact"
                type="number"
                v-model="form.contact"
                :class="{ error: $v.form.contact.$error }"
                @input="$v.form.contact.$touch()"
              />
              <div v-if="$v.form.contact.$error">
                <p v-if="!$v.form.contact.required" class="errorMsg">
                  Contact is required
                </p>
                <p v-if="!$v.form.contact.numeric" class="errorMsg">
                  Contact Should be numeric
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Email"
                v-model="form.email"
                :class="{ error: $v.form.email.$error }"
                @input="$v.form.email.$touch()"
              />
              <div v-if="$v.form.email.$error">
                <p v-if="!$v.form.email.required" class="errorMsg">Email is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Address"
                v-model="form.address"
                :class="{ error: $v.form.address.$error }"
                @input="$v.form.address.$touch()"
              />
              <div v-if="$v.form.address.$error">
                <p v-if="!$v.form.address.required" class="errorMsg">
                  Address is required
                </p>
              </div>
            </CCol>
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
          <!-- <CRow class="mt-4"> -->

          <!-- <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 200px; margin-left: 20px"
              type="submit"
              @click="saveAndExit = false"
              >Save and View</CButton
            >
            <CButton
              timeout="2000"
              block
              color="danger"
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >Save & Exit</CButton
            > -->
          <!-- </CRow> -->
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CustomerSettingService from "@/services/settings/CustomerSettingService";
import GroupServices from "@/services/groups/GroupServices";
import SupplierServices from "@/services/contacts/supplier/SupplierServices";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "QuickAddCustomer",
  data: () => ({
    form: {
      name: "",
      reference: "",
      group: "",
      contact: "",
      email: "",
      address: "",
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
        name: { required },
        reference: { required },
        group: { required },
        contact: { required, numeric },
        email: { required },
        address: { required },
      },
    };
  },
  created() {
    this.getDependenices();
  },
  watch: {
    saveIt: function (val) {
      this.$v.$touch();
      if (val && !this.$v.$invalid) {
        this.saveData();
        this.$store.commit("set_save_supplier_model", false);
        this.$store.commit("set_supplier_model", false);
      } else {
        this.$store.commit("set_save_supplier_model", false);
      }
    },
  },
  computed: {
    saveIt() {
      return this.$store.getters.getSaveSupplierModel;
    },
  },
  methods: {
    getDependenices() {
      // Customer Types
      let type = "supplier";
      CustomerSettingService.getAll(type)
        .then(({ data }) => {
          let type = this.options.type;
          data.map(function (val) {
            // Customer Types
            if (val.key == "supplier_types") {
              let supplier_types = JSON.parse(val.value);
              supplier_types.forEach((element) => {
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
      let module_type = "supplier";
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
        SupplierServices.quickAdd(data)
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Supplier Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
            }
          })
          .catch((error) => {
            if (error.response.status == 422) {
              let errors = error.response.data.errors;
              this.$swal.fire({
                icon: "error",
                title: "Serial No",
                text: errors.serial_no,
                timer: 3600,
              });
            } else {
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong",
                timer: 3600,
              });
            }
          });
      }
    },
    resetForm() {
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
  },
};
</script>
