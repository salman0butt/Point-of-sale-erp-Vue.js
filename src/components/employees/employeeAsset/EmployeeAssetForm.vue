<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeAsset() : saveEmployeeAsset()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Asset"
                :options="options.assets"
                :value.sync="form.asset_id"
                :class="{ error: $v.form.asset_id.$error }"
                @input="$v.form.asset_id.$touch()"
              />
              <div v-if="$v.form.asset_id.$error">
                <p v-if="!$v.form.asset_id.required" class="errorMsg">
                  Asset is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Given Date"
                type="date"
                v-model="form.given_date"
                :class="{ error: $v.form.given_date.$error }"
                @input="$v.form.given_date.$touch()"
              />
              <div v-if="$v.form.given_date.$error">
                <p v-if="!$v.form.given_date.required" class="errorMsg">
                  Given Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Given Back Date"
                type="date"
                v-model="form.given_back_date"
                :class="{ error: $v.form.given_back_date.$error }"
                @input="$v.form.given_back_date.$touch()"
              />
              <div v-if="$v.form.given_back_date.$error">
                <p v-if="!$v.form.given_back_date.required" class="errorMsg">
                  Given Back Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Notes"
                placeholder="Content..."
                v-model="form.notes"
                :class="{ error: $v.form.notes.$error }"
                @input="$v.form.notes.$touch()"
              />
              <div v-if="$v.form.notes.$error">
                <p v-if="!$v.form.notes.required" class="errorMsg">Note is required</p>
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
import EmployeeAssetService from "@/services/employees/EmployeeAssetService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeAssetForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      asset_id: "",
      given_date: "",
      given_back_date: "",
      notes: "",
      status: "",
    },
    empId: null,
    options: {
      assets: [{ value: "", label: "Choose Asset", disabled: true, selected: "" }],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
        { value: "bad", label: "Bad" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        asset_id: { required },
        given_date: { required },
        given_back_date: { required },
        notes: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getAllAssets();
  },
  methods: {
    saveEmployeeAsset() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.form.status = "good";
        let data = this.form;
        EmployeeAssetService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Asset Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-asset-update");
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
    updateEmployeeAsset() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAssetService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Asset Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-asset-update");
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
    getEmployeeAsset() {
      EmployeeAssetService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.asset_id = data.asset.uuid;
            this.form.given_date = data.given_date;
            this.form.given_back_date = data.given_back_date;
            this.form.notes = data.notes;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllAssets() {
      EmployeeAssetService.getAllAssets()
        .then(({ data }) => {
          if (data != null && data != "") {
            let assets = this.options.assets;
            if (data.data) {
              data.data.map(function (val) {
                assets.push({ value: val.uuid, label: val.name });
              });
            }
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
      this.getEmployeeAsset();
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
