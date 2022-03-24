<template>
  <div>
    <CToaster placement="top-end">
      <CToast
        :show="true"
        :autohide="3000"
        :fade="true"
        v-for="(toast, index) in toasts"
        :key="index"
      >
        <CToastHeader :closeButton="true" :className="toast.class">
          <span class="me-auto fw-bold">{{ toast.title }}</span>
        </CToastHeader>
        <hr />
        <CToastBody :className="toast.class">{{ toast.content }}</CToastBody>
      </CToast>
    </CToaster>
  </div>
</template>
<script>
export default {
  name: "Toaster",
  props: {
    toasts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // toastss: [
      //   {
      //     title: "asdasdas",
      //   },
      // ],
    };
  },
};
</script>
<style scoped>
ctoastheader {
  display: block;
  font-weight: 600;
}
.error {
  color: red;
}
</style>
