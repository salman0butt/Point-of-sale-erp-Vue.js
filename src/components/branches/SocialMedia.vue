<template>
  <div>
    <form @submit.prevent="storeMedia()">
      <CCardBody>
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CSelect
              label="Channel"
              :options="[
                {
                  label: 'Choose Channel',
                  disabled: true,
                  selected: '',
                  value: '',
                },
                'Facebook',
                'Instagram',
                'Twitter',
                'Whatsapp',
              ]"
              :value.sync="mediaitem.channel"
            />
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            <CInput label="Name" v-model="mediaitem.name" />
          </CCol>
          <CCol sm="6" md="3" class="pt-2">
            <CInput label="Link" v-model="mediaitem.link" />
          </CCol>
          <CCol sm="6" md="1" class="pt-2">
            <CButton
              block
              color="default"
              @click="AddMedia"
              style="
                width: 39px;
                border-radius: 35px;
                margin: auto;
                margin-top: 25px;
              "
              ><CIcon name="cil-plus"
            /></CButton>
          </CCol>
        </CRow>
        <CRow v-for="(item, index) in mediaLst" :key="item.channel">
          <CCol sm="6" md="4" class="pt-2">
            {{ item.channel }}
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            {{ item.name }}
          </CCol>
          <CCol sm="6" md="3" class="pt-2">
            {{ item.link }}
          </CCol>
          <CCol sm="6" md="1" class="pt-2">
            <CButton
              block
              color="default"
              style="width: 39px; border-radius: 35px; margin: auto"
              @click="DelMedia(index)"
              ><CIcon name="cil-minus"
            /></CButton>
          </CCol>
        </CRow>
        <CButton
          block
          color="success"
          style="float: right; width: 100px; margin-top: 25px"
          type="submit"
          >Save</CButton
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
  name: "SocialMediaBranch",

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
    return {};
  },
  created() {
    // Social Meida
    this.getAllMedia();
  },

  methods: {
    // All

    // Get Social Media
    getAllMedia() {
      this.url_data = this.$route.params.id;

      this.$http
        .get("/branch-social-media", {
          headers: {
            branchid: this.url_data,
          },
        })
        .then(({ data }) => {
          data.data.forEach((value, index) => {
            var data = {
              channel: value.type,
              name: value.name,
              link: value.link,
            };
            this.mediaLst.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ path: "/branches" });
        });
    },

    AddMedia() {
      if (
        this.mediaitem.channel == "" ||
        this.mediaitem.name == "" ||
        this.mediaitem.link == ""
      ) {
        return false;
      }
      var data = {
        channel: this.mediaitem.channel,
        name: this.mediaitem.name,
        link: this.mediaitem.link,
      };
      this.mediaLst.push(data);
    },
    DelMedia(index) {
      this.mediaLst.splice(index, 1);
    },
    storeMedia() {
      let data = this.mediaLst;
      if (data.length > 0) {
        this.$http
          .post("branch-social-media", data, {
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
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Add By Pressing Plus Button",
          footer: '<a href="">Why do I have this issue?</a>',
        });
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