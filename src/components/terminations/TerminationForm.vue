<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTermination() : saveTermination()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Termination Type"
                :options="options.termination_type"
                :value.sync="form.termination_type"
                :class="{ error: $v.form.termination_type.$error }"
                @input="$v.form.termination_type.$touch()"
              />
              <div v-if="$v.form.termination_type.$error">
                <p v-if="!$v.form.termination_type.required" class="errorMsg">
                  Termination Type is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Termination To"
                :options="options.employees"
                :value.sync="form.termination_to"
                :class="{ error: $v.form.termination_to.$error }"
                @input="$v.form.termination_to.$touch()"
              />
              <div v-if="$v.form.termination_to.$error">
                <p v-if="!$v.form.termination_to.required" class="errorMsg">
                  Termination To is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Termination Date"
                type="date"
                v-model="form.termination_date"
                :class="{ error: $v.form.termination_date.$error }"
                @input="$v.form.termination_date.$touch()"
              />
              <div v-if="$v.form.termination_date.$error">
                <p v-if="!$v.form.termination_date.required" class="errorMsg">
                  Termination Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
                :class="{ error: $v.form.description.$error }"
                @input="$v.form.description.$touch()"
              />
              <div v-if="$v.form.description.$error">
                <p v-if="!$v.form.description.required" class="errorMsg">
                  Description is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Notice Date"
                type="date"
                v-model="form.notice_date"
                :class="{ error: $v.form.notice_date.$error }"
                @input="$v.form.notice_date.$touch()"
              />
              <div v-if="$v.form.notice_date.$error">
                <p v-if="!$v.form.notice_date.required" class="errorMsg">
                  Notice Date is required
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import TerminationService from "@/services/terminations/TerminationService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TerminationForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      termination_type: "",
      termination_date: "",
      termination_to: "",
      description: "",
      notice_date: "",
      status: "",
    },
    options: {
      termination_type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
      ],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        termination_type: { required },
        termination_date: { required },
        termination_to: { required },
        description: { required },
        notice_date: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    this.getAllEmployees();
    if (this.form.id) {
      this.isEditing = true;
      this.getTermination();
    }
  },
  methods: {
    saveTermination() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TerminationService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Termination Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-termination-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/terminations/index" });
              } else {
                this.$router.push({ path: "/terminations/edit/" + res.data.uuid });
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
    updateTermination() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TerminationService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Termination Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-termination-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/terminations/index" });
              } else {
                this.$router.push({ path: "/terminations/edit/" + res.data.uuid });
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
    getTermination() {
      TerminationService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.termination_type = data.termination_type;
            this.form.termination_date = data.termination_date;
            this.form.termination_to = data.termination_to.id;
            this.form.description = data.description;
            this.form.notice_date = data.notice_date;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["termination_type"]);
      HrSettingService.getSettings(ids)
        .then(({ data }) => {
          if (data != null && data != "") {
            const types = this.options;
            for (let index in data) {
              let arr = JSON.parse(data[index]);
              for (let i in arr) {
                if (types[index]) {
                  types[index].push({ value: arr[i], label: arr[i] });
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllEmployees() {
      TerminationService.getAllEmployees()
        .then(({ data }) => {
          if (data != null && data != "") {
            let employees = this.options.employees;
            if (data.data) {
              data.data.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
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

<style>
.errorMsg {
  color: red;
}
</style>
