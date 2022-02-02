<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Quotations</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <CButton
                  @click="ToggleQuotation()"
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
                  <QuotationIndex
                    module="customer"
                    ref="QuotationRef"
                    @quotation-edit="QuotationEdited"
                  />
                </CCollapse>
                <CCollapse :show="collapse">
                  <QuotationForm
                    module="customer"
                    ref="QuotationEditRef"
                    @quotation-updated="QuotationUpdated"
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
import QuotationIndex from "@/components/contacts/customers/quotations/QuotationIndex";
import QuotationForm from "@/components/contacts/customers/quotations/QuotationForm";

export default {
  name: "QuotationTab",
  components: { QuotationIndex, QuotationForm },
  data: () => ({
    toggleName: "Add New Quotation",
    collapse: false,
    collapse_table: true,
  }),

  methods: {
    ToggleQuotation() {
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Quotation") {
        this.toggleName = "Go To Quotations";
      } else if (this.toggleName == "Go To Quotations") {
        this.toggleName = "Add New Quotation";
      }
    },
    QuotationUpdated() {
      this.ToggleQuotation();
      this.$refs.QuotationRef.getServerData();
    },
    QuotationEdited(uuid) {
      this.ToggleQuotation();
      this.$refs.QuotationEditRef.getEditData(uuid);
    },
    resetQuotationForm() {
      this.$refs.QuotationEditRef.resetForm();
    },
  },
};
</script>
