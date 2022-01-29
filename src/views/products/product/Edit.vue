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
                <CBadge v-if="tab.disabled" color="danger"> coming soon</CBadge></a
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
import ProductTab from "@/components/products/ProductTab";
import ProductAttributeForm from "@/components/products/ProductAttributeForm";
import ProductVariationForm from "@/components/products/ProductVariationForm";
import ProductImageForm from "@/components/products/ProductImageForm";
import ProductInventoryForm from "@/components/products/ProductInventoryForm";
import ProductModifierForm from "@/components/products/ProductModifierForm";
import ProductUnitForm from "@/components/products/ProductUnitForm";
import ProductPriceForm from "@/components/products/ProductPriceForm";
import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "EditEmployee",
  cilUser,
  cisCircle,
  components: {
    ProductTab,
    ProductAttributeForm,
    ProductVariationForm,
    ProductImageForm,
    ProductInventoryForm,
    ProductModifierForm,
    ProductUnitForm,
    ProductPriceForm,
  },
  data() {
    return {
      activeTab: "ProductTab",
      tabs: [
        { key: "ProductTab", name: "General" },
        { key: "ProductPriceForm", name: "Prices" },
        { key: "ProductInventoryForm", name: "Inventory" },
        { key: "ProductImageForm", name: "Images" },
      ],
      permissions: localStorage.getItem("permissions"),
    };
  },
  created() {
    this.permissionsMethods();
  },

  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
    permissionsMethods() {
      if (this.permissions.includes("module1 permissions")) {
        this.tabs = [];
        this.tabs.push({ key: "ProductTab", name: "General" });
        this.tabs.push({ key: "ProductAttributeForm", name: "Attributes" });
        this.tabs.push({ key: "ProductVariationForm", name: "Variations" });
        this.tabs.push({ key: "ProductPriceForm", name: "Prices" });
        this.tabs.push({ key: "ProductInventoryForm", name: "Inventory" });
        this.tabs.push({ key: "ProductImageForm", name: "Images" });
        this.tabs.push({ key: "ProductModifierForm", name: "Modifiers" });
        this.tabs.push({ key: "ProductUnitForm", name: "Units" });
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
