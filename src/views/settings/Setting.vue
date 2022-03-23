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
import CurrencySettingForm from "@/components/settings/CurrencySettingForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";
import SmtpSettingForm from "@/components/plugins/SmtpSettingForm";
import SmsSettingForm from "@/components/plugins/sms/SmsSettingForm";

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
    CurrencySettingForm,
    SmtpSettingForm,
    SmsSettingForm,
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
        // { key: "CustomerSettingForm", name: "Customer" },
        { key: "DeliverySettingForm", name: "Delivery" },
        { key: "CurrencySettingForm", name: "Currency" },
      ],
    };
  },
  created() {
    this.checkSmtpPlugin();
  },
  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
    checkSmtpPlugin() {
      const serial_number = JSON.stringify(["email", "sms"]);
      this.$http
        .get(`/modules/${serial_number}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            if (response.data && response.data.length > 0) {
              response.data.map((item) => {
                if (item.status === "active") {
                  if (item.serial_number === "email") {
                    this.tabs.push({ key: "SmtpSettingForm", name: "SMTP" });
                  }
                  if (item.serial_number === "sms") {
                    this.tabs.push({ key: "SmsSettingForm", name: "SMS" });
                  }
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
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
