<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Branch : {{ form.name }}</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" :active-tab="activeTab">
              <!-- General -->
              <CTab>
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
                          :value.sync="form.status"
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
                      >Save & Continue
                    </CButton>
                    <CButton
                      progress
                      timeout="2000"
                      block
                      style="
                        float: right;
                        width: 140px;
                        margin-right: 20px;
                        margin-top: 0;
                      "
                      @click="saveAndExit = true"
                      type="submit"
                      >Save</CButton
                    >
                  </CCardBody>
                </form>
              </CTab>
              <!-- Timing -->
              <CTab>
                <template slot="title">
                  {{ tabs[1] }}
                </template>
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
                            <CInputCheckbox
                              @update:checked="() => check(item)"
                              custom
                            />
                          </td>
                        </template>

                        <template #actions="{ item }">
                          <td>
                            <CButtonGroup>
                              <CButton
                                @click="editShift(item.uuid)"
                                color="warning"
                                >Edit</CButton
                              >
                              <CButton
                                @click="deleteRow(item.uuid)"
                                color="danger"
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
                              label="Name"
                              ref="shiftname"
                              v-model="storeTiming.shiftname"
                              :class="{
                                error: $v.storeTiming.shiftname.$error,
                              }"
                            />
                            <div v-if="$v.storeTiming.shiftname.$error">
                              <p
                                v-if="!$v.storeTiming.shiftname.required"
                                class="errorMsg"
                              >
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
                              <CInput
                                type="time"
                                v-model="form[item.day + 'from']"
                              />
                            </CCol>
                            <CCol sm="6" md="2" class="pt-2">
                              <CInput
                                type="time"
                                v-model="form[item.day + 'to']"
                              />
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
                                style="
                                  width: 39px;
                                  border-radius: 35px;
                                  margin: auto;
                                "
                                ><CIcon name="cil-plus"
                              /></CButton>
                            </CCol>
                          </CRow>
                          <CRow
                            v-for="(item, index) in item.time"
                            :key="item.from"
                          >
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
                                style="
                                  width: 39px;
                                  border-radius: 35px;
                                  margin: auto;
                                "
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
                    update column
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
                              <p
                                v-if="!$v.storeTiming.shiftname.required"
                                class="errorMsg"
                              >
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
                              <CInput
                                type="time"
                                v-model="form[item.day + 'from']"
                              />
                            </CCol>
                            <CCol sm="6" md="2" class="pt-2">
                              <CInput
                                type="time"
                                v-model="form[item.day + 'to']"
                              />
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
                                style="
                                  width: 39px;
                                  border-radius: 35px;
                                  margin: auto;
                                "
                                ><CIcon name="cil-plus"
                              /></CButton>
                            </CCol>
                          </CRow>
                          <CRow
                            v-for="(item, index) in item.time"
                            :key="item.from"
                          >
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
                                style="
                                  width: 39px;
                                  border-radius: 35px;
                                  margin: auto;
                                "
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
              </CTab>
              <!-- Targets -->
              <CTab>
                <template slot="title">
                  {{ tabs[2] }}
                </template>

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
                            <CInputCheckbox
                              @update:checked="() => check(item)"
                              custom
                            />
                          </td>
                        </template>

                        <template #actions="{ item }">
                          <td>
                            <CButtonGroup>
                              <CButton
                                @click="editShift(item.uuid)"
                                color="warning"
                                >Edit</CButton
                              >
                              <CButton
                                @click="deleteRow(item.uuid)"
                                color="danger"
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
                            <p
                              v-if="!$v.target.name.minLength"
                              class="errorMsg"
                            >
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
                            <p
                              v-if="!$v.target.period.required"
                              class="errorMsg"
                            >
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
              </CTab>
              <!-- Social Media -->
              <CTab>
                <template slot="title">
                  {{ tabs[3] }}
                </template>
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

  data() {
    return {
      //All
      tabs: ["General", "Timing", "Target", "Social media"],
      activeTab: 0,
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
      // General
      form: {
        name: { required, minLength: minLength(4) },
        address: { required, minLength: minLength(4) },
        area: { required, minLength: minLength(4) },
        tel: { required, numeric, minLength: minLength(8) },
        mob: { required, minLength: minLength(8) },
      },

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

      // socaial media
      storeSocialMedia() {},
    };
  },
  created() {
    // General
    this.getGeneralDetail();

    // Timing
    this.getAllShifts();

    // Targets
    this.getAllTargets();

    // Social Meida
    this.getAllMedia();
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
          this.form.location = data.location;
          this.form.opening_date = data.opening_date;
          this.form.closing_date = data.closing_date;
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
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Branch Updated Successfully",
              timer: 3600,
            });
            if (!this.saveAndExit) {
              this.activeTab = 1;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // Timing.
    getAllShifts() {
      this.url_data = this.$route.params.id;
      this.$http
        .get("/branch-shifts")
        .then(({ data }) => {
          data.data.map((item, id) => {
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
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Timing Updated Successfully",
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
