<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing
              ? updateExperianceCertifcate()
              : saveExperianceCertifcate()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Name is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Type"
                :options="options.experiance_certifcate_types"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">
                  Type is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="From Date"
                type="date"
                v-model="form.from_date"
                :class="{ error: $v.form.from_date.$error }"
                @input="$v.form.from_date.$touch()"
              />
              <div v-if="$v.form.from_date.$error">
                <p v-if="!$v.form.from_date.required" class="errorMsg">
                  From Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="To Date"
                type="date"
                v-model="form.to_date"
                :class="{ error: $v.form.to_date.$error }"
                @input="$v.form.to_date.$touch()"
              />
              <div v-if="$v.form.to_date.$error">
                <p v-if="!$v.form.to_date.required" class="errorMsg">
                  To Date is required
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
          <CRow>
            <CCol sm="6" md="6">
              <CTextarea
                label="Note"
                placeholder="Content..."
                v-model="form.description"
              />
            </CCol>
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">
            Please Fill the required data
          </p>
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
import ExperianceCertifcateService from "@/services/experianceCertifcate/ExperianceCertifcateService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ExperianceCertifcateForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      from_date: "",
      to_date: "",
      status: "",
      description: "",
    },
    empId: null,
    options: {
      experiance_certifcate_types: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "complete", label: "Complete" },
        { value: "in-process", label: "In Process" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        name: { required },
        type: { required },
        from_date: { required },
        to_date: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveExperianceCertifcate() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ExperianceCertifcateService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Experiance Certifcate Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-experiance-certifcate-update");
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
    updateExperianceCertifcate() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ExperianceCertifcateService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Experiance Certifcate Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-experiance-certifcate-update");
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
    getExperianceCertifcate() {
      ExperianceCertifcateService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.description = data.description;
            this.form.from_date = data.from_date;
            this.form.to_date = data.to_date;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["experiance_certifcate_types"]);
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
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getExperianceCertifcate();
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
