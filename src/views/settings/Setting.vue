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
              v-if="tabs && tabs.length > 0"
            >
              <a
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                class="nav-link bborder"
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
        <!-- <keep-alive> -->
        <component v-bind:is="activeTab"></component>
        <!-- </keep-alive> -->
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import HrSettingForm from "@/components/settings/HrSettingForm";
import GeneralSettingForm from "@/components/settings/GeneralSettingForm";
import AccountingSettingForm from "@/components/settings/AccountingSettingForm";
import CustomerSettingForm from "@/components/settings/CustomerSettingForm";
import DashboardSettingForm from "@/components/settings/DashboardSettingForm";
import DeliverySettingForm from "@/components/settings/DeliverySettingForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "Setting",
  cilUser,
  cisCircle,
  components: {
    // HrSettingForm,
    GeneralSettingForm,
    AccountingSettingForm,
    CustomerSettingForm,
    DashboardSettingForm,
    DeliverySettingForm,
  },
  data() {
    return {
      // activeTab: "HrSettingForm",
      activeTab: "GeneralSettingForm",
      tabs: [
        { key: "GeneralSettingForm", name: "General" },
        { key: "DashboardSettingForm", name: "Dashboard" },
        // { key: "HrSettingForm", name: "HR" },
        { key: "AccountingSettingForm", name: "Accounting" },
        { key: "CustomerSettingForm", name: "Customer" },
        { key: "DeliverySettingForm", name: "Delivery" },
      ],
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
