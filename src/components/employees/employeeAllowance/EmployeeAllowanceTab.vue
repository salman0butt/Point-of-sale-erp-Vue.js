<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Employee</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.allowance }}
                </template>

                <EmployeeAllowanceToggle />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAllowanceToggle from "@/components/employees/employeeAllowance/EmployeeAllowanceToggle";

export default {
  name: "EmployeeAllowanceTab",
  components: { EmployeeAllowanceToggle },
  data: () => ({
    tabs: {
      allowance: "Allowances",
    },
  }),
};
</script>
