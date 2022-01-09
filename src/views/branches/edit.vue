<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branch : {{ form.name }}</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" :active-tab="activeTab">
              <CTab>
                <template slot="title">
                  {{ tabs[0] }}
                </template>
                <GeneralBranch></GeneralBranch>
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs[1] }}
                </template>

                <TimingBranch></TimingBranch>
              </CTab>

              <!-- Targets -->
              <CTab>
                <template slot="title">
                  {{ tabs[2] }}
                </template>
                <TargetBranch></TargetBranch>
              </CTab>
              <!-- Social Media -->
              <CTab>
                <template slot="title">
                  {{ tabs[3] }}
                </template>
                <SocialMediaBranch></SocialMediaBranch>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BranchServices from "@/services/branches/BranchServices";
import GeneralBranch from "@/components/branches/General";
import TimingBranch from "@/components/branches/Timing";
import TargetBranch from "@/components/branches/Target";
import SocialMediaBranch from "@/components/branches/SocialMedia";

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
  name: "updateBranch",
  components: {
    GeneralBranch: GeneralBranch,
    TimingBranch: TimingBranch,
    TargetBranch: TargetBranch,
    SocialMediaBranch: SocialMediaBranch,
  },

  data() {
    return {
      //All
      tabs: [
        "General",
        //  "Timing",
        //   "Target",
        //    "Social media"
      ],
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
      //Timing
      storeTiming: {
        shiftname: {
          required,
          minLength: minLength(4),
        },
      },
      target: {
        name: { required, minLength: minLength(4) },
        period: { required },
        type: { required },
        amount: { required },
      },
    };
  },
  created() {},

  methods: {},
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>
