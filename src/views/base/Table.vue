<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    
    <CCardBody>
      <CCard>
        <table>
          <tr>
            <th style="border: 1px solid #dddddd;text-align:center;">Company</th>
            <th style="border: 1px solid #dddddd;text-align:center;">Contact</th>
            <th style="border: 1px solid #dddddd;text-align:center;">Country</th>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd;text-align:center;">Alfreds </td>
            <td style="border: 1px solid #dddddd;text-align:center;">Maria </td>
            <td style="border: 1px solid #dddddd;text-align:center;">Germany</td>
          </tr>
        </table>
      </CCard>
      <CProgress
          :value="25"
          color="success"
          :striped="striped"
          class="mb-2"
        />
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
      >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
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
        return ['username', 'registered', 'role', 'status']
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
