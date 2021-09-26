<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>General</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.employee }}
                </template>
                <EmployeeForm />
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs.detail }}
                </template>
                <EmployeeDetailTab />
              </CTab>

              <CTab>
                <template slot="title">
                  {{ tabs.address }}
                </template>
                <EmployeeAddressTab />
              </CTab>

              <CTab>
                <template slot="title">
                  {{ tabs.emergencyContanct }}
                </template>
                <EmployeeEmergencyContactTab />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAddressTab from "@/components/employees/employeeAddress/EmployeeAddressTab";
import EmployeeDetailTab from "@/components/employees/employeeDetail/EmployeeDetailTab";
import EmployeeEmergencyContactTab from "@/components/employees/employeeEmergencyContact/EmployeeEmergencyContactTab";

import EmployeeForm from "@/components/employees/EmployeeForm";

export default {
  name: "EmployeeTab",
  components: {
    EmployeeAddressTab,
    EmployeeDetailTab,
    EmployeeForm,
    EmployeeEmergencyContactTab,
  },
  data: () => ({
    tabs: {
      employee: "Employee",
      detail: "Detail",
      target: "Traget",
      address: "Address",
      emergencyContanct: "Emergency Contancts",
    },
  }),
};
</script>
