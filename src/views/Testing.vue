<template>
  <div>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      v-on:vdropzone-sending="sendingEvent"
    ></vue-dropzone>
    <CIcon :content="$options.pencil" />
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { cilPencil } from "@coreui/icons";

export default {
  name: "app",
  pencil: cilPencil,
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: function () {
    return {
      dropzoneOptions: {
        autoProcessQueue: false,
        //////code for sending data
        // if data successfull added call this method

        //
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      console.log(file);
    },
  },
};
</script>
