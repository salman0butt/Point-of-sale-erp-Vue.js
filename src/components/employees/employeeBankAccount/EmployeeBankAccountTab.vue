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
                  {{ tabs.bank }}
                </template>
                <EmployeeBankAccountToggle />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeBankAccountToggle from "@/components/employees/employeeBankAccount/EmployeeBankAccountToggle";

export default {
  name: "EmployeeBankAccountTab",
  components: { EmployeeBankAccountToggle },
  data: () => ({
    tabs: {
      bank: "Bank Accounts",
    },
  }),
};
</script>
