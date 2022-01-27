<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Notes</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <CButton
                  @click="ToggleNote()"
                  color="primary"
                  class="mb-2 mt-3"
                  style="float: right"
                >
                  {{ toggleName }}
                </CButton>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12" lg="12">
                <CCollapse :show="collapse_table">
                  <NoteIndex module="customer" ref="NoteRef" @NoteEdit="NoteEdited" />
                </CCollapse>
                <CCollapse :show="collapse">
                  <NoteForm
                    module="customer"
                    ref="NoteEditRef"
                    @NoteCreated="NoteCreatedSend"
                  />
                </CCollapse>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import NoteIndex from "@/components/contacts/customers/notes/NoteIndex";
import NoteForm from "@/components/contacts/customers/notes/NoteForm";

export default {
  name: "NoteTab",
  components: { NoteIndex, NoteForm },
  data: () => ({
    toggleName: "Add New Note",
    collapse: false,
    collapse_table: true,
  }),

  methods: {
    ToggleNote() {
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Note") {
        this.toggleName = "Go To Notees";
      } else if (this.toggleName == "Go To Notees") {
        this.toggleName = "Add New Note";
      }
    },
    NoteCreatedSend() {
      this.ToggleNote();
      this.$refs.NoteRef.getNoteData();
    },
    NoteEdited(uuid) {
      this.ToggleNote();
      this.$refs.NoteEditRef.getEditData(uuid);
    },
    resetNoteForm() {
      this.$refs.NoteEditRef.resetForm();
    },
  },
};
</script>
