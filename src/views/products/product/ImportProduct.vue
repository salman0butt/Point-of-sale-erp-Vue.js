<template>
  <div>
    <div>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader> Import Products </CCardHeader>
            <CCardBody>
              <CTabs add-tab-classes="mt-1" :active-tab="activeTab">
                <CTab>
                  <template slot="title">
                    {{ tabs[0] }}
                  </template>
                  <form @submit.prevent="uploadFile">
                    <CRow class="mt-4">
                      <CCol sm="12">
                        <input type="file" @change="pickFile" />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm="12" class="pt-3">
                        <CLoadingButton
                          type="submit"
                          progress
                          timeout="2000"
                          :color="color"
                        >
                          Submit</CLoadingButton
                        >
                      </CCol>
                    </CRow>
                  </form>
                </CTab>
                <CTab disabled>
                  <template slot="title">
                    {{ tabs[1] }}
                  </template>
                  <CDataTable
                    :items="items"
                    :fields="fields"
                    clickable-rows
                    hover
                    :loading="loading"
                  >
                    <template #spreadsheet_column="{ item }">
                      <td>
                        <CCol sm="6" md="6" class="pt-2">
                          <CSelect
                            :value="item.spreadsheet_column"
                            @change="onChange($event, item)"
                            :options="options"
                            required
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
                    style="float: right; width: 100%"
                  >
                    Validate & Import
                  </CButton>
                  <CDataTable
                    :items="errors"
                    :fields="fields2"
                    v-show="error_table_visibility"
                    clickable-rows
                    hover
                    :loading="loading"
                  >
                  </CDataTable>
                </CTab>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
<script>
const fields = [
  {
    key: "database_fields",
    label: "Database Columns",
    _style: "min-width:15%;",
  },
  {
    key: "spreadsheet_column",
    label: "SpreadSheet Columns",
    _style: "min-width:15%;",
  },
];
const items = [
  { database_fields: "name", spreadsheet_column: "" },
  { database_fields: "serial_number", spreadsheet_column: "" },
  { database_fields: "type", spreadsheet_column: "" },
  { database_fields: "barcode", spreadsheet_column: "" },
  { database_fields: "short_description", spreadsheet_column: "" },
  { database_fields: "product_description", spreadsheet_column: "" },
  { database_fields: "is_ecommerce_product", spreadsheet_column: "" },
  { database_fields: "is_favorite", spreadsheet_column: "" },
  { database_fields: "status", spreadsheet_column: "" },
  { database_fields: "cost_price", spreadsheet_column: "" },
  { database_fields: "selling_price", spreadsheet_column: "" },
  { database_fields: "stock", spreadsheet_column: "" },
  { database_fields: "tags", spreadsheet_column: "" },
];

const fields2 = [
  {
    key: "row",
    label: "Row #",
    _style: "min-width:15%;",
  },
  {
    key: "attribute",
    label: "Attribute/Column",
    _style: "min-width:15%;",
  },
  {
    key: "errors",
    label: "Error",
    _style: "min-width:15%;",
  },
];

export default {
  name: "ImportProduct",
  data() {
    return {
      tabs: ["Upload File", "Mapping", "Validate and Complete Import"],
      activeTab: 0,
      fields,
      fields2,
      loading: false,
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      color: "success",
      size: "lg",

      options: [
        {
          label: "Choose SpreadSheet fields",
          value: "",
          selected: true,
          disabled: true,
        },
      ],
      errors: [],
      error_table_visibility: false,
      check: 0,

      form: {
        file: "",
      },
    };
  },
  methods: {
    uploadFile() {
      if (this.form.file === "" || this.form.file === undefined) {
        return;
      }
      let formData = new FormData();
      formData.append("file", this.form.file);
      this.$http
        .post("/products/import/headings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "File Uploaded Successfully",
            timer: 3600,
          });
          this.options = [];
          this.spreadsheet_column = [];
          this.database_fields = [];
          this.errors = [];
          this.error_table_visibility = false;
          this.options.push({
            label: "Choose SpreadSheet fields",
            value: "",
            selected: true,
            disabled: true,
          });
          let spreadsheet = res.data[0][0];
          spreadsheet.forEach((element) => {
            this.options.push(element);
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
      item.spreadsheet_column = event.target.value;
    },
    mapAndContinue() {
      this.check = 0;
      this.items.forEach((element) => {
        if (element.spreadsheet_column == "") {
          this.check = 1;
        }
      });
      if (this.check == 0) {
        this.activeTab = 2;
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Incomplete Form",
          text: "All fields are necessary",
          timer: 3600,
        });
      }
    },
    importData() {
      this.spreadsheet_column = [];
      this.database_fields = [];
      this.errors = [];
      this.items.forEach((element) => {
        this.spreadsheet_column.push(element.spreadsheet_column);
        this.database_fields.push(element.database_fields);
      });
      let formData = new FormData();
      formData.append("file", this.form.file);
      formData.append("spreadsheet_column", this.spreadsheet_column);
      formData.append("database_fields", this.database_fields);
      this.$http
        .post("/products/import", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200 && res.data && res.data.length === 0) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Imported Successfully",
              timer: 3600,
            });
            this.$router.push({ path: "/products" });
          } else {
            this.error_table_visibility = true;
            this.errors = [];
            res.data.map((item, id) => {
              this.errors.push({ ...item, id });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
