<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeEmergencyContact() : saveEmployeeEmergencyContact()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Emergency Contact Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Emergency Contact Name is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Relationship"
                v-model="form.relationship"
                :class="{ error: $v.form.relationship.$error }"
                @input="$v.form.relationship.$touch()"
              />
              <div v-if="$v.form.relationship.$error">
                <p v-if="!$v.form.relationship.required" class="errorMsg">
                  Relationship is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Phone Number"
                v-model="form.phone_number"
                :class="{ error: $v.form.phone_number.$error }"
                @input="$v.form.phone_number.$touch()"
              />
              <div v-if="$v.form.phone_number.$error">
                <p v-if="!$v.form.phone_number.required" class="errorMsg">
                  Phone Number is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
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
          <CRow class="mt-4 d-block">
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 150px; margin-right: 20px"
              type="submit"
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeEmergencyContactService from "@/services/employees/EmployeeEmergencyContactService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeEmergencyContactForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      relationship: "",
      phone_number: "",
      address: "",
    },
    empId: null,
  }),
  validations() {
    return {
      form: {
        name: { required },
        relationship: { required },
        phone_number: { required },
        address: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
  },
  methods: {
    saveEmployeeEmergencyContact() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeEmergencyContactService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Emergency Contact Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-emergency-contact-update", {
                type: "create",
                data: res.data,
              });
              this.$v.$reset();
              this.resetForm();
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateEmployeeEmergencyContact() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeEmergencyContactService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Emergency Contact Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-emergency-contact-update", {
                type: "edit",
                data: res.data,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    getEmployeeEmergencyContact() {
      EmployeeEmergencyContactService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.relationship = data.relationship;
            this.form.phone_number = data.phone_number;
            this.form.address = data.address;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeEmergencyContact();
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
