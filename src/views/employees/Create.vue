<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Employee </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab active>
                <template slot="title">
                  {{ tabs.employee }}
                </template>
                <form @submit.prevent="saveEmployee">
                  <CRow>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput label="Serial No" v-model="form.serial_no" />
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput
                        label="Full Name"
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
                      />
                    </CCol>
                  </CRow>

                  <CInputCheckbox
                    @change="toggleUserSection"
                    custom
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
                  </p>
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
                      style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                      @click="saveAndExit = true"
                      type="submit"
                      >Save & Exit</CButton
                    >
                  </CRow>
                </form>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.detail }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.salary }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.target }}
                </template>
              </CTab>
            </CTabs>
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
  name: "CreateEmployee",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    tabs: {
      employee: "Employee",
      detail: "Detail",
      salary: "Salary",
      target: "Traget",
    },
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
    options: {
      branches: [{ value: "", label: "Choose Branch", disabled: true, selected: "" }],
      managers: [{ value: "", label: "Choose Manager", disabled: true, selected: "" }],
      departments: [
        { value: "", label: "Choose Departments", disabled: true, selected: "" },
      ],
      designations: [
        { value: "", label: "Choose Designations", disabled: true, selected: "" },
      ],
      gender: [
        { value: "", label: "Choose Gender", disabled: true, selected: "" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      marital_status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      user_role: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "super-admin", label: "Super Admin" },
      ],
      user_status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "1", label: "Active" },
        { value: "0", label: "InActive" },
      ],
      user_language: [
        { value: "", label: "Choose Language", disabled: true, selected: "" },
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
      },
    };
  },
  created() {
    this.getDetail();
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
    saveEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("full_name", this.form.full_name);
        formData.append("gender", this.form.gender);
        formData.append("marital_status", this.form.marital_status);
        formData.append("phone_number", this.form.phone_number);
        formData.append("email", this.form.email);
        formData.append("dob", this.form.dob);
        formData.append("nationality", this.form.nationality);
        formData.append("address", this.form.address);
        formData.append("cpr_no", this.form.cpr_no);
        formData.append("cpr_no_expiry", this.form.cpr_no_expiry);
        formData.append("passport_no", this.form.passport_no);
        formData.append("passport_expiry", this.form.passport_expiry);
        formData.append("branch_id", this.form.branch_id);
        formData.append("department_id", this.form.department_id);
        formData.append("designation_id", this.form.designation_id);
        formData.append("status", this.form.status);
        formData.append("personal_photo", this.form.personal_photo);
        formData.append("documents", this.form.documents);
        formData.append("create_user", this.form.create_user);
        formData.append("user_name", this.form.user_name);
        formData.append("user_email", this.form.user_email);
        formData.append("user_pass", this.form.user_pass);
        formData.append("user_role", this.form.user_role);
        formData.append("user_status", this.form.user_status);
        formData.append("user_language", this.form.user_language);

        EmployeeService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Employee Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/employees/index" });
              } else {
                this.$router.push({ path: "/employees/edit/" + res.data.uuid });
                // let fields = this.form;
                // for (let field in fields) {
                //   this.form[field] = "";
                // }
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Employee not Created Successfully",
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

<style scoped>
.errorMsg {
  color: red;
}
</style>
