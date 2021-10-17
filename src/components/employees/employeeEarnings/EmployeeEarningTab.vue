<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Earnings</CCardHeader>
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
                  {{ tabs.allowances }}
                </template>
                <EmployeeAllowanceTab />
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
import EmployeeAllowanceTab from "@/components/employees/employeeAllowance/EmployeeAllowanceTab";

export default {
  name: "EmployeeSalaryTab",
  components: {
    EmployeeBasicForm,
    EmployeeAllowanceTab,
  },
  data: () => ({
    tabs: {
      basic: "Basic",
      salary: "Salary",
      allowances: "Allowances",
    },
  }),
  methods: {},
};
</script>
