<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Notes</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <NoteForm module="customer" :readOnly="readOnly" />
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
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    NoteForm,
  },
};
</script>
