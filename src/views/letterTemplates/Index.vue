<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Letter Templates </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/letterTemplates/create"
              style="float: right"
              >Create Letter Template</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <LetterTemplateIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import LetterTemplateIndex from "@/components/letterTemplates/LetterTemplateIndex";
export default {
  name: "IndexLetterTemplate",
  components: { LetterTemplateIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
