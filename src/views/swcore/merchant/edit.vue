<template>
  <b-row class="match-height">
    <b-col lg="12">
      <form-layout-horizontal />
    </b-col>
    <b-col lg="12">
      <formLayoutMerchant />
    </b-col>
    <b-col lg="12">
      <form-layout-horizontal-icon />
    </b-col>
    <b-col lg="12">
      <form-layout-vertical />
    </b-col>
    <b-col lg="12">
      <form-layout-vertical-icon />
    </b-col>
    <b-col cols="12">
      <form-layout-multiple-column />
    </b-col>
    <b-col lg="12">
      <form-layout-datalist-helper />
    </b-col>
    <b-col lg="12">
      <form-layout-feedback-helper />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import FormLayoutHorizontal from '@/views/forms/form-layout/FormLayoutHorizontal.vue'
import FormLayoutMerchant from '@/views/forms/form-layout/FormLayoutMerchant.vue'
import FormLayoutHorizontalIcon from '@/views/forms/form-layout/FormLayoutHorizontalIcon.vue'
import FormLayoutVertical from '@/views/forms/form-layout/FormLayoutVertical.vue'
import FormLayoutVerticalIcon from '@/views/forms/form-layout/FormLayoutVerticalIcon.vue'
import FormLayoutMultipleColumn from '@/views/forms/form-layout/FormLayoutMultipleColumn.vue'
import FormLayoutDatalistHelper from '@/views/forms/form-layout/FormLayoutDatalistHelper.vue'
import FormLayoutFeedbackHelper from '@/views/forms/form-layout/FormLayoutFeedbackHelper.vue'

export default {
  components: {
    BRow,
    BCol,

    FormLayoutHorizontal,
    FormLayoutMerchant,
    FormLayoutHorizontalIcon,
    FormLayoutVertical,
    FormLayoutVerticalIcon,
    FormLayoutMultipleColumn,
    FormLayoutDatalistHelper,
    FormLayoutFeedbackHelper,
  },
}
</script>
