<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleExperianceCertifcate()"
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
          <ExperianceCertifcateIndex
            ref="experianceCertifcateRef"
            @employee-experiance-certifcate-edit="experianceCertifcateEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <ExperianceCertifcateForm
            ref="experianceCertifcateEditRef"
            @employee-experiance-certifcate-update="experianceCertifcateUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ExperianceCertifcateIndex from "@/components/experianceCertifcate/ExperianceCertifcateIndex";
import ExperianceCertifcateForm from "@/components/experianceCertifcate/ExperianceCertifcateForm";

export default {
  name: "ExperianceCertifcateToggle",
  components: { ExperianceCertifcateIndex, ExperianceCertifcateForm },
  data: () => ({
    toggleName: "Add New Experiance Certifcate",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleExperianceCertifcate() {
      this.resetExperianceCertifcateForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Experiance Certifcate") {
        this.toggleName = "Go To Experiance Certifcates";
      } else if (this.toggleName == "Go To Experiance Certifcates") {
        this.toggleName = "Add New Experiance Certifcate";
      }
    },
    experianceCertifcateUpdate() {
      this.ToggleExperianceCertifcate();
      // this.$refs.experianceCertifcateRef.updateTableData(data);
      this.$refs.experianceCertifcateRef.getExperianceCertifcate();
    },
    experianceCertifcateEdit(uuid) {
      this.ToggleExperianceCertifcate();
      this.$refs.experianceCertifcateEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetExperianceCertifcateForm() {
      this.$refs.experianceCertifcateEditRef.resetForm();
    },
  },
};
</script>
