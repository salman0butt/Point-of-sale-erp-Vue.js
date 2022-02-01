export const formMixin = {
  data: function () {
    return {
      isEditing: false,
      saveAndExit: false,
    }
  },
  methods: {
    toggleSaveAndExit(val) {
      this.saveAndExit = val;
    }
  }
}
