<template>
  <div>
    <div>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader> New Branch </CCardHeader>
            <CCardBody>
              <CTabs add-tab-classes="mt-1" :active-tab="activeTab">
                <CTab>
                  <template slot="title">
                    {{ tabs[0] }}
                  </template>
                  <form @submit.prevent="uploadFile">
                    <input type="file" @change="pickFile" />
                    <CButton type="submit">Submit</CButton>
                  </form>
                </CTab>
                <CTab disabled>
                  <template slot="title">
                    {{ tabs[1] }}
                  </template>
                  <CDataTable
                    :items="items"
                    :fields="fields"
                    sorter
                    clickable-rows
                    hover
                    :loading="loading"
                  >
                    <template #database_fields="{ item }">
                      <td>
                        <CCol sm="6" md="6" class="pt-2">
                          <CSelect
                            :value="item.database_fields"
                            @change="onChange($event, item)"
                            :options="[
                              {
                                label: 'Choose Database field',
                                value: '',
                                selected: true,
                                disabled: true,
                              },
                              {
                                label: 'Employee Serial',
                                value: 'employee_id',
                              },
                              // Dont change the pattern
                              'date',
                              'time',
                              'status',
                              'state',
                            ]"
                          />
                        </CCol>
                      </td>
                    </template>
                  </CDataTable>
                  <CButton
                    @click="mapAndContinue"
                    block
                    color="success"
                    style="float: right; width: 180px"
                  >
                    Map & Contine
                  </CButton>
                </CTab>

                <CTab disabled>
                  <template slot="title">
                    {{ tabs[2] }}
                  </template>
                  <CButton
                    @click="importData"
                    block
                    color="success"
                    style="float: right; width: 180px"
                  >
                    Validate & Import
                  </CButton>
                </CTab>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
<script >
const fields = [
  {
    key: "spreadsheet_column",
    label: "Spreadsheet Column",
    _style: "min-width:15%;",
  },
  { key: "database_fields", label: "Database Field", _style: "min-width:15%;" },
];
export default {
  name: "ImportAttendance",
  data() {
    return {
      tabs: ["Upload File", "Mapping", "Validate and Complete Import"],
      activeTab: 0,
      fields,
      items: [],
      loading: false,
      spreadsheet_column: [],
      database_fields: [],

      form: {
        file: "",
      },
    };
  },
  methods: {
    uploadFile() {
      let formData = new FormData();
      formData.append("file", this.form.file);
      this.$http
        .post("/attendances/import/headings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "File Uploaded Successfully",
            timer: 3600,
          });
          let spreadsheet = res.data[0][0];
          spreadsheet.forEach((element) => {
            this.items.push({
              spreadsheet_column: element,
              database_fields: "",
            });
          });

          this.activeTab = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pickFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.form.file = file[0];
      }
    },
    onChange(event, item) {
      item.database_fields = event.target.value;
    },
    mapAndContinue() {
      this.activeTab = 2;
    },
    importData() {
      this.spreadsheet_column = [];
      this.database_fields = [];
      this.items.forEach((element) => {
        this.spreadsheet_column.push(element.spreadsheet_column);
        this.database_fields.push(element.database_fields);
      });
      let formData = new FormData();
      formData.append("file", this.form.file);
      formData.append("spreadsheet_column", this.spreadsheet_column);
      formData.append("database_fields", this.database_fields);
      this.$http
        .post("/attendances/import", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>