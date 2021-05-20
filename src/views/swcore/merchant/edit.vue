<template>
  <b-row class="match-height">
    <b-col lg="12">
      <formLayoutMerchant />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import FormLayoutMerchant from './EditForm.vue'

export default {
  components: {
    BRow,
    BCol,
    FormLayoutMerchant,
  },
}
</script>
