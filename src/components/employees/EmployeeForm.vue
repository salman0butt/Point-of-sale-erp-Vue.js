<template>
  <div>
    <Loader />
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateEmployee() : saveEmployee()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Serial No"
                    v-model="form.serial_no"
                    :class="{ error: $v.form.serial_no.$error }"
                    @input="$v.form.serial_no.$touch()"
                  />
                  <div v-if="$v.form.serial_no.$error">
                    <p v-if="!$v.form.serial_no.required" class="errorMsg">
                      Serial No is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Full Name"
                    v-model="form.full_name"
                    placeholder="Jackson"
                    :class="{ error: $v.form.full_name.$error }"
                    @input="$v.form.full_name.$touch()"
                  />
                  <div v-if="$v.form.full_name.$error">
                    <p v-if="!$v.form.full_name.required" class="errorMsg">
                      Full Name is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Gender"
                    :options="options.gender"
                    :value.sync="form.gender"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Martial Status"
                    :options="options.marital_status"
                    :value.sync="form.marital_status"
                  />
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
                    <p v-if="!$v.form.email.email" class="errorMsg">
                      Email Should be Valid
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
                    v-bind:max="getDOB()"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Nationality" :value.sync="form.nationality" />
                </CCol>
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
                    <p v-if="!$v.form.cpr_no.minLength" class="errorMsg">
                      CPR should be at least 9 character
                    </p>
                    <p v-if="!$v.form.cpr_no.maxLength" class="errorMsg">
                      CPR should be 9 character
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

                <CCol sm="6" md="4" class="pt-2">
                  <label class="typo__label">Branches</label>
                  <multiselect
                    v-model="form.branch_id"
                    :options="options.branches"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Branches"
                    label="label"
                    track-by="label"
                    :preselect-first="true"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>

                  <div v-if="$v.form.branch_id.$error">
                    <p v-if="!$v.form.branch_id.required" class="errorMsg">
                      Branch is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
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
                  />
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Passport Expiry"
                    type="date"
                    :value.sync="form.passport_expiry"
                  />
                </CCol>
              </CRow>
              <CRow>
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
                    label="Branch Shift"
                    :options="options.branch_shift"
                    :value.sync="form.branch_shift_id"
                    :class="{ error: $v.form.branch_shift_id.$error }"
                    @input="$v.form.branch_shift_id.$touch()"
                  />
                  <div v-if="$v.form.branch_shift_id.$error">
                    <p v-if="!$v.form.branch_shift_id.required" class="errorMsg">
                      Branch Shift is required
                    </p>
                  </div>
                </CCol>
                <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
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
                  <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeService from "@/services/employees/EmployeeService";
import { required, email, numeric, minLength, maxLength } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import Loader from "@/components/layouts/Loader";

