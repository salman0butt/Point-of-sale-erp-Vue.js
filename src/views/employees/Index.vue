<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> All Employees </CCardHeader>
        </CCard>
        <CRow>
          <CCol sm="6" md="3" class="pt-2">
            <CCard>
              <CCardHeader> <span class="bolder">Total Employees</span> </CCardHeader>
              <CCardBody>
                <h4>
                  <strong>{{ cards.employees_count }}</strong>
                </h4>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm="6" md="3" class="pt-2">
            <CCard>
              <CCardHeader> <span class="bolder">Total Departments</span> </CCardHeader>
              <CCardBody>
                <h4>
                  <strong>{{ cards.departments_count }}</strong>
                </h4>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm="6" md="3" class="pt-2">
            <CCard>
              <CCardHeader> <span class="bolder">Genders</span> </CCardHeader>
              <CCardBody>
                <h4>
                  <strong
                    ><span>Man {{ cards.male_count }}</span> |
                    <span>Women {{ cards.female_count }}</span></strong
                  >
                </h4>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm="6" md="3" class="pt-2">
            <CCard>
              <CCardHeader> <span class="bolder">Total Managers</span> </CCardHeader>
              <CCardBody>
                <h4>
                  <strong>{{ cards.manager_count }}</strong>
                </h4>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/employees/create"
              >Create Employee</router-link
            >
            <CDataTable
              :items="users"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="5"
              sorter
              pagination
              clickable-rows
              hover
              :loading="loading"
              @row-clicked="rowClicked"
            >
              <template #select="{ item }">
                <td>
                  <CInputCheckbox
                    :checked="item._selected"
                    @update:checked="() => check(item)"
                    custom
                  />
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton @click="deleteRow(item.uuid)" class="btn-sm" color="danger">
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeService from "@/services/employees/EmployeeService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "full_name", label: "EMPLOYEE NAME", _style: "min-width:40%" },
  { key: "email", label: "EMAIL", _style: "min-width:15%;" },
  { key: "phone_number", label: "MOBILE", _style: "min-width:15%;" },
  { key: "department", label: "DEPARTMENT", _style: "min-width:15%;" },
  { key: "branch_name", label: "Branch", _style: "min-width:15%;" },
  { key: "actions", label: "Action", _style: "min-width:15%;" },
];

export default {
  name: "IndexEmployee",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      usersData: [],
      fields,
      loading: false,
      cards: {
        employees_count: 0,
        female_count: 0,
        male_count: 0,
        departments_count: 0,
        manager_count: 0,
      },
    };
  },
  created() {
    this.loading = true;
    this.getTotalCardData();
    this.getEmployeeData();
  },
  computed: {
    users() {
      return this.usersData;
    },
  },
  methods: {
    getEmployeeData() {
      EmployeeService.getAll()
        .then(({ data }) => {
          data.data.map((item, id) => {
            this.usersData.push({ ...item, id });
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTotalCardData() {
      EmployeeService.getTotalCount()
        .then(({ data }) => {
          this.cards.employees_count = data.employees_count;
          this.cards.female_count = data.female_count;
          this.cards.male_count = data.male_count;
          this.cards.departments_count = data.departments_count;
          this.cards.manager_count = data.manager_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.usersData[item.id]._selected);
      this.$set(this.usersData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert(uuid);
    },
    editRow(uuid) {
      this.$router.push({ path: "/employees/edit/" + uuid });
    },

    deleteRow(uuid) {
      alert(uuid);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
