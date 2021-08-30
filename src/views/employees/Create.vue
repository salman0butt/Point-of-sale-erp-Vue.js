<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Add Employee </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Fullname" v-model="form.full_name" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect label="Gender" :options="options.gender" v-model="form.gender" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect
                  label="Martial Status"
                  :options="options.marital_status"
                  v-model="form.marital_status"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Phone" v-model="form.phone_number" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Email" type="email" v-model="form.email" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="DOB" type="date" v-model="form.dob" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Nationality" v-model="form.nationality" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Address" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect
                  label="Manager"
                  :options="options.managers"
                  v-model="form.manager_id"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="CPR No" type="text" v-model="form.cpr_no" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="CPR Expiry" type="date" v-model="form.cpr_date" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect
                  label="Branches"
                  :options="options.branches"
                  v-model="form.branch_id"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Passport No" type="text" v-model="form.passport_no" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput
                  label="Passport Expiry"
                  type="date"
                  v-model="form.passport_expiry"
                />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect label="Status" :options="options.status" v-model="form.status" />
              </CCol>
            </CRow>
            <CButton block color="success" style="float: right; width: 100px"
              >Save</CButton
            >
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeService from "@/services/employees/EmployeeService";

export default {
  name: "CreateEmployee",
  data() {
    return {
      isEditing: false,
      form: {
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
        manager_id: "",
        branch_id: "",
        status: "",
      },
      options: {
        branches: [{ value: "", label: "Choose Branch" }],
        managers: [{ value: "", label: "Choose Manager" }],
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
          { value: "active", label: "Active" },
          { value: "inactive", label: "InActive" },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      EmployeeService.getCreateDetail()
        .then(({ data }) => {
          let branches = this.options.branches;
          let managers = this.options.managers;
          data.branches.map(function (val) {
            branches.push({ value: val.id, label: val.name.en });
          });
          data.employees.map(function (val) {
            managers.push({ value: val.id, label: val.full_name.en });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createEmployee() {
      let data = this.form;
      EmployeeService.create(data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