export default {
  name: "EmployeeForm",
  components: { Multiselect, Loader },
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
      cpr_no: "",
      cpr_no_expiry: "",
      passport_no: "",
      passport_expiry: "",
      branch_id: "",
      branch_shift_id: "",
      department_id: "",
      designation_id: "",
      manager_id: "",
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
      branches: [],
      managers: [{ value: "", label: "Choose Manager", disabled: true, selected: "" }],
      departments: [
        {
          value: "",
          label: "Choose Departments",
          disabled: true,
          selected: "",
        },
      ],
      designations: [
        {
          value: "",
          label: "Choose Designations",
          disabled: true,
          selected: "",
        },
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
      user_role: [{ value: "", label: "Choose Role", disabled: true, selected: "" }],
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
      branch_shift: [
        {
          value: "",
          label: "Choose Branch Shift",
          disabled: true,
          selected: "",
        },
      ],
    },
  }),
  validations() {
    return {
      form: {
        full_name: { required },
        phone_number: { required, numeric },
        cpr_no: { required, minLength: minLength(9), maxLength: maxLength(9) },
        cpr_no_expiry: { required },
        email: { email },
        branch_id: { required },
        department_id: { required },
        designation_id: { required },
        serial_no: { required },
        branch_shift_id: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getDetail();
    if (this.empId) {
      this.getEmployee();
      this.isEditing = true;
    }
  },
  watch: {
    "form.full_name"(val) {
      this.$store.commit("set_employee_name", val);
    },
    "form.dob"(val) {
      var d1 = new Date(this.getDOB());
      var d2 = new Date(val);
      if (d2 >= d1) {
        this.form.dob = this.getDOB();
      }
    },
    deep: true,
  },
  methods: {
    getDetail() {
      EmployeeService.getCreateDetail()
        .then(({ data }) => {
          let branches = this.options.branches;
          let managers = this.options.managers;
          let departments = this.options.departments;
          let designations = this.options.designations;
          let branch_shift = this.options.branch_shift;
          let user_role = this.options.user_role;
          if (data.branches) {
            data.branches.map(function (val) {
              branches.push({ value: val.uuid, label: val.name.en });
            });
          }
          if (data.managers) {
            data.managers.map(function (val) {
              managers.push({ value: val.uuid, label: val.full_name.en });
            });
          }
          if (data.departments) {
            data.departments.map(function (val) {
              departments.push({ value: val.uuid, label: val.name.en });
            });
          }
          if (data.designations) {
            data.designations.map(function (val) {
              designations.push({ value: val.uuid, label: val.name });
            });
          }
          if (data.branch_shift) {
            data.branch_shift.map(function (val) {
              branch_shift.push({ value: val.uuid, label: val.name });
            });
          }
          if (data.user_role) {
            data.user_role.map(function (val) {
              user_role.push({ value: val.uuid, label: val.name });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEmployee() {
      this.$store.commit("set_loader");
      EmployeeService.get(this.empId)
        .then(({ data }) => {
          this.form.serial_no = data.serial_no ?? "";
          this.form.full_name = data.full_name ?? "";
          this.form.gender = data.gender ?? "";
          this.form.marital_status = data.marital_status ?? "";
          this.form.phone_number = data.phone_number ?? "";
          this.form.email = data.email ?? "";
          this.form.dob = data.dob ?? "";
          this.form.nationality = data.nationality ?? "";
          this.form.cpr_no = data.cpr_no ?? "";
          this.form.cpr_no_expiry = data.cpr_no_expiry ?? "";
          this.form.passport_no = data.passport_no ?? "";
          this.form.passport_expiry = data.passport_expiry ?? "";
          if (data.branches) {
            this.form.branch_id = data.branches?.map(function (item) {
              return { label: item.name.en, value: item.uuid };
            });
          }
          this.form.department_id = data.department_id ?? "";
          this.form.designation_id = data.designation_id ?? "";
          this.form.manager_id = data.manager_id ?? "";
          // this.form.personal_photo = data.personal_photo;
          this.form.documents = data.documents;
          this.form.status = data.status ?? "";
          this.form.create_user = data.create_user == "true" ? true : false;
          this.form.user_name = data.user.name ?? "";
          this.form.user_email = data.user.email ?? "";

          this.form.user_role = data.user.role[0] ?? "";
          this.options.user_role.value = data.user.role[0] ?? "";
          this.form.user_status = data.user.status?.toString() ?? "";
          this.form.user_language = data.user.user_language ?? "";
          this.form.branch_shift_id = data.branch_shift_id ?? "";

          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.$router.push("/employee");
          console.log(error);
        });
    },
    saveEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.form.user_status = 1;
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData();

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
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData(true);
        EmployeeService.update(this.empId, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Employee Updated Successfully",
                timer: 3600,
              });
              if (res.data.personal_photo !== "") {
                this.$store.commit("set_emp_img", res.data.personal_photo);
                if (res.data.uuid && res.data.uuid === this.$store.state.employee_id) {
                  this.$store.commit("set_profile_img", res.data.personal_photo);
                }
              }

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
    formData(update = false) {
      const branches = this.form.branch_id;
      const getBranchs = branches?.map(function (item) {
        return item.value;
      });
      let formData = new FormData();
      if (update) {
        formData.append("_method", "patch");
      }
      formData.append("serial_no", this.form.serial_no);
      formData.append("full_name", this.form.full_name);
      formData.append("gender", this.form.gender);
      formData.append("marital_status", this.form.marital_status);
      formData.append("phone_number", this.form.phone_number);
      formData.append("email", this.form.email);
      formData.append("dob", this.form.dob);
      formData.append("nationality", this.form.nationality);
      formData.append("cpr_no", this.form.cpr_no);
      formData.append("cpr_no_expiry", this.form.cpr_no_expiry);
      formData.append("passport_no", this.form.passport_no);
      formData.append("passport_expiry", this.form.passport_expiry);
      formData.append("branch_id", getBranchs);
      formData.append("department_id", this.form.department_id);
      formData.append("designation_id", this.form.designation_id);
      formData.append("status", this.form.status);
      if (this.form.personal_photo) {
        formData.append("personal_photo", this.form.personal_photo);
      }
      if (this.form.documents) {
        formData.append("documents", this.form.documents);
      }
      formData.append("create_user", this.form.create_user);
      formData.append("user_name", this.form.user_name);
      formData.append("user_email", this.form.user_email);
      formData.append("user_pass", this.form.user_pass);
      formData.append("user_role", this.form.user_role);
      formData.append("user_status", this.form.user_status);
      formData.append("user_language", this.form.user_language);
      formData.append("branch_shift_id", this.form.branch_shift_id);
      return formData;
    },
    toggleUserSection() {
      this.form.create_user = !this.form.create_user;
    },
    getDOB() {
      let dtToday = new Date();
      let month = dtToday.getMonth() + 1; // jan=0; feb=1 .......
      let day = dtToday.getDate();
      let year = dtToday.getFullYear() - 18;
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();
      let minDate = year + "-" + month + "-" + day;
      let maxDate = year + "-" + month + "-" + day;
      return maxDate;
    },
    pickFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.form.personal_photo = file[0];
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
