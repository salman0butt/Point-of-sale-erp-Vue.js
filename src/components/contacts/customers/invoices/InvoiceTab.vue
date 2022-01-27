<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Invoices</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <CButton
                  @click="ToggleInvoice()"
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
                  <InvoiceIndex
                    module="customer"
                    ref="InvoiceRef"
                    @invoice-edit="InvoiceEdited"
                  />
                </CCollapse>
                <CCollapse :show="collapse">
                  <InvoiceForm
                    module="customer"
                    ref="InvoiceEditRef"
                    @invoice-updated="InvoiceUpdated"
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
import InvoiceIndex from "@/components/contacts/customers/invoices/InvoiceIndex";
import InvoiceForm from "@/components/contacts/customers/invoices/InvoiceForm";

export default {
  name: "InvoiceTab",
  components: { InvoiceIndex, InvoiceForm },
  data: () => ({
    toggleName: "Add New Invoice",
    collapse: false,
    collapse_table: true,
  }),

  methods: {
    ToggleInvoice() {
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Invoice") {
        this.toggleName = "Go To Invoices";
      } else if (this.toggleName == "Go To Invoices") {
        this.toggleName = "Add New Invoice";
      }
    },
    InvoiceUpdated() {
      this.ToggleInvoice();
      this.$refs.InvoiceRef.getInvoiceData();
    },
    InvoiceEdited(uuid) {
      this.ToggleInvoice();
      this.$refs.InvoiceEditRef.getEditData(uuid);
    },
    resetInvoiceForm() {
      this.$refs.InvoiceEditRef.resetForm();
    },
  },
};
</script>
