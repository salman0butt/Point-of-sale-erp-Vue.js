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
                  <CButton @click="editTarget(item.uuid)" color="warning"
                    >Edit
                  </CButton>
                  <CButton @click="deleteTarget(item.uuid)" color="danger"
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
      <div v-if="!isEditing">
        <form @submit.prevent="storeTarget()">
          <br />
          <br />
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
              <!-- <CCol sm="6" md="6" class="pt-2">
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
                <div v-if="$v.target.type.$error">
                  <p v-if="!$v.target.type.required" class="errorMsg">
                    Type is required
                  </p>
                </div>
              </CCol> -->

              <CCol sm="6" md="6" class="pt-2">
                <CInput
                  label="Amount"
                  type="number"
                  step="any"
                  placeholder="0.000"
                  v-model="target.amount"
                  :class="{ error: $v.target.amount.$error }"
                />
                <div v-if="$v.target.amount.$error">
                  <p v-if="!$v.target.amount.required" class="errorMsg">
                    Amount is required
                  </p>
                </div>
              </CCol>
              <CCol sm="6" md="6" class="pt-2">
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
      </div>
      <div v-else>
        <form @submit.prevent="updateTarget()">
          <CInput v-model="target.uuid" type="hidden"></CInput>
          <br />
          <br />
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
                <CInput
                  label="Amount"
                  type="number"
                  step="any"
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
              <CCol sm="6" md="6" class="pt-2">
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
              >Update</CButton
            >
          </CCardBody>
        </form>
      </div>
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
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "periodic", label: "Periodic", _style: "min-width:15%;" },
  // { key: "type", label: "Type", _style: "min-width:15%;" },
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

      // Target
      fields2,
      collapse_target: false,
      collapse_target_table: true,
      targetToggle: "Add New Target",
      targetList: [],
      target: {
        name: "",
        period: "",
        amount: "",
        detail: "",
        uuid: "",
      },
    };
  },
  validations() {
    return {
      target: {
        name: { required, minLength: minLength(4) },
        period: { required },
        amount: { required },
      },
    };
  },
  created() {
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
              // type: value.type,
              amount: value.amount,
              detail: value.detail,
              uuid: value.uuid,
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
              text: "Target Added Successfully",
              timer: 3600,
            });
            var data = {
              name: res.data.name,
              periodic: res.data.periodic,
              type: res.data.type,
              amount: res.data.amount,
              detail: res.data.detail,
            };
            this.targetList.push(data);
            this.$refs.targetToggleRef.click();
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
    deleteTarget(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http
              .delete("/branch-target/" + this.deleteRows)
              .then((res) => {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Target Deleted Successfully",
                  timer: 3600,
                });
                this.targetList.map((item, id) => {
                  if (item.uuid == uuid) {
                    this.targetList.splice(id, 1);
                  }
                });
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
          }
        });
    },
    editTarget(uuid) {
      this.$refs["targetToggleRef"].click();

      this.$http
        .get("/branch-target/" + uuid)
        .then((res) => {
          this.isEditing = true;
          this.target.uuid = res.data.uuid;
          this.target.name = res.data.name;
          this.target.period = res.data.periodic;
          this.target.type = res.data.type;
          this.target.amount = res.data.amount;
          this.target.detail = res.data.detail;
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    },
    updateTarget() {
      this.$v.target.$touch();
      if (!this.$v.target.$invalid) {
        let data = this.target;
        this.$http
          .put("/branch-target/" + this.target.uuid, data)
          .then((res) => {
            this.$refs.targetToggleRef.click();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Target Updated Successfully",
              timer: 3600,
            });
            // console.log(res.data);
            this.targetList.map((item, id) => {
              if (item.uuid == this.target.uuid) {
                item.name = res.data.name;
                item.periodic = res.data.periodic;
                // item.type = res.data.type;
                item.amount = res.data.amount;
                item.detail = res.data.detail;
              }
            });
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
  },
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>