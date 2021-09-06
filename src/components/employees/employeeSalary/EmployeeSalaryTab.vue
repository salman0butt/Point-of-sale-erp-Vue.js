<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <EmployeeSalaryForm />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryForm from "@/components/employees/employeeSalary/EmployeeSalaryForm";

export default {
  name: "EmployeeSalaryTab",
  components: { EmployeeSalaryForm },
  data: () => ({}),
  methods: {},
};
</script>
