<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <EmployeeDetailForm />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDetailForm from "@/components/employees/employeeDetail/EmployeeDetailForm";

export default {
  name: "EmployeeDetailTab",
  components: { EmployeeDetailForm },
  data: () => ({}),
  methods: {},
};
</script>
