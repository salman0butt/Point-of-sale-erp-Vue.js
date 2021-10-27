<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branches </CCardHeader>

          <CCardBody>
            <div>
              <router-link
                class="btn btn-success"
                to="/branch/create"
                style="text-align: right"
                >Create Branch</router-link
              >
            </div>
            <CDataTable
              :items="branches"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="5"
              sorter
              pagination:false
              clickable-rows
              :loading="loading"
              hover
              @row-clicked="rowClicked"
            >
              <template #select="{ item }">
                <td>
                  <CInputCheckbox @update:checked="() => check(item)" custom />
                </td>
              </template>

              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!-- <CButton @click="viewRow(item.uuid)" color="success"
                        >View</CButton
                      > -->
                    <CButton @click="editRow(item.uuid)" color="warning"
                      >Edit</CButton
                    >
                    <!-- <CButton @click="deleteRow(item.uuid)" color="danger"
                      >Delete</CButton
                    > -->
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
const fields = [
  { key: "name", label: "Name Of Branch", _style: "min-width:40%" },
  { key: "area", label: "Area", _style: "min-width:10%;" },
  { key: "address", label: "Address", _style: "min-width:15%;" },
  { key: "status", label: "Status", _style: "min-width:15%;" },
  { key: "actions", label: "Action", _style: "min-width:15%;" },
  // { key: "uuid", label: "uuid", _style: "min-width:15%; " },
];

export default {
  name: "Branches",
  data() {
    return {
      loading: true,
      Branches: [],
      fields,
    };
  },
  created() {},
  computed: {
    branches() {
      return this.Branches;
    },
  },
  methods: {
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.Branches[item.id]._selected);
      this.$set(this.Branches[item.id], "_selected", !val);
    },
    dataCall() {
      this.$http
        .get("/branches")
        .then(({ data }) => {
          data.data.map((item, id) => {
            this.Branches.push({ ...item, id });
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addBranchBtn() {
      this.$router.push({ name: "Create Branch" });
    },
    viewRow(uuid) {
      alert("Page not ready sorry");
    },
    editRow(uuid) {
      this.$router.push({ path: "/branch/" + uuid });
    },

    deleteRow(uuid) {
      alert("Page not ready sorry");
    },
  },
  mounted() {
    this.dataCall();
  },
};
</script>
