<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        Detail
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
         table-filter
        items-per-page-select
        :fields="fields"
        :items-per-page="10"
        :dark="dark"
        pagination
        border
        style="text-align:center"
        sorter
      >
        <template #Target="{item}">
          <td style="text-align:center">
            {{item.realtime_target}}
          </td>
        </template>
        <template #CAP="{item}">
          <td style="text-align:center">
            {{item.EFF}}
          </td>
        </template>
        <template #Actual="{item}">
          <td style="text-align:center">
            {{item.Actual}}
          </td>
        </template>
        <template #Machine="{item}" >
          <td @click="SelJob(item.Machine)" style="text-align:center">
            {{item.machine_id}}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['Machine', 'Target', 'Actual', 'CAP', 'NP']
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
  }
}
</script>
