<script>
export default {
  name: "Upload",
  data() {
    return {
      error: "",
      files: [],
      dropped: 0,
      Imgs: [],
    };
  },
  props: {
    max: Number,
    uploadMsg: String,
    maxError: String,
    fileError: String,
    clearAll: String,
  },
  methods: {
    dragOver() {
      this.dropped = 2;
    },
    dragLeave() {},
    drop(e) {
      let status = true;
      let files = Array.from(e.dataTransfer.files);
      if (e && files) {
        files.forEach((file) => {
          if (file.type.startsWith("image") === false) status = false;
        });
        if (status == true) {
          if (this.$props.max && files.length + this.files.length > this.$props.max) {
            this.error = this.$props.maxError
              ? this.$props.maxError
              : `Maximum files is` + this.$props.max;
          } else {
            this.files.push(...files);
            this.previewImgs();
          }
        } else {
          this.error = this.$props.fileError
            ? this.$props.fileError
            : `Unsupported file type`;
        }
      }
      this.dropped = 0;
    },
    append() {
      this.$refs.uploadInput.click();
    },
    readAsDataURL(file) {
      return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function () {
          resolve(fr.result);
        };
        fr.onerror = function () {
          reject(fr);
        };
        fr.readAsDataURL(file);
      });
    },
    deleteImg(index) {
      this.Imgs.splice(index, 1);
      this.files.splice(index, 1);
      this.$emit("changed", this.files);
      this.$refs.uploadInput.value = null;
    },
    previewImgs(event) {
      if (
        this.$props.max &&
        event &&
        event.currentTarget.files.length + this.files.length > this.$props.max
      ) {
        this.error = this.$props.maxError
          ? this.$props.maxError
          : `Maximum files is` + this.$props.max;
        return;
      }
      if (this.dropped == 0) this.files.push(...event.currentTarget.files);
      this.error = "";
      this.$emit("changed", this.files);
      let readers = [];
      if (!this.files.length) return;
      for (let i = 0; i < this.files.length; i++) {
        // console.log(this.files);
        if (this.files[i].type === "application/pdf") {
          readers.push({
            name: this.files[i].name,
            src: require("/public/img/images/pdf-logo.png"),
          });
        } else {
          readers.push({
            name: this.files[i].name,
            src: this.readAsDataURL(this.files[i]),
          });
        }
      }
      Promise.all(readers).then((values) => {
        this.Imgs = values;
      });
    },
    reset() {
      this.$refs.uploadInput.value = null;
      this.Imgs = [];
      this.files = [];
      this.$emit("changed", this.files);
    },
  },
};
</script>

