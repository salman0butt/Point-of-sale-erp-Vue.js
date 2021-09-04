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
                <img src="/img/avatars/7.jpg" class="c-avatar-img" alt="Profile" />
                <div>
                  <span class="emp-name">Alan Butler </span><br />
                  <span class="emp-designation">Project Manager</span>
                </div>
              </div>
              <a
                class="nav-link bborder"
                @click.prevent="changeActiveTab('general_tab')"
                href="#"
                v-bind:class="{ active: activeTab === 'general_tab' }"
                >General</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'detail_tab' }"
                href="#"
                @click.prevent="changeActiveTab('detail_tab')"
              >
                Detail</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'salary_tab' }"
                href="#"
                @click.prevent="changeActiveTab('salary_tab')"
                >Salary</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'awards_tab' }"
                href="#"
                @click.prevent="changeActiveTab('awards_tab')"
                >Awards</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'contract_tab' }"
                href="#"
                @click.prevent="changeActiveTab('contract_tab')"
                >Contracts</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'expense_tab' }"
                href="#"
                @click.prevent="changeActiveTab('expense_tab')"
                >Expense</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'loans_tab' }"
                href="#"
                @click.prevent="changeActiveTab('loans_tab')"
                >Loans</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'qualification_tab' }"
                href="#"
                @click.prevent="changeActiveTab('qualification_tab')"
                >Qualifications</a
              >
              <a
                class="nav-link bborder"
                v-bind:class="{ active: activeTab === 'target_tab' }"
                href="#"
                @click.prevent="changeActiveTab('target_tab')"
                >Targets</a
              >
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" lg="9">
        <EmployeeTab v-show="activeTab === 'general_tab'" />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeTab from "@/components/employees/EmployeeTab";

export default {
  name: "EditEmployee",
  components: {
    EmployeeTab,
  },
  data() {
    return {
      activeTab: "general_tab",
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
}
a.nav-link.active,
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #52b947 !important;
  color: #fff !important;
}
</style>
