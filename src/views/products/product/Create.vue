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
              <!-- <div class="side-avatar">
                <img src="/img/avatars/7.jpg" class="c-avatar-img" alt="Profile" />
                <CIcon :content="$options.cisCircle" class="online" />
                <div>
                  <span class="emp-name">{{ emp_name }} </span><br />
                  <span class="emp-designation">{{ employee_designation }}</span>
                </div>
              </div>
              <br />-->
              <a
                class="nav-link bborder disabled"
                v-for="(tab, index) in tabs"
                v-bind:key="index"
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
        <CCard>
          <CCardHeader>New Product </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab active>
                <template slot="title">
                  {{ pills.general }}
                </template>
                <ProductForm />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ProductForm from "@/components/products/ProductForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "CreateProduct",
  cilUser,
  cisCircle,
  components: {
    ProductForm,
  },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    pills: {
      general: "General",
    },
    permissions: localStorage.getItem("permissions"),
    activeTab: "ProductTab",
    tabs: [
      { key: "ProductTab", name: "General" },
      { key: "", name: "Prices" },
      { key: "", name: "Images" },
    ],
  }),

  created() {
    this.permissionsMethods();
  },
  methods: {
    permissionsMethods() {
      if (this.permissions.includes("module1 permissions")) {
        this.tabs = [];
        this.tabs.push({ key: "ProductTab", name: "General" });
        this.tabs.push({ key: "", name: "Attributes" });
        this.tabs.push({ key: "", name: "Variations" });
        this.tabs.push({ key: "", name: "Prices" });
        this.tabs.push({ key: "", name: "Inventory" });
        this.tabs.push({ key: "", name: "Images" });
        this.tabs.push({ key: "", name: "Modifiers" });
        this.tabs.push({ key: "", name: "Units" });
      }
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

#v-pills-tab {
  display: block;
}
</style>
