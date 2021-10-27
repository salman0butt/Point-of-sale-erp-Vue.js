<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Department </CCardHeader>
          <CCardBody>
            <form @submit.prevent="updateDepartment">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Business"
                    :options="options.business"
                    :value.sync="form.business_id"
                    :class="{ error: $v.form.business_id.$error }"
                    @input="$v.form.business_id.$touch()"
                  />
                  <div v-if="$v.form.business_id.$error">
                    <p v-if="!$v.form.business_id.required" class="errorMsg">
                      Business is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Department Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Department is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Parent"
                    :options="options.departments"
                    :value.sync="form.parent_id"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                Please Fill the required data
              </p>
              <CRow class="mt-4">
                <CButton
                  timeout="2000"
                  block
                  color="success"
                  style="
                    float: right;
                    width: 140px;
                    margin-left: 20px;
                    margin-top: 0;
                  "
                  @click="saveAndExit = true"
                  type="submit"
                  >Update</CButton
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
import DepartmentService from "@/services/departments/DepartmentService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EditDepartment",
  data: () => ({
    saveAndExit: false,
    form: {
      business_id: "",
      name: "",
      parent_id: "",
      departments: [],
      status: "",
    },
    departmentId: null,
    options: {
      departments: [
        {
          value: "",
          label: "Choose Departments",
          disabled: true,
          selected: "",
        },
      ],
      business: [
        {
          value: "",
          label: "Choose Departments",
          disabled: true,
          selected: "",
        },
      ],
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
        name: { required },
        business_id: { required },
      },
    };
  },
  created() {
    this.getDetail();
    this.getDepartment();
  },
  methods: {
    getDetail() {
      DepartmentService.getAllDepartments()
        .then(({ data }) => {
          let departments = this.options.departments;
          let business = this.options.business;
          data.departments.map(function (val) {
            departments.push({ value: val.id, label: val.name.en });
          });

          business.push({
            value: data.business.id,
            label: JSON.parse(data.business.business_name).en,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDepartment() {
      this.departmentId = this.$route.params.id;
      DepartmentService.get(this.departmentId)
        .then(({ data }) => {
          this.form.business_id = data.business.id;
          this.form.name = data.name;
          this.form.parent_id = data.parent.id;
          this.form.departments = data.departments;
          this.form.status = data.status;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDepartment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        DepartmentService.update(this.departmentId, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Department Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/departments/index" });
              } else {
                this.$router.push({
                  path: "/departments/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Department not Updated Successfully",
              timer: 3600,
            });
          });
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
