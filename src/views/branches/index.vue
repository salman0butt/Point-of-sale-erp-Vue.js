<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branches </CCardHeader>
          <CCol col="6" sm="4" md="2" xl class="mb-0 mt-3 mb-xl-0">
            <CButton
              block
              variant="outline"
              @click="addBranchBtn()"
              color="primary"
              >Add Branch</CButton
            >
          </CCol>
          <CCardBody>
            <CCardBody>
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
                    <CInputCheckbox
                      :checked="item._selected"
                      @update:checked="() => check(item)"
                      custom
                    />
                  </td>
                </template>
              </CDataTable>
            </CCardBody>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "name", label: "Name Of Branch", _style: "min-width:40%" },
  { key: "area", label: "Area", _style: "min-width:10%;" },
  { key: "address", label: "Address", _style: "min-width:15%;" },
  { key: "status", label: "Status", _style: "min-width:15%;" },
  { key: "closing_date", label: "Action", _style: "min-width:15%;" },
];

export default {
  name: "Branches",
  data() {
    return {
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
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addBranchBtn() {
      this.$router.push({ name: "Create Branch" });
    },
  },
  mounted() {
    this.dataCall();
  },
};
</script>
