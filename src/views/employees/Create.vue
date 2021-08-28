<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Add Employee </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Fullname" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect label="Gender" :options="['Male', 'Female']" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect label="Martial Status" :options="['Single', 'Married']" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Phone" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Email" type="email" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="DOB" type="date" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Nationality" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Address" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Manager" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="CPR Expiry" type="date" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CSelect label="Status" :options="['Active', 'Deactive']" />
              </CCol>
            </CRow>
            <CButton block color="success" style="float: right; width: 100px"
              >Save</CButton
            >
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "AddEmployee",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
