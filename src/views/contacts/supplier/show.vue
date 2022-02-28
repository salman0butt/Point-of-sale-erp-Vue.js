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
                  <span class="emp-name">{{ name }} </span><br />
                  <span class="emp-designation">{{ group }}</span>
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
        <component
          v-bind:is="activeTab"
          module="supplier"
          :readOnly="true"
        ></component>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import SupplierServices from "@/services/contacts/supplier/SupplierServices";
import General from "@/components/contacts/supplier/General";
import Address from "@/components/contacts/supplier/AddressTab";
import Contact from "@/components/general/Contact/Contact";
import Email from "@/components/general/Email/Email";

import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "EditSupplier",
  cilUser,
  cisCircle,
  components: {
    General,
    Address,
    Contact,
    Email,
  },
  data() {
    return {
      url_data: "",
      name: "",
      group: "",
      activeTab: "General",
      disabled: false,
      tabs: [
        { key: "General", name: "General" },
        { key: "Address", name: "Address" },
        { key: "Contact", name: "Contact" },
        { key: "Email", name: "Email" },
        { key: "Notes", name: "Notes", disabled: true },
        { key: "Quotations", name: "Quotations", disabled: true },
        { key: "Invoice", name: "Invoice", disabled: true },
        { key: "Sales", name: "Sales", disabled: true },
        { key: "Payments", name: "Payments", disabled: true },
        { key: "Returns", name: "Returns", disabled: true },
        {
          key: "Credit Account Payment",
          name: "Credit Account Payment",
          disabled: true,
        },
        // { key: "Discounts", name: "Discounts", disabled: true },
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
      SupplierServices.get(this.url_data)
        .then((res) => {
          this.name = res.data.name;
          this.group = res.data.group.name.en;
          console.log(res);
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
