<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeDiscount()"
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
          <EmployeeDiscountIndex
            ref="employeeDiscountRef"
            @employee-target-edit="employeeDiscountEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeDiscountForm
            ref="employeeDiscountEditRef"
            @employee-target-update="employeeDiscountUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDiscountIndex from "@/components/employees/employeeDiscount/EmployeeDiscountIndex";
import EmployeeDiscountForm from "@/components/employees/employeeDiscount/EmployeeDiscountForm";

export default {
  name: "EmployeeDiscountTab",
  components: { EmployeeDiscountIndex, EmployeeDiscountForm },
  data: () => ({
    toggleName: "Add New Discount",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeDiscount() {
      this.resetEmployeeDiscountForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Discount") {
        this.toggleName = "Go To Discounts";
      } else if (this.toggleName == "Go To Discounts") {
        this.toggleName = "Add New Discount";
      }
    },
    employeeDiscountUpdate(data) {
      this.ToggleEmployeeDiscount();
      // this.$refs.employeeDiscountRef.updateTableData(data);
      this.$refs.employeeDiscountRef.getEmployeeDiscount();
    },
    employeeDiscountEdit(uuid) {
      this.ToggleEmployeeDiscount();
      this.$refs.employeeDiscountEditRef.getEditData(uuid);
    },
    resetEmployeeDiscountForm() {
      this.$refs.employeeDiscountEditRef.resetForm();
    },
  },
};
</script>
