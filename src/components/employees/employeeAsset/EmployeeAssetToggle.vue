<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeAsset()"
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
          <EmployeeAssetIndex
            ref="employeeAssetRef"
            @employee-asset-edit="employeeAssetEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeAssetForm
            ref="employeeAssetEditRef"
            @employee-asset-update="employeeAssetUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAssetIndex from "@/components/employees/employeeAsset/EmployeeAssetIndex";
import EmployeeAssetForm from "@/components/employees/employeeAsset/EmployeeAssetForm";

export default {
  name: "EmployeeAssetTab",
  components: { EmployeeAssetIndex, EmployeeAssetForm },
  data: () => ({
    toggleName: "Add New Asset",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeAsset() {
      this.resetEmployeeAssetForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Asset") {
        this.toggleName = "Go To Assets";
      } else if (this.toggleName == "Go To Assets") {
        this.toggleName = "Add New Asset";
      }
    },
    employeeAssetUpdate() {
      this.ToggleEmployeeAsset();
      // this.$refs.employeeAssetRef.updateTableData(data);
      this.$refs.employeeAssetRef.getEmployeeAsset();
    },
    employeeAssetEdit(uuid) {
      this.ToggleEmployeeAsset();
      this.$refs.employeeAssetEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeAssetForm() {
      this.$refs.employeeAssetEditRef.resetForm();
    },
  },
};
</script>
