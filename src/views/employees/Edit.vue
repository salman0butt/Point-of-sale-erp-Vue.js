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
                <img
                  src="/img/avatars/7.jpg"
                  class="c-avatar-img"
                  alt="Profile"
                />
                <CIcon :content="$options.cisCircle" class="online" />
                <div>
                  <template v-if="emp_name">
                    <span class="emp-name">{{ emp_name }} </span></template
                  >
                  <PuSkeleton v-else width="100px" />
                  <br />
                  <template v-if="employee_designation">
                    <span class="emp-designation">{{
                      employee_designation
                    }}</span>
                  </template>
                  <PuSkeleton v-else />
                </div>
              </div>
              <br />
              <a
                class="nav-link bborder"
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                @click.prevent="changeActiveTab(tab.key)"
                href="#"
                v-bind:class="{
                  active: activeTab === tab.key,
                  disabled: tab.disabled,
                }"
              >
                <CIcon :content="$options.cilUser" />&nbsp; {{ tab.name }}
                <CBadge v-if="tab.disabled" color="danger">
                  comming soon</CBadge
                ></a
              >
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="9">
        <keep-alive>
          <component v-bind:is="activeTab"></component>
        </keep-alive>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeTab from "@/components/employees/EmployeeTab";
import EmployeeQualificationTab from "@/components/employees/employeeQualification/EmployeeQualificationTab";
import EmployeeContractTab from "@/components/employees/employeeContract/EmployeeContractTab";
import EmployeeExpenseTab from "@/components/employees/employeeExpense/EmployeeExpenseTab";
import EmployeeTargetTab from "@/components/employees/employeeTarget/EmployeeTargetTab";
import EmployeeDiscountTab from "@/components/employees/employeeDiscount/EmployeeDiscountTab";
import EmployeeComplainTab from "@/components/employees/employeeComplain/EmployeeComplainTab";
import EmployeeWarningTab from "@/components/employees/employeeWarning/EmployeeWarningTab";
import EmployeeLeaveTab from "@/components/employees/employeeLeave/EmployeeLeaveTab";
import EmployeeLoanTab from "@/components/employees/employeeLoan/EmployeeLoanTab";
import EmployeeLoanInstallmentTab from "@/components/employees/employeeLoanInstallment/EmployeeLoanInstallmentTab";
import EmployeeDeductionTab from "@/components/employees/employeeDeduction/EmployeeDeductionTab";
import EmployeeAssetTab from "@/components/employees/employeeAsset/EmployeeAssetTab";
import EmployeeAwardTab from "@/components/employees/employeeAward/EmployeeAwardTab";
import employeeAttendanceIndex from "@/components/employees/employeeAttendance/employeeAttendanceIndex";
import EmployeeSalaryTab from "@/components/employees/employeeSalary/EmployeeSalaryTab";
import { cilUser, cisCircle } from "@coreui/icons-pro";
import EmployeeService from "@/services/employees/EmployeeService";

export default {
  name: "EditEmployee",
  cilUser,
  cisCircle,
  components: {
    EmployeeTab,
    EmployeeQualificationTab,
    EmployeeContractTab,
    EmployeeExpenseTab,
    EmployeeTargetTab,
    EmployeeDiscountTab,
    EmployeeComplainTab,
    EmployeeWarningTab,
    EmployeeLeaveTab,
    EmployeeLoanTab,
    EmployeeLoanInstallmentTab,
    EmployeeDeductionTab,
    EmployeeAssetTab,
    EmployeeAwardTab,
    EmployeeSalaryTab,
    employeeAttendanceIndex,
  },
  data() {
    return {
      employee_name: "e.g name",
      employee_designation: "Designation",
      activeTab: "EmployeeTab",
      tabs: [
        { key: "EmployeeTab", name: "General" },
        { key: "EmployeeQualificationTab", name: "Qualifications" },
        { key: "EmployeeContractTab", name: "Contracts" },
        { key: "employeeAttendanceIndex", name: "Attendance" },
        { key: "EmployeeLeaveTab", name: "Leaves" },
        { key: "EmployeeSalaryTab", name: "Salary" },
        { key: "EmployeeExpenseTab", name: "Expenses", disabled: true },
        { key: "EmployeeTargetTab", name: "Targets", disabled: true },
        { key: "EmployeeDiscountTab", name: "Discounts", disabled: true },
        { key: "EmployeeComplainTab", name: "Complains" },
        { key: "EmployeeWarningTab", name: "Warnings" },
        { key: "EmployeeLoanTab", name: "Loans" },
        { key: "EmployeeLoanInstallmentTab", name: "Loan Installments" },
        { key: "EmployeeDeductionTab", name: "Deductions" },
        { key: "EmployeeAssetTab", name: "Assets" },
        { key: "EmployeeAwardTab", name: "Awards" },
      ],
    };
  },
  created() {
    // this.$store.commit("set_employee_name", this.employee_name);
    this.getEmployeeDetail();
  },
  computed: {
    emp_name() {
      return this.$store.getters.get_employee_name;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_employee_name", "");
  },
  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
    getEmployeeDetail() {
      let id = this.$route.params.id;
      EmployeeService.get(id)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            // this.$store.commit("set_employee_name", data.full_name);
            this.employee_name = data.full_name;
            this.employee_designation = data.designation;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
