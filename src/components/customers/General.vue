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
                    :class="{ error: $v.form.serial_no.$error }"
                    @input="$v.form.serial_no.$touch()"
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
              <!-- <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Martial Status"
                    :options="options.marital_status"
                    :value.sync="form.marital_status"
                    :class="{ error: $v.form.marital_status.$error }"
                    @input="$v.form.marital_status.$touch()"
                  />
                  <div v-if="$v.form.marital_status.$error">
                    <p v-if="!$v.form.marital_status.required" class="errorMsg">
                      Martial Status is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Phone"
                    type="number"
                    :value.sync="form.phone_number"
                    :class="{ error: $v.form.phone_number.$error }"
                    @input="$v.form.phone_number.$touch()"
                  />
                  <div v-if="$v.form.phone_number.$error">
                    <p v-if="!$v.form.phone_number.required" class="errorMsg">
                      Phone is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Email"
                    type="email"
                    :value.sync="form.email"
                    :class="{ error: $v.form.email.$error }"
                    @input="$v.form.email.$touch()"
                  />
                  <div v-if="$v.form.email.$error">
                    <p v-if="!$v.form.email.required" class="errorMsg">
                      Email is required
                    </p>
                    <p v-if="!$v.form.email.email" class="errorMsg">
                      Please Enter the valid email.
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="DOB"
                    type="date"
                    :value.sync="form.dob"
                    :class="{ error: $v.form.dob.$error }"
                    @input="$v.form.dob.$touch()"
                  />
                  <div v-if="$v.form.dob.$error">
                    <p v-if="!$v.form.dob.required" class="errorMsg">
                      DOB is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Nationality"
                    :value.sync="form.nationality"
                    :class="{ error: $v.form.nationality.$error }"
                    @input="$v.form.nationality.$touch()"
                  />
                  <div v-if="$v.form.nationality.$error">
                    <p v-if="!$v.form.nationality.required" class="errorMsg">
                      Nationality is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Address"
                    :value.sync="form.address"
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
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Manager"
                    :options="options.managers"
                    :value.sync="form.manager_id"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="CPR No"
                    type="text"
                    :value.sync="form.cpr_no"
                    :class="{ error: $v.form.cpr_no.$error }"
                    @input="$v.form.cpr_no.$touch()"
                  />
                  <div v-if="$v.form.cpr_no.$error">
                    <p v-if="!$v.form.cpr_no.required" class="errorMsg">
                      CPR is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="CPR Expiry"
                    type="date"
                    :value.sync="form.cpr_no_expiry"
                    :class="{ error: $v.form.cpr_no_expiry.$error }"
                    @input="$v.form.cpr_no_expiry.$touch()"
                  />
                  <div v-if="$v.form.cpr_no_expiry.$error">
                    <p v-if="!$v.form.cpr_no_expiry.required" class="errorMsg">
                      CPR Expiry is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Branches"
                    :options="options.branches"
                    :value.sync="form.branch_id"
                    :class="{ error: $v.form.branch_id.$error }"
                    @input="$v.form.branch_id.$touch()"
                  />
                  <div v-if="$v.form.branch_id.$error">
                    <p v-if="!$v.form.branch_id.required" class="errorMsg">
                      Branch is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Departments"
                    :options="options.departments"
                    :value.sync="form.department_id"
                    :class="{ error: $v.form.department_id.$error }"
                    @input="$v.form.department_id.$touch()"
                  />
                  <div v-if="$v.form.department_id.$error">
                    <p v-if="!$v.form.department_id.required" class="errorMsg">
                      Department is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Passport No"
                    type="text"
                    :value.sync="form.passport_no"
                    :class="{ error: $v.form.passport_no.$error }"
                    @input="$v.form.passport_no.$touch()"
                  />
                  <div v-if="$v.form.passport_no.$error">
                    <p v-if="!$v.form.passport_no.required" class="errorMsg">
                      Passport No is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Passport Expiry"
                    type="date"
                    :value.sync="form.passport_expiry"
                    :class="{ error: $v.form.passport_expiry.$error }"
                    @input="$v.form.passport_expiry.$touch()"
                  />
                  <div v-if="$v.form.passport_expiry.$error">
                    <p
                      v-if="!$v.form.passport_expiry.required"
                      class="errorMsg"
                    >
                      Passport Expiry is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Designation"
                    :options="options.designations"
                    :value.sync="form.designation_id"
                    :class="{ error: $v.form.designation_id.$error }"
                    @input="$v.form.designation_id.$touch()"
                  />
                  <div v-if="$v.form.designation_id.$error">
                    <p v-if="!$v.form.designation_id.required" class="errorMsg">
                      Designation is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
              </CRow>

              <CInputCheckbox
                @change="toggleUserSection"
                custom
                :checked="form.create_user"
                label="Create Username"
              />
              <div v-if="form.create_user">
                <CRow>
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput label="Username" :value.sync="form.user_name" />
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput label="User Email" :value.sync="form.user_email" />
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Password"
                      type="password"
                      :value.sync="form.user_pass"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Role"
                      :options="options.user_role"
                      :value.sync="form.user_role"
                    />
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Status"
                      :options="options.user_status"
                      :value.sync="form.user_status"
                    />
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Select Language"
                      :options="options.user_language"
                      :value.sync="form.user_language"
                    />
                  </CCol>
                </CRow>
              </div>
              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <CCardBody>
                    <div class="mb-2" style="padding: 5px; background: #f7e9e9">
                      <CImg
                        v-bind:src="form.previewImage"
                        block
                        class="mb-2"
                        width="100%"
                      />
                    </div>
                    <div>
                      Choose Profile:
                      <input
                        type="file"
                        @change="pickFile"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                  </CCardBody>
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                Please Fill the required data
              </p> -->
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
  name: "CustomerGeneralForm",
  data: () => ({
    saveAndExit: false,
    isEditing: false,
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
    this.checkUpdateOrCreate();
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
              if (this.saveAndExit) {
                this.$router.push({ path: "/customers" });
              }
              //  else {
              //   this.$router.push({ path: "/customers/edit/" + res.data.uuid });
              // }
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
        CustomerServices.get(this.$route.params.id)
          .then((res) => {
            this.form.full_name = res.data.full_name;
            this.form.serial_no = res.data.serial_no;
            this.form.type = res.data.type;
            this.form.group = res.data.group.uuid;
          })
          .catch((error) => {
            this.$router.push({ path: "/customers" });
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
