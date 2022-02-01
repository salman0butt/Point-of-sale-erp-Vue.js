export const tableMixin = {
  data: function () {
    return {
      activePage: 1,
      pages: 0,
      perPage: 10,
      deleteRows: [],
    }
  },
  methods: {
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        this.loading = false;
        const agent = this.$refs.externalAgent;
        this.data = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getData("", this.perPage);
    },
    getServerData(Service, page, per_page) {
      this.$store.commit("set_loader");
      Service.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.data = [];
            if (data.data) {
              data.data.map((item, id) => {
                this.data.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }
            this.$store.commit("close_loader");
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          this.errorHandler(err.status);
          console.log(err);
        });
    },
    deleteData(Service, uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Service.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$store.commit("set_loader");
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Record Deleted Successfully",
                    timer: 3600,
                  });
                  this.data = this.data.filter((item) => item.uuid != uuid);
                  this.deleteRows = [];
                  this.getData(this.activePage, this.perPage);
                  this.$store.commit("close_loader");
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
          }
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.data[item.id]._selected);
      this.$set(this.data[item.id], "_selected", !val);
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getData(this.activePage, this.perPage);
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },

}
