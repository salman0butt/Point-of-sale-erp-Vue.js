<template>
  <CCard style="text-align:center">
    <CCardHeader>
      <slot name="header">
        <b>Jobs List</b>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        table-filter
        items-per-page-select
        :items="items"
        :fields="fields"
        :items-per-page="10"
        :dark="dark"
        pagination
        border
        sorter
      >
        <template #Job_No="{item}">
          <td @click="ToJobDetail(item.Job_No)" style="text-align:center">
            {{item.Job_No}}
          </td>
        </template>
        <template #Job_Date="{item}">
          <td style="text-align:center">
            {{item.Job_Date}}
          </td>
        </template>
        <template #Machine="{item}">
          <td style="text-align:center">
            {{item.Machine}}
          </td>
        </template>
        <template #Starting_Date="{item}">
          <td style="text-align:center">
            {{item.Starting_Date}}
          </td>
        </template>
        <template #Starting_Time="{item}">
          <td style="text-align:center">
            {{item.Starting_Time}}
          </td>
        </template>
        <template #Ending_Date="{item}">
          <td style="text-align:center">
            {{item.Ending_Date}}
          </td>
        </template>
        <template #Ending_Time="{item}">
          <td style="text-align:center">
            {{item.Ending_Time}}
          </td>
        </template>
        <template #Status="{item}">
          <td style="text-align:center">
            {{item.Status}}
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
        return ['Job_No', 'Job_Date', 'Machine', 'Starting_Date', 'Starting_Time', 'Ending_Date', 'Ending_Time', 'Status']
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
    },
    ToJobDetail(val){
      this.$router.push("/jobdetail/"+val);     
    },
  }
}
</script>
