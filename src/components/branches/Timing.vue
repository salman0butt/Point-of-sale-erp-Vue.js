<template>
  <div>
    <!-- Timing -->

    <CButton
      @click="
        collapse = !collapse;
        collapse_table = !collapse_table;
        shiftToggleMethod();
      "
      ref="shiftToggleRef"
      color="primary"
      class="mb-2 mt-3"
      style="float: right"
    >
      {{ shiftToggle }}
    </CButton>
    <CCollapse :show="collapse_table">
      <CCardBody>
        <CCardBody>
          <CDataTable
            :items="shifts"
            :fields="fields"
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
                  <CButton @click="deleteShift(item.uuid)" color="danger"
                    >Delete</CButton
                  >
                </CButtonGroup>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCardBody>
    </CCollapse>

    <CCollapse :show="collapse">
      <div v-if="!isEditing">
        <form @submit.prevent="storeShift()">
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput
                  label="Shift Name"
                  ref="shiftname"
                  v-model="storeTiming.shiftname"
                  :class="{
                    error: $v.storeTiming.shiftname.$error,
                  }"
                />
                <div v-if="$v.storeTiming.shiftname.$error">
                  <p v-if="!$v.storeTiming.shiftname.required" class="errorMsg">
                    Shift name is required
                  </p>
                  <p
                    v-if="!$v.storeTiming.shiftname.minLength"
                    class="errorMsg"
                  >
                    Shift name should be at least 4 character
                  </p>
                </div>
              </CCol>
            </CRow>
            <CCardBody
              v-for="(item, index) in storeTiming.timelist"
              :key="item.date"
            >
              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <p>{{ item.day }}</p>
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CSwitch
                    class="mx-1"
                    color="success"
                    :checked="item.status"
                    @update:checked="item.status = !item.status"
                    shape="pill"
                  />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CInput type="time" v-model="form[item.day + 'from']" />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CInput type="time" v-model="form[item.day + 'to']" />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CButton
                    block
                    color="default"
                    @click="
                      Addtiming(
                        index,
                        form[item.day + 'from'],
                        form[item.day + 'to']
                      )
                    "
                    style="width: 39px; border-radius: 35px; margin: auto"
                    ><CIcon name="cil-plus"
                  /></CButton>
                </CCol>
              </CRow>
              <CRow v-for="(item, index) in item.time" :key="item.from">
                <CCol sm="6" md="3" class="pt-2"> </CCol>
                <CCol sm="6" md="3" class="pt-2"> </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  {{ item.from }}
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  {{ item.to }}
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CButton
                    block
                    color="default"
                    style="width: 39px; border-radius: 35px; margin: auto"
                    @click="DelTiming(item.id, index)"
                    ><CIcon name="cil-minus"
                  /></CButton>
                </CCol>
              </CRow>
            </CCardBody>
            <CButton
              block
              color="success"
              type="submit"
              style="float: right; width: 100px; margin-top: 25px"
              >Save</CButton
            >
          </CCardBody>
        </form>
      </div>
      <div v-else>
        <form @submit.prevent="updateShift()">
          <CInput v-model="updateTimingUuid" type="hidden" />
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput
                  label="Name"
                  ref="shiftname"
                  v-model="storeTiming.shiftname"
                  :class="{
                    error: $v.storeTiming.shiftname.$error,
                  }"
                />
                <div v-if="$v.storeTiming.shiftname.$error">
                  <p v-if="!$v.storeTiming.shiftname.required" class="errorMsg">
                    Shift name is required
                  </p>
                  <p
                    v-if="!$v.storeTiming.shiftname.minLength"
                    class="errorMsg"
                  >
                    Shift name should be at least 4 character
                  </p>
                </div>
              </CCol>
            </CRow>
            <CCardBody
              v-for="(item, index) in storeTiming.timelist"
              :key="item.date"
            >
              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <p>{{ item.day }}</p>
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CSwitch
                    class="mx-1"
                    color="success"
                    :checked="item.status"
                    @update:checked="item.status = !item.status"
                    shape="pill"
                  />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CInput type="time" v-model="form[item.day + 'from']" />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CInput type="time" v-model="form[item.day + 'to']" />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CButton
                    block
                    color="default"
                    @click="
                      Addtiming(
                        index,
                        form[item.day + 'from'],
                        form[item.day + 'to']
                      )
                    "
                    style="width: 39px; border-radius: 35px; margin: auto"
                    ><CIcon name="cil-plus"
                  /></CButton>
                </CCol>
              </CRow>
              <CRow v-for="(item, index) in item.time" :key="item.from">
                <CCol sm="6" md="3" class="pt-2"> </CCol>
                <CCol sm="6" md="3" class="pt-2"> </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  {{ item.from }}
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  {{ item.to }}
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CButton
                    block
                    color="default"
                    style="width: 39px; border-radius: 35px; margin: auto"
                    @click="DelTiming(item.id, index)"
                    ><CIcon name="cil-minus"
                  /></CButton>
                </CCol>
              </CRow>
            </CCardBody>
            <CButton
              block
              color="success"
              type="submit"
              style="float: right; width: 100px; margin-top: 25px"
              >Update</CButton
            >
          </CCardBody>
        </form>
      </div>
    </CCollapse>
  </div>
