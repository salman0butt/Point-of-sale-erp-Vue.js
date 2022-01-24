<template>
  <div>
    <CCard>
      <CCardHeader> Report1 </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Filter1"
                    :options="options.filter1"
                    :value.sync="filter1"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="filter2"
                    :options="options.filter2"
                    :value.sync="filter2"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="margin-top: 30px"
                    >Genrate Report</CButton
                  >
                </CCol>
              </CRow>
              <hr />
              <div>Report Will show there</div>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "Report1",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    filter1: "",
    filter2: "",
    options: {
      filter1: [{ value: "", label: "Choose filter1", disabled: true, selected: "" }],
      filter2: [{ value: "", label: "Choose filter2", disabled: true, selected: "" }],
    },
  }),
  watch: {
    "salary.basic_salary"() {
      this.calculateSalary();
    },
    deep: true,
  },

  created() {},
  methods: {},
};
</script>
