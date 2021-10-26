<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/letterTemplates/create"
              >Create Letter Templates</router-link
            >
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
