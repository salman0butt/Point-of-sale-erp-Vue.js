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
                  disabled: disabled,
                }"
              >
                <CIcon :content="$options.cilUser" />&nbsp; {{ tab.name }}
              </a>
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
import General from "@/components/contacts/supplier/General";
import Address from "@/components/contacts/supplier/AddressTab";
import Contact from "@/components/general/Contact/Contact";

import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "AddSupplier",
  cilUser,
  cisCircle,
  components: {
    General,
    Address,
    Contact,
  },
  data() {
    return {
      name: "name",
      group: "Supplier group",
      activeTab: "General",
      disabled: true,
      tabs: [
        { key: "General", name: "General" },
        { key: "Address", name: "Address" },
        { key: "Contact", name: "Contact" },
        { key: "Email", name: "Email" },
        { key: "Receiving", name: "Receiving" },
        { key: "PurchaseOrder", name: "Purchase Order" },

        // { key: "Notes", name: "Notes", disabled: true },
        // {
        //   key: "Credit Account Payment",
        //   name: "Credit Account Payment",
        //   disabled: true,
        // },
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