</template>
<script>
import { required, minLength, numeric } from "vuelidate/lib/validators";
const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
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
  name: "TimingBranch",

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
          { day: "Sunday", status: true, time: [] },
          { day: "Monday", status: true, time: [] },
          { day: "Tuesday", status: true, time: [] },
          { day: "Wednesday", status: true, time: [] },
          { day: "Thursday", status: true, time: [] },
          { day: "Friday", status: false, time: [] },
          { day: "Saturday", status: false, time: [] },
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
      //Timing
      storeTiming: {
        shiftname: {
          required,
          minLength: minLength(4),
        },
      },
    };
  },
  created() {
    // Timing
    this.getAllShifts();
  },

  methods: {
    // Timing.
    getAllShifts() {
      this.url_data = this.$route.params.id;
      this.$http
        .get("/branch-shifts", {
          params: { branch_uuid: this.url_data },
        })
        .then(({ data }) => {
          data.map((item, id) => {
            this.shifts.push({ ...item, id });
          });
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ path: "/branches" });
        });
    },
    shiftToggleMethod() {
      if (this.shiftToggle == "Add New Shift") {
        this.shiftToggle = "Go To Shifts";
        this.isEditing = false;
      } else if (this.shiftToggle == "Go To Shifts") {
        this.shiftToggle = "Add New Shift";
      }
    },
    Addtiming(index, from, to) {
      if (from == undefined || to == undefined) {
        return false;
      }
      var data = { from: from, to: to, id: index };
      this.storeTiming.timelist[index].time.push(data);
    },
    DelTiming(id, index) {
      this.storeTiming.timelist[id].time.splice(index, 1);
    },
    storeShift() {
      this.$v.storeTiming.$touch();
      if (!this.$v.storeTiming.$invalid) {
        let data = this.storeTiming;
        this.$http
          .post("branch-shifts", data)
          .then((res) => {
            this.shifts.push(res.data);
            console.log(this.shifts);
            this.$refs["shiftToggleRef"].click();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Timing Added Successfully",
              timer: 3600,
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
    editShift(uuid) {
      this.isEditing = true;
      this.$http
        .get("/branch-shifts/" + uuid)
        .then((res) => {
          this.$refs["shiftToggleRef"].click();
          this.isEditing = true;
          this.updateTimingUuid = uuid;
          this.storeTiming.shiftname = res.data.name;
          let timings = res.data.timings;
          timings.forEach((value, index) => {
            this.storeTiming.timelist[index].day = value.day;
            this.storeTiming.timelist[index].status = value.status;
            this.storeTiming.timelist[index].time = value.time;
          });
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
    updateShift() {
      this.$v.storeTiming.$touch();
      if (!this.$v.storeTiming.$invalid) {
        let data = this.storeTiming;
        this.$http
          .put("branch-shifts/" + this.updateTimingUuid, data)
          .then((res) => {
            this.$refs["shiftToggleRef"].click();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Timing Updated Successfully",
              timer: 3600,
            });
            this.shifts.map((item, id) => {
              if (item.uuid == this.updateTimingUuid) {
                item.name = res.data.name;
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
    deleteShift(uuid) {
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
              .delete("branch-shifts/" + this.deleteRows)
              .then((res) => {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Shift Deleted Successfully",
                  timer: 3600,
                });
                this.shifts.map((item, id) => {
                  if (item.uuid == uuid) {
                    this.shifts.splice(id, 1);
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
  },
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>
