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
                <div>
                  <span class="emp-name">{{ customer_name }} </span><br />
                  <span class="emp-designation">{{ customer_group }}</span>
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
                <CBadge v-if="tab.disabled" color="danger"> coming soon</CBadge>
              </a>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="9">
        <component v-bind:is="activeTab" module="customer"></component>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import General from "@/components/contacts/customers/General";
import Address from "@/components/contacts/customers/AddressTab";
import Contact from "@/components/general/Contact/Contact";
import Email from "@/components/general/Email/Email";
import NoteTab from "@/components/contacts/customers/notes/NoteTab";
import QuotationTab from "@/components/contacts/customers/quotations/QuotationTab";
import InvoiceTab from "@/components/contacts/customers/invoices/InvoiceTab";

import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "EditCustomer",
  cilUser,
  cisCircle,
  components: {
    General,
    Address,
    Contact,
    Email,
    NoteTab,
    QuotationTab,
    InvoiceTab,
  },
  data() {
    return {
      url_data: "",
      customer_name: "",
      customer_group: "",
      activeTab: "General",
      disabled: false,
      tabs: [
        { key: "General", name: "General" },
        { key: "Address", name: "Address" },
        { key: "Contact", name: "Contact" },
        { key: "Email", name: "Email" },
        { key: "NoteTab", name: "Notes" },
        { key: "QuotationTab", name: "Quotations" },
        { key: "InvoiceTab", name: "Invoice" },
        // { key: "Sales", name: "Sales" },
        // { key: "Payments", name: "Payments" },
        { key: "Returns", name: "Returns" },
        {
          key: "CreditAccountPayment",
          name: "Credit Account Payment",
        },
        { key: "Discounts", name: "Discounts" },
      ],
    };
  },
  created() {
    this.getServerData();
  },
  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
    getServerData() {
      this.url_data = this.$route.params.id;
      CustomerServices.get(this.url_data)
        .then((res) => {
          this.customer_name = res.data.full_name;
          this.customer_group = res.data.group.name.en;
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong",
            timer: 3600,
          });
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
