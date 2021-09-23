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
                @click.prevent="changeActiveTab('EmployeeTab')"
                href="#"
                v-bind:class="{ active: activeTab === 'EmployeeTab' }"
              >
                <CIcon :content="$options.cilUser" />&nbsp; General</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeQualificationTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeQualificationTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Qualifications</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeAllowanceTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeAllowanceTab')"
              >
                <CIcon :content="$options.cilUser" />&nbsp; Allowances</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeBankAccountTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeBankAccountTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Bank Accounts</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeLicenseTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeLicenseTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Licenses</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeContractTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeContractTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Contracts</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeEmergencyContactTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeEmergencyContactTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Emergency Contacts</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeExpenseTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeExpenseTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Expenses</a
              >

              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeTargetTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeTargetTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Targets</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeDiscountTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeDiscountTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Discounts</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeComplainTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeComplainTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Complains</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeWarningTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeWarningTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Warnings</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeLeaveTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeLeaveTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Leaves</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeLoanTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeLoanTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Loans</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeLoanInstallmentTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeLoanInstallmentTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Loan Installments</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeDeductionTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeDeductionTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Deductions</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeAssetTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeAssetTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Assets</a
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
  },
  data() {
    return {
      employee_name: "Alan Butler",
      employee_designation: "Project Manager",
      activeTab: "EmployeeTab",
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
