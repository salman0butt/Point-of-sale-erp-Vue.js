<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Employee</CCardHeader>
          <CCardBody>
            <form @submit.prevent="updateEmployee">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Serial No" v-model="form.serial_no" />
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

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Gender"
                    :options="options.gender"
                    :value.sync="form.gender"
                    :class="{ error: $v.form.gender.$error }"
                    @input="$v.form.gender.$touch()"
                  />
                  <div v-if="$v.form.gender.$error">
                    <p v-if="!$v.form.gender.required" class="errorMsg">
                      Gender is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
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
                    <p v-if="!$v.form.dob.required" class="errorMsg">DOB is required</p>
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
                    <p v-if="!$v.form.passport_expiry.required" class="errorMsg">
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
                    :class="{ error: $v.form.status.$error }"
                    @input="$v.form.status.$touch()"
                  />
                  <div v-if="$v.form.status.$error">
                    <p v-if="!$v.form.status.required" class="errorMsg">
                      Status is required
                    </p>
                  </div>
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
                    <CInput
                      label="Username"
                      :value.sync="form.user_name"
                      :class="{ error: $v.form.user_name.$error }"
                      @input="$v.form.user_name.$touch()"
                    />
                    <div v-if="$v.form.user_name.$error">
                      <p v-if="!$v.form.user_name.required" class="errorMsg">
                        Username is required
                      </p>
                    </div>
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="User Email"
                      :value.sync="form.user_email"
                      :class="{ error: $v.form.user_email.$error }"
                      @input="$v.form.user_email.$touch()"
                    />
                    <div v-if="$v.form.user_email.$error">
                      <p v-if="!$v.form.user_email.required" class="errorMsg">
                        email is required
                      </p>
                    </div>
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Password"
                      type="password"
                      :value.sync="form.user_pass"
                      :class="{ error: $v.form.user_pass.$error }"
                      @input="$v.form.user_pass.$touch()"
                    />
                    <div v-if="$v.form.user_pass.$error">
                      <p v-if="!$v.form.user_pass.required" class="errorMsg">
                        Password is required
                      </p>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Role"
                      :options="options.user_role"
                      :value.sync="form.user_role"
                      :class="{ error: $v.form.user_role.$error }"
                      @input="$v.form.user_role.$touch()"
                    />
                    <div v-if="$v.form.user_role.$error">
                      <p v-if="!$v.form.user_role.required" class="errorMsg">
                        Role is required
                      </p>
                    </div>
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Status"
                      :options="options.user_status"
                      :value.sync="form.user_status"
                      :class="{ error: $v.form.user_status.$error }"
                      @input="$v.form.user_status.$touch()"
                    />
                    <div v-if="$v.form.user_status.$error">
                      <p v-if="!$v.form.user_status.required" class="errorMsg">
                        Status is required
                      </p>
                    </div>
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
                    <CSelect
                      label="Select Language"
                      :options="options.user_language"
                      :value.sync="form.user_language"
                      :class="{ error: $v.form.user_language.$error }"
                      @input="$v.form.user_language.$touch()"
                    />
                    <div v-if="$v.form.user_language.$error">
                      <p v-if="!$v.form.user_language.required" class="errorMsg">
                        Language is required
                      </p>
                    </div>
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

              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  :disabled="$v.$invalid"
                  >Save & Continue</CButton
                >
                <CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                  @click="saveAndExit = true"
                  type="submit"
                  :disabled="$v.$invalid"
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
import EmployeeService from "@/services/employees/EmployeeService";
import { required, email, numeric } from "vuelidate/lib/validators";

