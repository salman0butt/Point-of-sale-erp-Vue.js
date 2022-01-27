<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Notes</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <NoteForm module="customer" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import NoteForm from "@/components/contacts/customers/notes/NoteForm";
export default {
  name: "NoteTab",
  components: {
    NoteForm,
  },
  data: () => ({}),

  methods: {},
};
</script>
