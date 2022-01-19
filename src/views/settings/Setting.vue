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
                v-bind:class="{ active: activeTab === 'HrSettingForm' }"
                href="#"
                @click.prevent="changeActiveTab('HrSettingForm')"
                ><CIcon :content="$options.cilUser" />&nbsp; HR</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'AccountingSettingForm' }"
                href="#"
                @click.prevent="changeActiveTab('AccountingSettingForm')"
              >
                <CIcon :content="$options.cilUser" />&nbsp; Accounting</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'CustomerSettingForm' }"
                href="#"
                @click.prevent="changeActiveTab('CustomerSettingForm')"
              >
                <CIcon :content="$options.cilUser" />&nbsp; Customer</a
              >

              <!-- <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === '' }"
                href="#"
                @click.prevent="changeActiveTab('')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === '' }"
                href="#"
                @click.prevent="changeActiveTab('')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === '' }"
                href="#"
                @click.prevent="changeActiveTab('')"
                ><CIcon :content="$options.cilUser" />&nbsp; Other</a
              > -->
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="9">
        <!-- <keep-alive> -->
        <component v-bind:is="activeTab"></component>
        <!-- </keep-alive> -->
      </CCol>
    </CRow>
  </div>
</template>
<script>
import HrSettingForm from "@/components/settings/HrSettingForm";
import AccountingSettingForm from "@/components/settings/AccountingSettingForm";
import CustomerSettingForm from "@/components/settings/CustomerSettingForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "Setting",
  cilUser,
  cisCircle,
  components: {
    HrSettingForm,
    AccountingSettingForm,
    CustomerSettingForm,
  },
  data() {
    return {
      activeTab: "HrSettingForm",
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
