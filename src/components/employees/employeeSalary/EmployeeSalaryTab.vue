<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Salary</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.salary }}
                </template>
                <EmployeeSalaryForm />
              </CTab>
              <CTab id="show">
                <template slot="title">
                  {{ tabs.allowances }}
                </template>
                <EmployeeAllowanceTab />
              </CTab>
              <CTab id="show">
                <template slot="title">
                  {{ tabs.banks }}
                </template>
                <EmployeeBankAccountTab />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryForm from "@/components/employees/employeeSalary/EmployeeSalaryForm";
import EmployeeAllowanceTab from "@/components/employees/employeeAllowance/EmployeeAllowanceTab";
import EmployeeBankAccountTab from "@/components/employees/employeeBankAccount/EmployeeBankAccountTab";

export default {
  name: "EmployeeSalaryTab",
  components: { EmployeeSalaryForm, EmployeeAllowanceTab, EmployeeBankAccountTab },
  data: () => ({
    tabs: {
      salary: "Salary",
      allowances: "Allowances",
      banks: "Bank Accounts",
    },
  }),
  methods: {},
};
</script>
