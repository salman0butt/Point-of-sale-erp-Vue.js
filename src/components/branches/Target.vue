<template>
  <div>
    <div>
      <CButton
        @click="
          collapse_target = !collapse_target;
          collapse_target_table = !collapse_target_table;
          targetToggleMethod();
        "
        ref="targetToggleRef"
        color="primary"
        class="mb-2 mt-3"
        style="float: right"
      >
        {{ targetToggle }}
      </CButton>
    </div>
    <CCollapse :show="collapse_target_table">
      <CCardBody>
        <CCardBody>
          <CDataTable
            :items="targetList"
            :fields="fields2"
            table-filter
            sorter
            pagination:false
            clickable-rows
            hover
          >
            <template #select="{ item }">
              <td>
                <CInputCheckbox @update:checked="() => check(item)" custom />
              </td>
            </template>

            <template #actions="{ item }">
              <td>
                <CButtonGroup>
                  <CButton @click="editShift(item.uuid)" color="warning"
                    >Edit</CButton
                  >
                  <CButton @click="deleteRow(item.uuid)" color="danger"
                    >Delete</CButton
                  >
                </CButtonGroup>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCardBody>
    </CCollapse>
    <CCollapse :show="collapse_target">
      <form @submit.prevent="storeTarget()">
        <CCardBody>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Name"
                v-model="target.name"
                :class="{ error: $v.target.name.$error }"
              />
              <div v-if="$v.target.name.$error">
                <p v-if="!$v.target.name.required" class="errorMsg">
                  Name is required
                </p>
                <p v-if="!$v.target.name.minLength" class="errorMsg">
                  Name should be at least 4 character
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Period"
                :options="[
                  {
                    label: 'Choose Period',
                    value: '',
                    selected: '',
                    disabled: true,
                  },
                  'Daily',
                  'Weekly',
                  '14 Days',
                  'Monthly',
                  'Quarterly',
                  'Yearly',
                ]"
                :value.sync="target.period"
                :class="{ error: $v.target.period.$error }"
              />
              <div v-if="$v.target.period.$error">
                <p v-if="!$v.target.period.required" class="errorMsg">
                  Period is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Type"
                :value.sync="target.type"
                :options="[
                  {
                    label: 'Choose Severity',
                    value: '',
                    selected: '',
                    disabled: true,
                  },
                  'option2',
                  'option3',
                  'option4',
                ]"
                :class="{ error: $v.target.type.$error }"
              />
            </CCol>
            <div v-if="$v.target.type.$error">
              <p v-if="!$v.target.type.required" class="errorMsg">
                Type is required
              </p>
            </div>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Amount"
                placeholder="0.000"
                v-model="target.amount"
                :class="{ error: $v.target.amount.$error }"
              />
            </CCol>
            <div v-if="$v.target.amount.$error">
              <p v-if="!$v.target.amount.required" class="errorMsg">
                Amount is required
              </p>
            </div>
          </CRow>
          <CRow>
            <CCol sm="12" md="12">
              <CTextarea
                label="Note"
                placeholder="Content..."
                v-model="target.detail"
              />
            </CCol>
          </CRow>
          <CButton
            block
            color="success"
            style="float: right; width: 100px"
            type="submit"
            >Save</CButton
          >
        </CCardBody>
      </form>
    </CCollapse>
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
  name: "TargetBranch",

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
        location: "",
        opening_date: "",
        closing_date: "",
        status: "",
      },
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
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
      target: {
        name: { required, minLength: minLength(4) },
        period: { required },
        type: { required },
        amount: { required },
      },
    };
  },
  created() {
    // Targets
    this.getAllTargets();
  },

  methods: {
    // Target
    getAllTargets() {
      this.url_data = this.$route.params.id;

      this.$http
        .get("/branch-target", {
          headers: {
            branchid: this.url_data,
          },
        })
        .then(({ data }) => {
          data.data.forEach((value, index) => {
            var data = {
              name: value.name,
              periodic: value.periodic,
              type: value.type,
              amount: value.amount,
              detail: value.detail,
            };
            this.targetList.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ path: "/branches" });
        });
    },
    storeTarget() {
      this.$v.target.$touch();
      if (!this.$v.target.$invalid) {
        let data = this.target;
        this.$http
          .post("branch-target", data, {
            headers: {
              branchid: this.url_data,
            },
          })
          .then((res) => {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Timing Added Successfully",
              timer: 3600,
            });
            this.$router.go();
          })
          .catch((error) => {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!Try Again",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      } else {
        this.submitStatus = "ERROR";
      }
    },
    targetToggleMethod() {
      if (this.targetToggle == "Add New Target") {
        this.targetToggle = "Go To Targets";
        this.isEditing = false;
      } else if (this.targetToggle == "Go To Targets") {
        this.targetToggle = "Add New Target";
      }
    },
  },
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>