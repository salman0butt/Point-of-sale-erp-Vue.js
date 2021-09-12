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
                  {{ tabs.salary }}
                </template>
                <EmployeeSalaryTab />
              </CTab>
              <!-- <CTab>
                <template slot="title">
                  {{ tabs.target }}
                </template>
                Deatil target
              </CTab> -->
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
import EmployeeSalaryTab from "@/components/employees/employeeSalary/EmployeeSalaryTab";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default {
  name: "EmployeeTab",
  components: {
    EmployeeAddressTab,
    EmployeeDetailTab,
    EmployeeSalaryTab,
    EmployeeForm,
  },
  data: () => ({
    tabs: {
      employee: "Employee",
      detail: "Detail",
      salary: "Salary",
      target: "Traget",
      address: "Address",
    },
  }),
};
</script>
