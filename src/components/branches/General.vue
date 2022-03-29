<template>
  <div>
    <form id="app1" @submit.prevent="updateBranch">
      <CCardBody>
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Name"
              v-model="form.name"
              :class="{ error: $v.form.name.$error }"
            />
            <div v-if="$v.form.name.$error">
              <p v-if="!$v.form.name.required" class="errorMsg">
                Fullname is required
              </p>
              <p v-if="!$v.form.name.minLength" class="errorMsg">
                Fullname should be at least 4 character
              </p>
            </div>
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <CInput label="Adress" v-model="form.address" />
            <div v-if="$v.form.address.$error">
              <p v-if="!$v.form.address.required" class="errorMsg">
                Address is required
              </p>
              <p v-if="!$v.form.address.minLength" class="errorMsg">
                Address should be at least 4 character
              </p>
            </div>
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            <CInput label="Area" v-model="form.area" />
            <div v-if="$v.form.area.$error">
              <p v-if="!$v.form.area.required" class="errorMsg">
                Area is required
              </p>
              <p v-if="!$v.form.area.minLength" class="errorMsg">
                Area should be at least 4 character
              </p>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CInput label="Telephone" v-model="form.tel" type="number" />
            <div v-if="$v.form.tel.$error">
              <p v-if="!$v.form.tel.required" class="errorMsg">
                Telephone is required
              </p>
              <p v-if="!$v.form.tel.numeric" class="errorMsg">
                Telephone must be numeric
              </p>
              <p v-if="!$v.form.tel.minLength" class="errorMsg">
                Telephone should be at least 8 character
              </p>
            </div>
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            <CInput label="Mobile" v-model="form.mob" type="number" />
            <div v-if="$v.form.mob.$error">
              <p v-if="!$v.form.mob.required" class="errorMsg">
                Mobile Number is required
              </p>
              <p v-if="!$v.form.mob.numeric" class="errorMsg">
                Mobile Number must be numeric
              </p>
              <p v-if="!$v.form.mob.minLength" class="errorMsg">
                Mobile Number should be at least 8 character
              </p>
            </div>
          </CCol>
          <!-- <CCol sm="6" md="4" class="pt-2">
            <CInput label="Google Location" v-model="form.location">
              <template #append>
                <CButton type="button" color="default">
                  <svg
                    height="15pt"
                    viewBox="0 0 512 512"
                    width="15pt"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m8.828125 282.484375h45.902344c12.0625 91.066406 83.71875 162.722656 174.785156 174.785156v45.902344c.015625 4.871094 3.960937 8.8125 8.828125 8.828125h35.3125c4.867188-.015625 8.8125-3.957031 8.828125-8.828125v-45.902344c91.066406-12.0625 162.722656-83.71875 174.785156-174.785156h45.902344c4.871094-.015625 8.8125-3.960937 8.828125-8.828125v-35.3125c-.015625-4.867188-3.957031-8.8125-8.828125-8.828125h-45.902344c-12.0625-91.066406-83.71875-162.722656-174.785156-174.785156v-45.902344c-.015625-4.871094-3.960937-8.8125-8.828125-8.828125h-35.3125c-4.867188.015625-8.8125 3.957031-8.828125 8.828125v45.902344c-91.066406 12.0625-162.722656 83.71875-174.785156 174.785156h-45.902344c-4.871094.015625-8.8125 3.960937-8.828125 8.828125v35.3125c.015625 4.867188 3.957031 8.8125 8.828125 8.828125zm247.171875-176.554687c82.878906 0 150.070312 67.191406 150.070312 150.070312s-67.191406 150.070312-150.070312 150.070312-150.070312-67.191406-150.070312-150.070312c.117187-82.832031 67.238281-149.953125 150.070312-150.070312zm0 0"
                    />
                    <path
                      d="m326.621094 256c0 39.003906-31.617188 70.621094-70.621094 70.621094s-70.621094-31.617188-70.621094-70.621094 31.617188-70.621094 70.621094-70.621094 70.621094 31.617188 70.621094 70.621094zm0 0"
                    />
                  </svg>
                </CButton>
              </template>
            </CInput>
          </CCol> -->
          <!-- </CRow>
        <CRow> -->
          <CCol sm="6" md="4" class="pt-2">
            <CInput label="CR Number" v-model="form.cr" />
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <CSelect
              label="Status"
              :options="status"
              :value.sync="form.status"
            />
          </CCol>
        </CRow>

        <!-- <CButton
          block
          color="success"
          style="float: right; width: 200px"
          type="submit"
          @click="saveAndExit = false"
          >Save & Continue
        </CButton> -->
        <CButton
          progress
          color="success"
          timeout="2000"
          block
          style="float: right; width: 140px; margin-right: 20px; margin-top: 0"
          @click="saveAndExit = true"
          type="submit"
          >Save & Exit</CButton
        >
      </CCardBody>
    </form>
  </div>
