<template>
  <transition name="*">
    <div :class="{ 'c-dark-theme': $store.state.darkMode }" class="c-app">
      <CContainer class="d-flex align-items-center min-vh-100">
        <CRow class="w-100 justify-content-center">
          <CCol md="6">
            <img src="/img/images/500.svg" alt="500" />
            <div class="text-center">
              <h4>Something Went Wrong.</h4>
              <p class="text-muted">
                The page you are looking for is temporarily unavailable.
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Page500",
};
</script>