<template>
  <div
    class="container"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <div class="drop" v-show="dropped == 2"></div>
    <!-- Error Message -->
    <div v-show="error" class="error">
      {{ error }}
    </div>

    <!-- To inform user how to upload image -->
    <div v-show="Imgs.length == 0" class="beforeUpload">
      <input
        type="file"
        style="z-index: 1"
        accept="application/pdf"
        ref="uploadInput"
        @change="previewImgs"
        multiple
      />
      <svg
        width="100px"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 460 460"
        style="enable-background: new 0 0 460 460"
        xml:space="preserve"
      >
        <g id="XMLID_228_">
          <path
            id="XMLID_229_"
            style="fill: #ffae46"
            d="M230,0C102.974,0,0,102.975,0,230c0,99.311,62.943,183.919,151.112,216.112l295-295   C413.919,62.943,329.311,0,230,0z"
          />
          <path
            id="XMLID_230_"
            style="fill: #fe843f"
            d="M446.112,151.112L360,65L100,395l51.112,51.112   C175.717,455.096,202.285,460,230,460c127.026,0,230-102.975,230-230C460,202.286,455.096,175.717,446.112,151.112z"
          />
          <polygon
            id="XMLID_231_"
            style="fill: #fc5a37"
            points="210,85 190,85 190,65 200,55 210,65  "
          />
          <polygon
            id="XMLID_232_"
            style="fill: #7be3ff"
            points="100,375 100,395 230,395 240,385 230,375 165,365  "
          />
          <polygon
            id="XMLID_233_"
            style="fill: #e0f8ff"
            points="100,355 100,375 230,375 240,365 230,355 165,345  "
          />
          <polygon
            id="XMLID_235_"
            style="fill: #ffffff"
            points="100,65 100,355 230,355 240,210 230,65  "
          />
          <polygon
            id="XMLID_236_"
            style="fill: #48d9ff"
            points="230,375 230,395 360,395 360,375 295,365  "
          />
          <polygon
            id="XMLID_237_"
            style="fill: #adeeff"
            points="230,355 230,375 360,375 360,355 295,345  "
          />
          <rect
            id="XMLID_238_"
            x="280"
            y="275"
            style="fill: #7be3ff"
            width="80"
            height="80"
          />
          <polygon
            id="XMLID_239_"
            style="fill: #e0f8ff"
            points="230,65 230,355 280,355 360,275 360,65  "
          />
          <polygon
            id="XMLID_240_"
            style="fill: #a8cfff"
            points="160,156.25 160,176.25 230,176.25 240,166.25 230,156.25  "
          />
          <polygon
            id="XMLID_241_"
            style="fill: #a8cfff"
            points="160,196.25 160,216.25 230,216.25 240,206.25 230,196.25  "
          />
          <polygon
            id="XMLID_242_"
            style="fill: #a8cfff"
            points="160,236.25 160,256.25 230,256.25 240,246.25 230,236.25  "
          />
          <rect
            id="XMLID_243_"
            x="230"
            y="156.25"
            style="fill: #73a7e6"
            width="70"
            height="20"
          />
          <rect
            id="XMLID_244_"
            x="230"
            y="196.25"
            style="fill: #73a7e6"
            width="70"
            height="20"
          />
          <rect
            id="XMLID_245_"
            x="230"
            y="236.25"
            style="fill: #73a7e6"
            width="70"
            height="20"
          />
          <polygon
            id="XMLID_307_"
            style="fill: #adeeff"
            points="280,275 280,355 360,275  "
          />
          <path
            id="XMLID_308_"
            style="fill: #fc5a37"
            d="M240,135c-16.542,0-30-13.458-30-30V85h20v20c0,5.514,4.486,10,10,10   s10-4.486,10-10V65c0-11.028-8.972-20-20-20s-20,8.972-20,20h-20c0-22.056,17.944-40,40-40s40,17.944,40,40v40   C270,121.542,256.542,135,240,135z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>

      <p class="mainMessage">
        {{ uploadMsg ? uploadMsg : "Click to upload or drop your attachments here" }}
      </p>
    </div>
    <div class="imgsPreview" v-show="Imgs.length > 0">
      <button type="button" class="clearButton" @click="reset">
        {{ clearAll ? clearAll : "Clear All" }}
      </button>
      <div class="imageHolder" v-for="(img, i) in Imgs" :key="i">
        <img v-if="img.src" :src="img.src" />
        <p>{{ img.name }}</p>
        <span class="delete" style="color: white" @click="deleteImg(--i)">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
        <div class="plus" @click="append" v-if="++i == Imgs.length">+</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f7fafc;
  border: 0.5px solid #a3a8b1;
  border-radius: 10px;
  padding: 15px;
  position: relative;
}
.drop {
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
  position: absolute;
  background-color: #f4f6ff;
  left: 0;
  border: 3px dashed #a3a8b1;
}
.error {
  text-align: center;
  color: red;
  font-size: 15px;
}
.beforeUpload {
  position: relative;
  text-align: center;
}
.beforeUpload input {
  width: 100%;
  margin: auto;
  height: 100%;
  opacity: 0;
  position: absolute;
  background: red;
  display: block;
}
.beforeUpload input:hover {
  cursor: pointer;
}
.beforeUpload .icon {
  width: 150px;
  margin: auto;
  display: block;
}
.imgsPreview .imageHolder {
  width: 150px;
  height: 150px;
  background: #fff;
  position: relative;
  border-radius: 10px;
  margin: 5px 5px;
  display: inline-block;
}
.imgsPreview .imageHolder img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.imgsPreview .imageHolder .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 29px;
  height: 29px;
  color: #fff;
  background: red;
  border-radius: 50%;
}
.imgsPreview .imageHolder .delete:hover {
  cursor: pointer;
}
.imgsPreview .imageHolder .delete .icon {
  width: 66%;
  height: 66%;
  display: block;
  margin: 4px auto;
}
.imgsPreview .imageHolder .plus {
  color: #2d3748;
  background: #f7fafc;
  border-radius: 50%;
  font-size: 21pt;
  height: 30px;
  width: 30px;
  text-align: center;
  border: 1px dashed;
  line-height: 23px;
  position: absolute;
  right: -42px;
  bottom: 43%;
}
.plus:hover {
  cursor: pointer;
}
.clearButton {
  color: #2d3748;
  position: absolute;
  top: 7px;
  right: 7px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
