<template>
  <div>
    <CRow>
      <CCol xs="12" lg="3">
        <CCard>
          <CCardBody>
            <ul
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
              v-if="tabs && tabs.length > 0"
            >
              <div v-for="(tab, index) in tabs" v-bind:key="index">
                <li
                  class="nav-link bborder"
                  @click.prevent="changeActiveTab(tab.key)"
                  v-bind:class="{ active: activeTab === tab.key }"
                >
                  <span v-if="tab.hasChildren" @click="subMenu(index)">
                    {{ tab.isCollapse ? "-" : "+" }}
                    <!-- <CIcon
                      v-if="tab.isCollapse"
                      :content="$options.cilMinus"
                      style="font-size: 10px"
                    />
                    <CIcon v-else :content="$options.cilPlus" /> -->
                  </span>
                  <span v-else> &emsp;</span>
                  <CIcon :content="$options.cilUser" />&nbsp; {{ tab.name }}
                </li>
                <ul
                  class="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                  v-if="tab.isCollapse"
                >
                  <li
                    class="nav-link bborder"
                    style="color: #fff"
                    v-for="(children, k) in tab.childrens"
                    :key="k"
                    @click.prevent="changeActiveTab(children.key)"
                    v-bind:class="{ active: activeTab === children.key }"
                  >
                    &nbsp; - <CIcon :content="$options.cilUser" />&nbsp;
                    {{ children.name }}
                  </li>
                </ul>
              </div>
            </ul>
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
import CustomerReport from "@/components/reports/CustomerReport";
import ProductReport from "@/components/reports/ProductReport";
import SaleReport from "@/components/reports/SaleReport";
import SaleByCustomerReport from "@/components/reports/SaleByCustomerReport";
import SaleByItemReport from "@/components/reports/SaleByItemReport";
import SaleBySalesPersonReport from "@/components/reports/SaleBySalesPersonReport";
import ProfitAndLossReport from "@/components/reports/ProfitAndLossReport";
import BalanceSheet from "@/components/reports/BalanceSheet";
import OpeningReport from "@/components/reports/OpeningReport";

import { cilUser, cisCircle } from "@coreui/icons-pro";

export default {
  name: "ShowReport",
  cilUser,
  cisCircle,
  components: {
    CustomerReport,
    ProductReport,
    SaleReport,
    SaleByCustomerReport,
    SaleByItemReport,
    SaleBySalesPersonReport,
    ProfitAndLossReport,
    BalanceSheet,
    OpeningReport,
  },
  data() {
    return {
      activeTab: "CustomerReport",
      subMenuList: [],
      tabs: [
        // {
        //   key: "CustomerReport",
        //   name: "Customer Report",
        //   isCollapse: false,
        //   hasChildren: true,
        //   childrens: [
        //     { key: "Child1", name: "Child1" },
        //     { key: "Child2", name: "Child2" },
        //   ],
        // },
        // {
        //   key: "ProductReport",
        //   name: "Product Report",
        //   isCollapse: false,
        //   hasChildren: true,
        //   childrens: [
        //     { key: "Child1", name: "Child1" },
        //     { key: "Child2", name: "Child2" },
        //   ],
        // },
        {
          key: "SaleReport",
          name: "Sales Report",
          isCollapse: false,
          hasChildren: true,
          childrens: [
            { key: "SaleByCustomerReport", name: "Sales By Customer" },
            { key: "SaleByItemReport", name: "Sales By Item" },
            { key: "SaleBySalesPersonReport", name: "Sales By SalesPerson" },
            { key: "OpeningReport", name: "Opening" },
          ],
        },
        { key: "ProfitAndLossReport", name: "Profit & Loss Report" },
        // { key: "BalanceSheet", name: "Balance Sheet" },
      ],
    };
  },
  created() {},
  methods: {
    changeActiveTab(value) {
      this.activeTab = value;
    },
    subMenu(k) {
      this.tabs[k].isCollapse = !this.tabs[k].isCollapse;
    },
  },
};
</script>

<style>
.nav-link {
  color: black !important;
}
.bborder {
  border-bottom: 1px solid #80808073;
  align-items: center;
}
.nav-link.active,
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #52b947 !important;
  color: #fff !important;
  cursor: pointer;
}
.nav-link {
  cursor: pointer;
}
</style>