export default {
  name: "EmployeeForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,

    form: {
      serial_no: "",
      full_name: "",
      gender: "",
      marital_status: "",
      phone_number: "",
      email: "",
      dob: "",
      nationality: "",
      address: "",
      cpr_no: "",
      cpr_no_expiry: "",
      passport_no: "",
      passport_expiry: "",
      branch_id: "",
      department_id: "",
      designation_id: "",
      status: "",
      personal_photo: "",
      documents: "",
      previewImage: "https://picsum.photos/1024/480/?image=54",
      create_user: false,
      user_name: "",
      user_email: "",
      user_pass: "",
      user_role: "",
      user_status: null,
      user_language: "",
    },
    empId: null,
    options: {
      branches: [{ value: "", label: "Choose Branch" }],
      managers: [{ value: "", label: "Choose Manager" }],
      departments: [{ value: "", label: "Choose Departments" }],
      designations: [{ value: "", label: "Choose Designations" }],
      gender: [
        { value: "", label: "Choose Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      marital_status: [
        { value: "", label: "Choose Status" },
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
      ],
      status: [
        { value: "", label: "Choose Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      user_role: [
        { value: "", label: "Choose Status" },
        { value: "super-admin", label: "Super Admin" },
      ],
      user_status: [
        { value: "", label: "Choose Status" },
        { value: "1", label: "Active" },
        { value: "0", label: "InActive" },
      ],
      user_language: [
        { value: "", label: "Choose Language" },
        { value: "eng", label: "English" },
        { value: "ar", label: "Arabic" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        full_name: { required },
        gender: { required },
        marital_status: { required },
        phone_number: { required, numeric },
        email: { required, email },
        dob: { required },
        nationality: { required },
        address: { required },
        cpr_no: { required },
        cpr_no_expiry: { required },
        passport_no: { required },
        passport_expiry: { required },
        branch_id: { required },
        department_id: { required },
        designation_id: { required },
        status: { required },
        user_name: { required },
        user_email: { required },
        user_pass: { required },
        user_role: { required },
        user_status: { required },
        user_language: { required },
      },
    };
  },
  created() {
    this.getDetail();
    this.getEmployee();
  },
  methods: {
    getDetail() {
      EmployeeService.getCreateDetail()
        .then(({ data }) => {
          let branches = this.options.branches;
          let managers = this.options.managers;
          let departments = this.options.departments;
          let designations = this.options.designations;
          data.branches.map(function (val) {
            branches.push({ value: val.id, label: val.name.en });
          });
          data.managers.map(function (val) {
            managers.push({ value: val.id, label: val.full_name.en });
          });
          data.departments.map(function (val) {
            departments.push({ value: val.id, label: val.name.en });
          });
          data.designations.map(function (val) {
            designations.push({ value: val.id, label: val.name });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEmployee() {
      this.empId = this.$route.params.id;
      EmployeeService.get(this.empId)
        .then(({ data }) => {
          this.form.serial_no = data.serial_no;
          this.form.full_name = data.full_name;
          this.form.gender = data.gender;
          this.form.marital_status = data.marital_status;
          this.form.phone_number = data.phone_number;
          this.form.email = data.email;
          this.form.dob = data.dob;
          this.form.nationality = data.nationality;
          this.form.address = data.address;
          this.form.cpr_no = data.cpr_no;
          this.form.cpr_no_expiry = data.cpr_no_expiry;
          this.form.passport_no = data.passport_no;
          this.form.passport_expiry = data.passport_expiry;
          this.form.branch_id = data.branch_id[0];
          this.form.department_id = data.department_id;
          this.form.designation_id = data.designation_id;
          this.form.manager_id = data.manager_id;
          this.form.personal_photo = data.personal_photo;
          this.form.status = data.status;
          this.form.create_user = data.create_user == "true" ? true : false;
          this.form.user_name = data.user.name;
          this.form.user_email = data.user.email;
          this.form.user_role = data.user.role[0];
          this.form.user_status = data.user.status.toString();
          this.form.user_language = data.user.user_language;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeService.update(this.empId, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Employee Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/employees/index" });
              } else {
                this.$router.push({ path: "/employees/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    toggleUserSection() {
      this.form.create_user = !this.form.create_user;
    },
    pickFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.form.personal_photo = file[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          this.form.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
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
