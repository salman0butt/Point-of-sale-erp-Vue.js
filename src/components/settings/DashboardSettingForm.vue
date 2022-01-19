<template>
  <div>
    <CCard>
      <form @submit.prevent="updateCustomerSetting()">
        <CCardHeader> Card Box (A) </CCardHeader>
        <CCardBody>
          <CRow>
            <Loader />
            <CCol xs="12" lg="12">
              <CRow>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    label="Select Box1"
                    :options="options.box1"
                    :value.sync="form.card1.box1"
                  />

                  <CSelect
                    label="Select Box2"
                    :options="options.box1"
                    :value.sync="form.card1.box2"
                  />

                  <CSelect
                    label="Select Box3"
                    :options="options.box1"
                    :value.sync="form.card1.box3"
                  />

                  <CSelect
                    label="Select Box4"
                    :options="options.box1"
                    :value.sync="form.card1.box4"
                  />
                </CCol>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card1.periodic1"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card1.periodic2"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card1.periodic3"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card1.periodic4"
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
                    label="Select Box1"
                    :options="options.box1"
                    :value.sync="form.card2.box1"
                  />

                  <CSelect
                    label="Select Box2"
                    :options="options.box1"
                    :value.sync="form.card2.box2"
                  />

                  <CSelect
                    label="Select Box3"
                    :options="options.box1"
                    :value.sync="form.card2.box3"
                  />

                  <CSelect
                    label="Select Box4"
                    :options="options.box1"
                    :value.sync="form.card2.box4"
                  />
                </CCol>
                <CCol sm="12" md="6" class="pt-2">
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card2.periodic1"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card2.periodic2"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card2.periodic3"
                  />
                  <CSelect
                    label="Periodic"
                    :options="options.periodic"
                    :value.sync="form.card2.periodic4"
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
// import DashboardSettingService from "@/services/settings/HrSettingService";
// import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "DashboardSettingForm",
  components: { Loader },
  data: () => ({
    settingData: [],
    form: {
      card1: {
        box1: "",
        box2: "",
        box3: "",
        box4: "",
        periodic1: "",
        periodic2: "",
        periodic3: "",
        periodic4: "",
      },
      card2: {
        box1: "",
        box2: "",
        box3: "",
        box4: "",
        periodic1: "",
        periodic2: "",
        periodic3: "",
        periodic4: "",
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
        { label: 'Total Sales "Transactions"', value: 'Total Sales "Transactions"' },
        { label: 'Total Sales "Amount"', value: 'Total Sales "Amount"' },
        {
          label: 'Total Sales Hold "Transactions"',
          value: 'Total Sales Hold "Transactions"',
        },
        { label: 'Total Sales Hold "Amount"', value: 'Total Sales Hold "Amount"' },
        {
          label: 'Total Delivery "Transactions"',
          value: 'Total Delivery "Transactions"',
        },
        {
          label: 'Total Pending Delivery "Transactions"',
          value: 'Total Pending Delivery "Transactions"',
        },
        {
          label: 'Total Expanses "Transactions"',
          value: 'Total Expanses "Transactions"',
        },
        { label: 'Total Expanses "Amount"', value: 'Total Expanses "Amount"' },
        {
          label: 'Total Expanses Pending "Transactions"',
          value: 'Total Expanses Pending "Transactions"',
        },
        {
          label: 'Total Expanses Pending "Amount"',
          value: 'Total Expanses Pending "Amount"',
        },
        { label: 'Total Income "Transactions"', value: 'Total Income "Transactions"' },
        { label: 'Total Income "Amount"', value: 'Total Income "Amount"' },
        {
          label: 'Total Income Pending "Transactions"',
          value: 'Total Income Pending "Transactions"',
        },
        {
          label: 'Total Income Pending "Amount"',
          value: 'Total Income Pending "Amount"',
        },
        { label: "Cashflow", value: "Cashflow" },
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
  // validations() {
  //   return {
  //     form: {
  //       box1: { required },
  //       box2: { required },
  //     },
  //   };
  // },
  created() {
    // this.getDashboardSettings();
  },
  methods: {
    // getDashboardSettings() {
    //   let type = "customer";
    //   this.$store.commit("set_loader");
    //   DashboardSettingService.getAll(type)
    //     .then(({ data }) => {
    //       if (data != null && data != "") {
    //         let arr = this.form;
    //         data.forEach(function (item) {
    //           if (arr[item.key] !== undefined) {
    //             const regx = /type/gm;
    //             if (regx.test(item.key)) {
    //               let data = JSON.parse(item.value).map((value) => {
    //                 return { text: value, tiClasses: ["ti-valid"] };
    //               });
    //               arr[item.key].values = data;
    //             } else {
    //               arr[item.key] = item.value;
    //             }
    //           }
    //         });
    //       }
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       this.$store.commit("close_loader");
    //       console.log(error);
    //     });
    // },
    // updateCustomerSetting() {
    //   this.settingData = [];
    //   for (var key in this.form) {
    //     const regx = /type/gm;
    //     if (regx.test(key)) {
    //       let data = JSON.stringify(
    //         this.form[key].values.map(function (item) {
    //           return item.text;
    //         })
    //       );
    //       this.settingData.push({ key: key, value: data });
    //     } else {
    //       this.settingData.push({ key: key, value: this.form[key] });
    //     }
    //   }
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let data = this.settingData;
    //     DashboardSettingService.update(data)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Settings Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.$store.commit("close_loader");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
  },
};
</script>
