<template>
  <div>
    <CRow v-for="(terminal, k) in terminals" :key="k">
      <CCol sm="6" md="6" class="pt-2">
        <CInput label="Name" v-model="terminal.name" :disabled="terminal.isDisabled" />
      </CCol>
      <CCol sm="2" md="2" class="pt-2">
        <span class="midler"
          >((<a @click="removeRow(k)" class="del-record">Delete</a>
          <span v-if="terminal.uuid"
            >- <a class="edit-record" @click="editRow(k)">Edit</a></span
          >))</span
        >
      </CCol>
    </CRow>
    <i class="thumb" @click="addTerminal()"
      ><CIcon :content="$options.cibAddthis" /> Add Terminal</i
    >
  </div>
</template>

<script>
import { cilTrash, cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
export default {
  name: "Terminal",
  cilTrash,
  cibAddthis,
  cisMinusSquare,
  data() {
    return {
      terminals: [
        { uuid: "asdasdasdasassdfsdf", name: "Terminal1", isDisabled: true },
        { uuid: "werwerdasdasdasdwer", name: "Terminal2", isDisabled: true },
      ],
    };
  },
  methods: {
    addTerminal() {
      this.terminals.push({ uuid: "", name: "", isDisabled: false });
    },
    editRow(k) {
      this.terminals[k].isDisabled = !this.terminals[k].isDisabled;
    },
    removeRow(index) {
      this.terminals.splice(index, 1);
    },
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
.del-btn {
  background: transparent;
  height: fit-content;
  margin-top: 2rem;
}
.thumb {
  cursor: pointer;
}
</style>
