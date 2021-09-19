<template>
  <div>
    <form class="form-horizontal" method="POST" action="">
      <input type="hidden" name="csv_data_file_id" v-model="csv_data_file.id" />
      <table class="table">
        <tr>
          <th v-for="(csv_header_field, index) in csv_header_fields" :key="index">
            {{ csv_header_field }}
          </th>
        </tr>
        <tr v-for="(row, csindex) in csv_data" :key="csindex">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
        <tr>
          <td v-for="(value, vindex) in csv_data[0]" :key="vindex">
            <select v-model="fields[vindex]">
              <option v-for="(db_field, i) in columns" :key="i" v-bind:value="db_field">
                {{ db_field }}
              </option>
            </select>
          </td>
        </tr>
      </table>
      <!-- https://github.com/LaravelDaily/Laravel-Import-CSV-Demo/blob/master/resources/views/import_fields.blade.php -->
      <button @click.prevent="postDataMap" class="btn btn-primary">Import Data</button>
    </form>
    <CForm>
      <input type="file" @change="pickFile" />
    </CForm>
  </div>
</template>
<script>
export default {
  name: "Test2",
  components: {},
  data: function () {
    return {
      csv_header_fields: "",
      csv_data: "",
      selectType: "",
      csv_data_file: "",
      fields: [],
      columns: "",
      form: {
        csv_file: "",
      },
    };
  },
  computed: {
    columnss() {
      return this.columns;
    },
  },
  methods: {
    getDataMap() {
      let data = new FormData();
      data.append("csv_file", this.form.csv_file);
      data.append("header", true);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      this.$http
        .post("/import_parse", data, config)
        .then(({ data }) => {
          this.csv_data_file = data.csv_data_file;
          this.csv_data = data.csv_data;
          this.csv_header_fields = data.csv_header_fields;
          this.columns = data.columns;
          // console.log(this.csv_data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postDataMap() {
      let data = {
        csv_data_file_id: this.csv_data_file.id,
        fields: this.fields,
      };
      // console.log(data);
      this.$http
        .post("/import_process", data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pickFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.form.csv_file = file[0];
        this.getDataMap();
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //   this.general_items.previewImage = e.target.result;
        // };
        // reader.readAsDataURL(file[0]);
      }
    },
  },
};
</script>
