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
                  {{ tabs.basic }}
                </template>
                <EmployeeBasicForm />
              </CTab>
              <CTab id="show">
                <template slot="title">
                  {{ tabs.salary }}
                </template>
                <EmployeeSalaryToggle />
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
import EmployeeBasicForm from "@/components/employees/employeeSalary/EmployeeBasicForm";
import EmployeeSalaryToggle from "@/components/employees/employeeSalary/EmployeeSalaryToggle";
import EmployeeAllowanceTab from "@/components/employees/employeeAllowance/EmployeeAllowanceTab";
import EmployeeBankAccountTab from "@/components/employees/employeeBankAccount/EmployeeBankAccountTab";

export default {
  name: "EmployeeSalaryTab",
  components: {
    EmployeeBasicForm,
    EmployeeAllowanceTab,
    EmployeeBankAccountTab,
    EmployeeSalaryToggle,
  },
  data: () => ({
    tabs: {
      basic: "Basic",
      salary: "Salary",
      allowances: "Allowances",
      banks: "Bank Accounts",
    },
  }),
  methods: {},
};
</script>
