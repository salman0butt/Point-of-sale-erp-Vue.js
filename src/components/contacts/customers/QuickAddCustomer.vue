<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Fullname"
                v-model="form.full_name"
                :class="{ error: $v.form.full_name.$error }"
                @input="$v.form.full_name.$touch()"
              />
              <div v-if="$v.form.full_name.$error">
                <p v-if="!$v.form.full_name.required" class="errorMsg">
                  Fullname is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Type"
                :options="options.type"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                v-on:change="CustomerType"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">
                  Customer Type is required
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
                <p v-if="!$v.form.group.required" class="errorMsg">
                  Group is required
                </p>
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
                <p v-if="!$v.form.email.required" class="errorMsg">
                  Email is required
                </p>
                <p v-if="!$v.form.email.email" class="errorMsg">
                  Please Enter a valid email
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="Flat" v-model="form.flat" />
            </CCol>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="Floor" v-model="form.floor" />
            </CCol>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="building" v-model="form.building" />
            </CCol>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="Street" v-model="form.street" />
            </CCol>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="Block" v-model="form.block" />
            </CCol>
            <CCol sm="4" md="4" class="pt-2">
              <CInput label="Area" v-model="form.area" />
            </CCol>
          </CRow>
          <CRow>
            <CCol v-show="type_selected" sm="6" md="6" class="pt-2">
              <CInput label="Vat Number" v-model="form.vat_no" />
            </CCol>

            <CCol v-show="type_selected" sm="6" md="6" class="pt-2">
              <CInput label="License Number" v-model="form.license_no" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea label="Notes" type="textarea" v-model="form.notes" />
            </CCol>
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">
            Please Fill the required data
          </p>
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
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import { required, numeric, email } from "vuelidate/lib/validators";

export default {
  name: "QuickAddCustomer",
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      full_name: "",
      type: "",
      group: "",
      contact: "",
      email: "",
      flat: "",
      floor: "",
      building: "",
      street: "",
      block: "",
      area: "",
      notes: "",
      vat_no: "",
      license_no: "",
    },
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      group: [
        { value: "", label: "Choose Group", disabled: true, selected: "" },
      ],
    },
    type_selected: false,
  }),
  validations() {
    return {
      form: {
        full_name: { required },
        type: { required },
        group: { required },
        contact: { required, numeric },
        email: { required, email },
      },
    };
  },
  created() {
    this.getDependenices();
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.saveData();
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
        CustomerServices.quickAdd(data)
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Customer Created Successfully",
                timer: 3600,
              });
              this.$emit("new-data", res.data);
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
