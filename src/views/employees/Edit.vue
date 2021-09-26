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
                  <span class="emp-name">{{ employee_name }} </span><br />
                  <span class="emp-designation">{{ employee_designation }}</span>
                </div>
              </div>
              <br />
              <a
                class="nav-link bborder"
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                @click.prevent="changeActiveTab(tab.key)"
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
import EmployeeAllowanceTab from "@/components/employees/employeeAllowance/EmployeeAllowanceTab";
import EmployeeBankAccountTab from "@/components/employees/employeeBankAccount/EmployeeBankAccountTab";
import EmployeeLicenseTab from "@/components/employees/employeeLicense/EmployeeLicenseTab";
import EmployeeContractTab from "@/components/employees/employeeContract/EmployeeContractTab";
import EmployeeEmergencyContactTab from "@/components/employees/employeeEmergencyContact/EmployeeEmergencyContactTab";
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
import { cilUser, cisCircle } from "@coreui/icons-pro";
import EmployeeService from "@/services/employees/EmployeeService";

export default {
  name: "EditEmployee",
  cilUser,
  cisCircle,
  components: {
    EmployeeTab,
    EmployeeQualificationTab,
    EmployeeAllowanceTab,
    EmployeeBankAccountTab,
    EmployeeLicenseTab,
    EmployeeContractTab,
    EmployeeEmergencyContactTab,
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
  },
  data() {
    return {
      employee_name: "Alan Butler",
      employee_designation: "Project Manager",
      activeTab: "EmployeeTab",
      tabs: [
        { key: "EmployeeTab", name: "General" },
        { key: "EmployeeQualificationTab", name: "Qualifications" },
        { key: "EmployeeAllowanceTab", name: "Allowances" },
        { key: "EmployeeBankAccountTab", name: "Bank Accounts" },
        { key: "EmployeeLicenseTab", name: "Licenses" },
        { key: "EmployeeContractTab", name: "Contracts" },
        { key: "EmployeeEmergencyContactTab", name: "Emergency Contacts" },
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
    };
  },
  created() {
    this.getEmployeeDetail();
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
</style>
