<template>
  <CCard>
    <CCardHeader>Salary</CCardHeader>
    <CCardBody>
      <div>
        <CRow>
          <CCol xs="12" lg="12">
            <CButton
              @click="ToggleEmployeeSalary()"
              color="primary"
              class="mb-2 mt-3"
              style="float: right"
            >
              {{ toggleName }}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12" lg="12">
            <CCollapse :show="collapse_table">
              <EmployeeSalaryIndex
                ref="employeeSalaryRef"
                @employee-salary-edit="employeeSalaryEdited"
              />
            </CCollapse>
            <CCollapse :show="collapse">
              <EmployeeSalaryForm
                ref="employeeSalaryEditRef"
                @employee-salary-created="employeeSalaryCreatedSend"
              />
            </CCollapse>
          </CCol>
        </CRow>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import EmployeeSalaryIndex from "@/components/employees/employeeSalary/EmployeeSalaryIndex";
import EmployeeSalaryForm from "@/components/employees/employeeSalary/EmployeeSalaryForm";

export default {
  name: "EmployeeSalaryToggle",
  components: { EmployeeSalaryIndex, EmployeeSalaryForm },
  data: () => ({
    toggleName: "Add New Salary",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeSalary() {
      this.resetEmployeeSalaryForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Salary") {
        this.toggleName = "Go To Salary";
      } else if (this.toggleName == "Go To Salary") {
        this.toggleName = "Add New Salary";
      }
    },
    employeeSalaryCreatedSend() {
      this.ToggleEmployeeSalary();
      this.$refs.employeeSalaryRef.getEmployeeSalary();
    },
    employeeSalaryEdited(uuid) {
      this.ToggleEmployeeSalary();
      this.$refs.employeeSalaryEditRef.getEditData(uuid);
    },
    resetEmployeeSalaryForm() {
      this.$refs.employeeSalaryEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
