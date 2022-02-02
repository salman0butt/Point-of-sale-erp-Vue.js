<template>
  <div>
    <Loader />

    <form @submit.prevent="isEditing ? updateUser() : saveUser()">
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
          <CSelect label="Gender" :options="options.gender" :value.sync="form.gender" />
        </CCol>
      </CRow>
      <CRow>
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
            <p v-if="!$v.form.email.email" class="errorMsg">Email Should be Valid</p>
          </div>
        </CCol>

        <CCol sm="6" md="4" class="pt-2">
          <CInput label="Nationality" :value.sync="form.nationality" />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="4" class="pt-2">
          <CInput
            label="CPR No"
            type="text"
            :value.sync="form.cpr_no"
            :class="{ error: $v.form.cpr_no.$error }"
            @input="$v.form.cpr_no.$touch()"
          />
          <div v-if="$v.form.cpr_no.$error">
            <p v-if="!$v.form.cpr_no.required" class="errorMsg">CPR is required</p>
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
              <span class="multiselect__single" v-if="values.value &amp;&amp; !isOpen"
                >{{ values.length }} options selected</span
              ></template
            >
          </multiselect>

          <div v-if="$v.form.branch_id.$error">
            <p v-if="!$v.form.branch_id.required" class="errorMsg">Branch is required</p>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="4" class="pt-2">
          <CInput label="Passport No" type="text" :value.sync="form.passport_no" />
        </CCol>

        <CCol sm="6" md="4" class="pt-2">
          <CInput
            label="Passport Expiry"
            type="date"
            :value.sync="form.passport_expiry"
          />
        </CCol>
        <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
          <CSelect label="Status" :options="options.status" :value.sync="form.status" />
        </CCol>
      </CRow>
      <div>
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
                User Email is required
              </p>
            </div>
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Password"
              type="password"
              :value.sync="form.user_pass"
              :class="{ error: !isEditing && $v.form.user_pass.$error }"
              @input="$v.form.user_pass.$touch()"
            />
            <div v-if="!isEditing && $v.form.user_pass.$error">
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
              <p v-if="!$v.form.user_role.required" class="errorMsg">Role is required</p>
            </div>
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
  </div>
</template>

<script>
import UserService from "@/services/users/UserService";
import { required, email, numeric, minLength, maxLength } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";
import Multiselect from "vue-multiselect";

export default {
  name: "UserForm",
  components: { Loader, Multiselect },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      emp_id: "",
      serial_no: "",
      full_name: "",
      gender: "",
      phone_number: "",
      email: "",
      nationality: "",
      cpr_no: "",
      cpr_no_expiry: "",
      passport_no: "",
      passport_expiry: "",
      branch_id: [],
      status: "",
      user_name: "",
      user_email: "",
      user_pass: "",
      user_role: "",
      user_status: "1",
      user_language: "",
    },
    options: {
      branches: [],
      gender: [
        { value: "", label: "Choose Gender", disabled: true, selected: "" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
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
        { value: "en", label: "English" },
        { value: "ar", label: "Arabic" },
      ],
    },
  }),
  validations() {
    if (this.isEditing) {
      return {
        form: {
          full_name: { required },
          phone_number: { required, numeric },
          cpr_no: { required, minLength: minLength(9), maxLength: maxLength(9) },
          cpr_no_expiry: { required },
          email: { email },
          branch_id: { required },
          serial_no: { required },
          user_name: { required },
          user_email: { required },

          user_role: { required },
        },
      };
    } else {
      return {
        form: {
          full_name: { required },
          phone_number: { required, numeric },
          cpr_no: { required, minLength: minLength(9), maxLength: maxLength(9) },
          cpr_no_expiry: { required },
          email: { email },
          branch_id: { required },
          serial_no: { required },
          user_name: { required },
          user_email: { required },
          user_pass: { required },
          user_role: { required },
        },
      };
    }
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getDetail();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getUser();
    }
  },
  methods: {
    saveUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = new FormData();
        for (const index in this.form) {
          if (index === "branch_id") {
            data.append(
              index + "[]",
              this.form[index].map((item) => {
                return item.value;
              })
            );
          } else {
            data.append(index, this.form[index]);
          }
        }

        UserService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "User Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/users/index" });
              } else {
                this.$router.push({
                  path: "/users/edit/" + res.data.uuid,
                });
              }
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
    updateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = new FormData();
        for (const index in this.form) {
          if (index === "branch_id") {
            data.append(
              index + "[]",
              this.form[index].map((item) => {
                return item.value;
              })
            );
          } else {
            data.append(index, this.form[index]);
          }
        }
        data.append("_method", "PATCH");
        UserService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "User Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/users/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/users/edit/" + res.data.uuid,
              //   });
              // }
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
    getDetail() {
      UserService.getCreateDetail()
        .then(({ data }) => {
          let branches = this.options.branches;
          let user_role = this.options.user_role;
          if (data.branches) {
            data.branches.map(function (val) {
              branches.push({ value: val.uuid, label: val.name.en });
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
    getUser() {
      this.$store.commit("set_loader");
      UserService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            if (data.employee) {
              this.form.emp_id = data.employee.uuid ?? "";
              this.form.serial_no = data.employee.serial_no ?? "";
              this.form.full_name = data.employee.full_name ?? "";
              this.form.gender = data.employee.gender ?? "";
              this.form.phone_number = data.employee.phone_number ?? "";
              this.form.email = data.employee.email ?? "";
              this.form.nationality = data.employee.nationality ?? "";
              this.form.cpr_no = data.employee.cpr_no ?? "";
              this.form.cpr_no_expiry = data.employee.cpr_no_expiry ?? "";
              this.form.passport_no = data.employee.passport_no ?? "";
              this.form.passport_expiry = data.employee.passport_expiry ?? "";
              if (data.employee && data.employee.branches) {
                this.form.branch_id = data.employee.branches?.map(function (item) {
                  return { label: item.name.en, value: item.uuid };
                });
              }

              this.form.status = data.employee.status ?? "";
            }
            this.form.user_name = data.username ?? "";
            this.form.user_email = data.email ?? "";
            this.form.user_role = data.role[0] ?? "";
            this.options.user_role.value = data.role[0] ?? "";
            this.form.user_status = data.status?.toString() ?? "";
            this.form.user_language = data.language ?? "";
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.isEditing = false;
          this.$router.push({ path: "/users/index" });
        });
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
