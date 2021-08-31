<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branch : {{ form.name }}</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab active>
                <template slot="title">
                  {{ tabs[0] }}
                </template>
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
                        <CInput label="Telephone" v-model="form.tel" />
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
                        <CInput label="Mobile" v-model="form.mob" />
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
                      <CCol sm="6" md="4" class="pt-2">
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
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm="6" md="4" class="pt-2">
                        <CInput
                          label="Opening Date"
                          type="date"
                          v-model="form.opening_date"
                        />
                      </CCol>
                      <CCol sm="6" md="4" class="pt-2">
                        <CInput
                          label="Closing Date"
                          type="date"
                          v-model="form.closing_date"
                        />
                      </CCol>
                      <CCol sm="6" md="4" class="pt-2">
                        <CSelect
                          label="Status"
                          :options="status"
                          :value="form.status"
                        />
                      </CCol>
                    </CRow>

                    <CButton
                      progress
                      timeout="2000"
                      block
                      color="success"
                      style="float: right; width: 200px"
                      type="submit"
                      @click="saveAndExit = false"
                      >Save & Continue</CButton
                    >
                    <CButton
                      timeout="2000"
                      block
                      color="danger"
                      style="
                        float: right;
                        width: 140px;
                        margin-right: 20px;
                        margin-top: 0;
                      "
                      @click="saveAndExit = true"
                      type="submit"
                      >Save & Exit</CButton
                    >
                  </CCardBody>
                </form>
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs[1] }}
                </template>
                <CCardBody>
                  <CCardBody>
                    <CRow>
                      <CCol sm="6" md="3" class="pt-2">
                        <p>Day</p>
                      </CCol>
                      <CCol sm="6" md="3" class="pt-2">
                        <p>Status</p>
                      </CCol>
                      <CCol sm="6" md="2" class="pt-2">
                        <p>From</p>
                      </CCol>
                      <CCol sm="6" md="2" class="pt-2">
                        <p>To</p>
                      </CCol>
                    </CRow>
                  </CCardBody>

                  <CCardBody v-for="(item, index) in timelst" :key="item.date">
                    <CRow>
                      <CCol sm="6" md="3" class="pt-2">
                        <p>{{ item.day }}</p>
                      </CCol>
                      <CCol sm="6" md="3" class="pt-2">
                        <CSwitch
                          class="mx-1"
                          color="success"
                          :checked="item.status"
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
                    style="float: right; width: 100px; margin-top: 25px"
                    >Save</CButton
                  >
                </CCardBody>
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs[2] }}
                </template>
                <CCardBody>
                  <CRow>
                    <CCol sm="6" md="6" class="pt-2">
                      <CInput label="Name" />
                    </CCol>
                    <CCol sm="6" md="6" class="pt-2">
                      <CSelect
                        label="Period"
                        :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="6" md="6" class="pt-2">
                      <CSelect
                        label="Type"
                        :options="['option1', 'option2', 'option3', 'option4']"
                      />
                    </CCol>
                    <CCol sm="6" md="6" class="pt-2">
                      <CInput label="Amount" placeholder="0.000" />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="12" md="12">
                      <CTextarea label="Note" placeholder="Content..." />
                    </CCol>
                  </CRow>
                  <CButton
                    block
                    color="success"
                    style="float: right; width: 100px"
                    >Save</CButton
                  >
                </CCardBody>
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs[3] }}
                </template>
                <CCardBody>
                  <CRow>
                    <CCol sm="6" md="4" class="pt-2">
                      <CSelect
                        label="Channel"
                        :options="['option1', 'option2', 'option3', 'option4']"
                        :value.sync="mediaitem.channel"
                      />
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CInput label="Name/Account" v-model="mediaitem.name" />
                    </CCol>
                    <CCol sm="6" md="3" class="pt-2">
                      <CInput label="Amount" v-model="mediaitem.amount" />
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
                      {{ item.amount }}
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
                    >Save</CButton
                  >
                </CCardBody>
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

import { required, minLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "updateBranch",

  data() {
    return {
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
        { value: "inactive", label: "InActive" },
      ],
      url_data: null,
      timelst: [
        { day: "Sunday", status: false, time: [] },
        { day: "Monday", status: true, time: [] },
        { day: "Tuesday", status: true, time: [] },
        { day: "Wdnesday", status: true, time: [] },
        { day: "Thursday", status: true, time: [] },
        { day: "Friday", status: true, time: [] },
        { day: "Saturday", status: true, time: [] },
      ],
      mediaLst: [],
      mediaitem: { channel: "", name: "", amount: "" },
      tabs: ["General", "Timing", "Traget", "Social media"],
      activeTab: 1,
      usersData: [],
      details: [],
      collapseDuration: 0,
      errors: [],
    };
  },
  validations() {
    return {
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
    this.getGeneralDetail();
  },

  methods: {
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
          this.form.location = data.location;
          this.form.opening_date = data.opening_date;
          this.form.closing_date = data.closing_date;
          this.form.status = data.status;
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ path: "/branches" });
        });
    },

    Addtiming(index, from, to) {
      if (from == undefined || to == undefined) {
        return false;
      }
      var data = { from: from, to: to, id: index };
      this.timelst[index].time.push(data);
    },
    DelTiming(id, index) {
      this.timelst[id].time.splice(index, 1);
    },
    AddMedia() {
      if (
        this.mediaitem.channel == "" ||
        this.mediaitem.name == "" ||
        this.mediaitem.amount == ""
      ) {
        return false;
      }
      var data = {
        channel: this.mediaitem.channel,
        name: this.mediaitem.name,
        amount: this.mediaitem.amount,
      };
      this.mediaLst.push(data);
    },
    DelMedia(index) {
      this.mediaLst.splice(index, 1);
    },

    updateBranch() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        console.log(data.status);
        // this.$http
        //   .put("branches/cc64f7f2-eb6d-4ba3-94af-081516f80bbf", data)
        //   .then((res) => {
        //     this.$swal.fire({
        //       icon: "success",
        //       title: "Success",
        //       text: "Branch Updated Successfully",
        //       timer: 3600,
        //     });
        //     if (this.saveAndExit) {
        //       this.$router.push({ path: "/branches" });
        //     } else {
        //       alert("next page");
        //     }
        //     console.log(res);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
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
