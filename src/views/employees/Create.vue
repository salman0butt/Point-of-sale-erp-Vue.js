<template>
  <div>
    <CRow>
      <CCol xs="12" lg="3">
        <CCard>
          <CCardBody>
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div class="side-avatar">
                <img src="/img/avatars/7.jpg" class="c-avatar-img" alt="Profile" />
                <CIcon :content="$options.cisCircle" class="online" />
                <div>
                  <span class="emp-name">{{ emp_name }} </span><br />
                  <span class="emp-designation">{{ employee_designation }}</span>
                </div>
              </div>
              <br />
              <a
                class="nav-link bborder disabled"
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                href="#"
                v-bind:class="{ active: activeTab === tab.key }"
              >
                <CIcon :content="$options.cilUser" />&nbsp; {{ tab.name }}</a
              >
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="9">
        <CCard>
          <CCardHeader>New Employee </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab active>
                <template slot="title">
                  {{ pills.employee }}
                </template>
                <EmployeeForm />
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ pills.detail }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ pills.salary }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ pills.target }}
                </template>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeForm from "@/components/employees/EmployeeForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "CreateEmployee",
  cilUser,
  cisCircle,
  components: {
    EmployeeForm,
  },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    pills: {
      employee: "Employee",
      detail: "Detail",
      salary: "Salary",
      target: "Traget",
    },
    employee_name: "e.g name",
    employee_designation: "Designation",
    activeTab: "EmployeeTab",
    tabs: [
      { key: "EmployeeTab", name: "General" },
      { key: "EmployeeQualificationTab", name: "Qualifications" },
      { key: "EmployeeSalaryTab", name: "Salary" },
      { key: "EmployeeContractTab", name: "Contracts" },
      { key: "EmployeeExpenseTab", name: "Expenses" },
      { key: "EmployeeTargetTab", name: "Targets" },
      { key: "EmployeeDiscountTab", name: "Discounts" },
      { key: "EmployeeComplainTab", name: "Complains" },
      { key: "EmployeeWarningTab", name: "Warnings" },
      { key: "EmployeeLeaveTab", name: "Leaves" },
      { key: "EmployeeLoanTab", name: "Loans" },
      { key: "EmployeeLoanInstallmentTab", name: "Loan Installments" },
      { key: "EmployeeDeductionTab", name: "Deductions" },
      { key: "EmployeeAssetTab", name: "Assets" },
      { key: "EmployeeAwardTab", name: "Awards" },
    ],
  }),
  computed: {
    emp_name() {
      return this.$store.getters.get_employee_name;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_employee_name", "");
  },
  created() {
    this.$store.commit("set_employee_name", this.employee_name);
  },
};
</script>

<style>
.side-avatar {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
img.c-avatar-img {
  max-width: 80px !important;
}
span.emp-name {
  font-size: 20px;
  color: black;
  /* margin-left: 10px; */
}
.emp-designation {
  color: gray;
}
a.nav-link {
  color: black;
}
.bborder {
  border-bottom: 1px solid #80808073;
  align-items: center;
}
a.nav-link.active,
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #52b947 !important;
  color: #fff !important;
}
.online {
  color: #52b947 !important;
  position: absolute;
  left: 32%;
  top: 12%;
}
#v-pills-tab {
  display: block;
}
</style>
