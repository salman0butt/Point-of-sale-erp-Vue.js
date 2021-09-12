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
                ><CIcon :content="$options.cilUser" />&nbsp; HR</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeAllowanceTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeAllowanceTab')"
              >
                <CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeBankAccountTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeBankAccountTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeLicenseTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeLicenseTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeContractTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeContractTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeEmergencyContactTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeEmergencyContactTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeExpenseTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeExpenseTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >

              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'EmployeeTargetTab' }"
                href="#"
                @click.prevent="changeActiveTab('EmployeeTargetTab')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
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
import EmployeeQualificationTab from "@/components/employees/employeeQualification/EmployeeQualificationTab";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "Setting",
  cilUser,
  cisCircle,
  components: {
    EmployeeQualificationTab,
  },
  data() {
    return {
      activeTab: "EmployeeTab",
    };
  },
  created() {},
  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
  },
};
</script>

<style>
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
</style>
