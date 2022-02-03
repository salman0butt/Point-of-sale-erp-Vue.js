<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>General</CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateData() : saveData()">
              <CRow>
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
                    label="Company Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Company Name is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Company Reference/Cr No"
                    v-model="form.reference"
                    :class="{ error: $v.form.reference.$error }"
                    @input="$v.form.reference.$touch()"
                    v-bind:disabled="readOnly"
                  />
                  <div v-if="$v.form.reference.$error">
                    <p v-if="!$v.form.reference.required" class="errorMsg">
                      Company Reference is required
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
                <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                    v-bind:disabled="readOnly"
                  />
                </CCol>
              </CRow>

              <CRow class="mt-4" v-if="!readOnly">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  >Save</CButton
                >
                <!-- <CButton
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
import GroupServices from "@/services/groups/GroupServices";
import SupplierServices from "@/services/contacts/supplier/SupplierServices";

import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "SupplierGeneralForm",
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
      name: "",
      reference: "",
      group: "",
    },
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      group: [{ value: "", label: "Choose Group", disabled: true, selected: "" }],
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        serial_no: { required, numeric },
        reference: { required },
        group: { required },
      },
    };
  },
  created() {
    this.getDependenices();
    this.checkUpdateOrCreate();
  },
  methods: {
    getDependenices() {
      // Supplier Groups
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
        SupplierServices.store(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Supplier Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/supplier" });
              } else {
                this.$router.push({ path: "/supplier/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong",
              timer: 3600,
            });
          });
      }
    },
    updateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        SupplierServices.update(this.$route.params.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Supplier Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/supplier" });
              } else {
                this.$router.push({ path: "/supplier/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong",
              timer: 3600,
            });
          });
      }
    },

    checkUpdateOrCreate() {
      if (this.$route.params.id) {
        this.isEditing = true;
        SupplierServices.get(this.$route.params.id)
          .then((res) => {
            this.form.name = res.data.name;
            this.form.serial_no = res.data.serial_no;
            this.form.reference = res.data.reference;
            this.form.group = res.data.group.uuid;
            this.form.status = res.data.status;
          })
          .catch((error) => {
            this.$router.push({ path: "/supplier" });
          });
      }
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
