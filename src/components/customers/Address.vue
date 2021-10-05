<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Address</CCardHeader>
          <CCardBody>
            <form @submit.prevent="updateOrCreate">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.type"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    @input="$v.form.type.$touch()"
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
                  />
                  <div v-if="$v.form.group.$error">
                    <p v-if="!$v.form.group.required" class="errorMsg">
                      Group is required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  >Save & Continue</CButton
                >
                <CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="
                    float: right;
                    width: 140px;
                    margin-left: 20px;
                    margin-top: 0;
                  "
                  @click="saveAndExit = true"
                  type="submit"
                  >Save & Exit</CButton
                >
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
import CustomerServices from "@/services/customers/CustomerServices";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "CustomerAddress",
  data: () => ({
    isEditing: false,
    saveAndExit: false,

    form: {
      serial_no: "",
      full_name: "",
      type: "",
      group: "",
    },

    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      group: [
        { value: "", label: "Choose Group", disabled: true, selected: "" },
      ],
    },
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
  },
  methods: {
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
      GroupServices.getActivegroups(active)
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
    updateOrCreate() {
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
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
