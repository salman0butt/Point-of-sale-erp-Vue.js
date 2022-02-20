<template>
  <div v-if="toasts && toasts.length > 0">
    <CToaster placement="top-end">
      <CToast v-for="(toast, index) in toasts" :key="index">
        <CToastHeader closeButton>
          <span class="me-auto fw-bold">{{ toast.title }}</span>
          <small>7 min ago</small>
        </CToastHeader>
        <CToastBody>
          {{ toast.content }}
        </CToastBody>
      </CToast>
    </CToaster>
  </div>
</template>
<script>
export default {
  // props: {
  //   toasts: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  data() {
    return {
      toasts: [
        {
          title: "asdasdas",
        },
      ],
    };
  },
};
</script>
