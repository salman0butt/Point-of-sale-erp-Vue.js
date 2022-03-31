export const attachmentMixin = {
  data: function () {
    return {
      isEditing: false,
      saveAndExit: false,
      displayAttachment: [],
      form: {
        attachments: [],
      }
    }
  },
  methods: {
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Are You Sure You Want to Deleted This Attachment?",
icon: "warning",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.displayAttachment = this.displayAttachment.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                console.log(err);
              });
          }
        });
    },
    pickFile(e) {
      let files = e.target.files;
      let attachments = this.form.attachments;
      if(files && files.length){
        for (let i = 0; i < files.length; i++) {
          attachments.push(files[i]);
        }
     }
    }
  }
}
