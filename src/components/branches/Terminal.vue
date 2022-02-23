<template>
  <div>
    <CRow v-for="(terminal, k) in terminals" :key="k">
      <CCol sm="6" md="6" class="pt-2">
        <CInput label="Name" v-model="terminal.name" disabled />
      </CCol>
      <CCol sm="2" md="2" class="pt-2">
        <span class="midler"
          >((<a href="#" class="del-record">Delete</a>
          -
          <a href="#" class="edit-record">Edit</a>))</span
        >
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "Terminal",
  data() {
    return {
      terminals: [{ name: "Terminal1" }, { name: "Terminal2" }],
    };
  },
};
</script>
<style scoped>
.edit-record {
  color: green !important;
  cursor: pointer;
}
.del-record {
  color: red !important;
  cursor: pointer;
}
.midler {
  position: relative;
  top: 2rem;
}
</style>
