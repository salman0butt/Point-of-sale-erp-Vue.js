<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branches </CCardHeader>

          <CCardBody>
            <div>
              <router-link
                v-if="isBranchPlugin && $can('create branches')"
                class="btn btn-success"
                to="/branch/create"
                style="text-align: center; float: right"
                >Create Branch</router-link
              >
            </div>
            <br />
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
            <CDataTable
              :items="branches"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="5"
              sorter
              pagination:false
              clickable-rows
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
                    <CButton
                      v-if="$can('edit branches')"
                      @click="editRow(item.uuid)"
                      color="warning"
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
import Loader from "@/components/layouts/Loader";
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
  components: { Loader },
  data() {
    return {
      Branches: [],
      fields,
      isBranchPlugin: false,
    };
  },
  created() {
    this.checkBranchPlugin();
  },
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
      this.$store.commit("set_loader");
      this.$http
        .get("/branches", {
          headers: {
            "selected-branches": localStorage.getItem("selected_branches"),
          },
        })
        .then(({ data }) => {
          data.map((item, id) => {
            this.Branches.push({ ...item, id });
          });
          this.$store.commit("close_loader");
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
    checkBranchPlugin() {
      const serial_number = JSON.stringify(["branch"]);
      this.$http
        .get(`/modules/${serial_number}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data && response.data.length > 0) {
              response.data.map((item) => {
                if (item.status === "active") {
                  console.log(item);
                  this.isBranchPlugin = true;
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
  mounted() {
    this.dataCall();
  },
};
</script>
