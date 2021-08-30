<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Employee </CCardHeader>
          <CCardBody>
            <CCardBody>
              <router-link class="btn btn-success" to="/employees/create"
                >Create Employee</router-link
              >
              <CDataTable
                :items="users"
                :fields="fields"
                column-filter
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
              </CDataTable>
            </CCardBody>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
// import usersData from "../users/UsersData";

const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "full_name", _style: "min-width:40%" },
  { key: "gender", _style: "min-width:10%;" },
  { key: "marital_status", _style: "min-width:15%;" },
  { key: "phone_number", _style: "min-width:15%;" },
  { key: "email", _style: "min-width:15%;" },
  { key: "nationality", _style: "min-width:15%;" },
  { key: "address", _style: "min-width:15%;" },
  { key: "cpr_no", _style: "min-width:15%;" },
];

export default {
  name: "IndexEmployee",
  data() {
    return {
      usersData: [],
      fields,
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$http
      .get("/employees")
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
  computed: {
    users() {
      return this.usersData;
    },
  },
  methods: {
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.usersData[item.id]._selected);
      this.$set(this.usersData[item.id], "_selected", !val);
    },
  },
};
</script>