</template>
<script>
import BranchServices from "@/services/branches/BranchServices";

import { required, minLength, numeric } from "vuelidate/lib/validators";
const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "name", label: "Shift Name", _style: "min-width:40%" },
  { key: "actions", label: "Action", _style: "min-width:15%;" },
];
const fields2 = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "periodic", label: "Periodic", _style: "min-width:15%;" },
  { key: "type", label: "Type", _style: "min-width:15%;" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "detail", label: "Detail", _style: "min-width:15%;" },
  { key: "actions", label: "Action", _style: "min-width:15%;" },
];

export default {
  name: "GeneralBranch",

  data() {
    return {
      //All
      tabs: ["General", "Timing", "Target", "Social media"],
      isEditing: false,

      // General
      form: {
        name: "",
        address: "",
        area: "",
        tel: "",
        mob: "",
        // location: "",
        opening_date: "",
        closing_date: "",
        cr: "",
        status: "",
      },
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
      dates: "",
      url_data: null,

      // Timing tab
      shiftToggle: "Add New Shift",
      shifts: [],
      fields,
      collapse: false,
      collapse_table: true,
      storeTiming: {
        shiftname: "",
        timelist: [
          { day: "Sunday", status: false, time: [] },
          { day: "Monday", status: false, time: [] },
          { day: "Tuesday", status: true, time: [] },
          { day: "Wednesday", status: true, time: [] },
          { day: "Thursday", status: true, time: [] },
          { day: "Friday", status: true, time: [] },
          { day: "Saturday", status: true, time: [] },
        ],
      },
      updateTimingUuid: "",

      // Target
      fields2,
      collapse_target: false,
      collapse_target_table: true,
      targetToggle: "Add New Target",
      targetList: [],
      target: {
        name: "",
        type: "",
        period: "",
        amount: "",
        detail: "",
      },

      // Social Media

      mediaLst: [],
      mediaitem: { channel: "", name: "", link: "" },
      usersData: [],
      details: [],
      errors: [],
    };
  },
  validations() {
    return {
      // General
      form: {
        name: { required, minLength: minLength(4) },
        address: { required, minLength: minLength(4) },
        area: { required, minLength: minLength(4) },
        tel: { required, numeric, minLength: minLength(8) },
        mob: { required, minLength: minLength(8) },
      },
    };
  },
  created() {
    // General
    this.getGeneralDetail();
    this.getDates();
  },

  methods: {
    // All

    //General
    getGeneralDetail() {
      this.url_data = this.$route.params.id;
      this.$http
        .get("/branches/" + this.url_data)
        .then(({ data }) => {
          this.form.name = data.name;
          this.form.address = data.address;
          this.form.area = data.area;
          this.form.tel = data.tel;
          this.form.mob = data.mob;
          // this.form.location = data.location;
          this.form.cr = data.cr;
          // this.form.opening_date = data.opening_date;
          // this.form.closing_date = data.closing_date;
          this.form.status = data.status;
        })
        .catch((err) => {
          this.$router.push({ path: "/branches" });
        });
    },
    updateBranch() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let data = this.form;

        this.$http
          .put("branches/" + this.url_data, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Branch Updated Successfully",
                timer: 3600,
              });
              if (this.saveAndExit) {
                this.$router.push({ path: "/branches" });
              }
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err]);
              }
            } else {
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            }
          });
      }
    },

    getDates() {
      let array = [];
      for (let index = 1; index <= 31; index++) {
        array.push({ value: index });
      }
      this.dates = array;
    },
  },
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>

