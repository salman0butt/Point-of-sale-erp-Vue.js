<template>
  <div>
    <CCard>
      <form @submit.prevent="updateDashboardSettings()">
        <CCardHeader> Card Box (A) </CCardHeader>
        <CCardBody>
          <CRow>
            <Loader />
            <CCol xs="12" lg="12">
              <CRow>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    v-for="(item, index) in form.card1.box"
                    :key="index"
                    label="Select Box "
                    :options="options.box1"
                    :value.sync="form.card1.box[index].value"
                  />
                </CCol>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    v-for="(item, index) in form.card1.periodic"
                    :key="index"
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card1.periodic[index].value"
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardHeader> Card Box (B) </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="12" lg="12">
              <CRow>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    v-for="(item, index) in form.card2.box"
                    :key="index"
                    label="Select Box "
                    :options="options.box1"
                    :value.sync="form.card2.box[index].value"
                  />
                </CCol>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    v-for="(item, index) in form.card2.periodic"
                    :key="index"
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card2.periodic[index].value"
                  />
                </CCol>
              </CRow>

              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
                >
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </form>
    </CCard>
  </div>
</template>
<script>
import DashboardSettingService from "@/services/settings/HrSettingService";
// import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "DashboardSettingForm",
  components: { Loader },
  data: () => ({
    settingData: [],
    form: {
      card1: {
        box: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
        periodic: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
      },
      card2: {
        box: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
        periodic: [
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
      },
    },
    options: {
      box1: [
        {
          label: "Choose Box1",
          value: "",
          selected: "",
          disabled: true,
        },
        {
          label: "Total Sales (Transactions)",
          value: "Total Sales (Transactions)",
        },
        { label: "Total Sales (Amount)", value: "Total Sales (Amount)" },
        {
          label: "Total Sales Hold (Transactions)",
          value: "Total Sales Hold (Transactions)",
        },
        {
          label: "Total Sales Hold (Amount)",
          value: "Total Sales Hold (Amount)",
        },
        {
          label: "Total Delivery (Transactions)",
          value: "Total Delivery (Transactions)",
        },

        {
          label: "Total Expense (Transactions)",
          value: "Total Expense (Transactions)",
        },
        { label: "Total Expense (Amount)", value: "Total Expense (Amount)" },
        {
          label: "Total Expense Pending (Transactions)",
          value: "Total Expense Pending (Transactions)",
        },
        {
          label: "Total Expense Pending (Amount)",
          value: "Total Expense Pending (Amount)",
        },
        {
          label: "Total Income (Transactions)",
          value: "Total Income (Transactions)",
        },
        { label: "Total Income (Amount)", value: "Total Income (Amount)" },
        {
          label: "Total Income Pending (Transactions)",
          value: "Total Income Pending (Transactions)",
        },
        {
          label: "Total Income Pending (Amount)",
          value: "Total Income Pending (Amount)",
        },
        // { label: "Cashflow", value: "Cashflow" },
      ],
      periodic: [
        {
          label: "Choose Periodic",
          value: "",
          selected: "",
          disabled: true,
        },
        { label: "Day", value: "Day" },
        { label: "Week", value: "Week" },
        { label: "Month", value: "Month" },
        { label: "Year", value: "Year" },
        { label: "All Time", value: "All Time" },
      ],
    },
  }),

  created() {
    this.getDashboardSettings();
  },
  methods: {
    getDashboardSettings() {
      this.$store.commit("set_loader");
      DashboardSettingService.getDashboardSetting("Box A")
        .then(({ data }) => {
          if (data != null && data != "") {
            let arr = this.form;
            data.forEach(function (item, index) {
              if (item.key == "Box A") {
                arr.card1.box[index].value = item.value;
                arr.card1.periodic[index].value = item.periodic;
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
      DashboardSettingService.getDashboardSetting("Box B")
        .then(({ data }) => {
          if (data != null && data != "") {
            let arr = this.form;
            data.forEach(function (item, index) {
              if (item.key == "Box B") {
                arr.card2.box[index].value = item.value;
                arr.card2.periodic[index].value = item.periodic;
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    updateDashboardSettings() {
      //   this.$v.$touch();
      //   if (!this.$v.$invalid) {
      this.$store.commit("set_loader");
      let data = this.form;
      console.log(data);
      DashboardSettingService.updateDashboardSettings(data)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Settings Updated Successfully",
              timer: 3600,
            });
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
    },
  },
};
</script>
