<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('store', 'employee-transfers')"
              class="btn btn-success"
              to="/transfers/create"
              >Create Transfers</router-link
            >
            <TransferIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TransferIndex from "@/components/transfers/TransferIndex";
export default {
  name: "IndexTransfer",
  components: { TransferIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
